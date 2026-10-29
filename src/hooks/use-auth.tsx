import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useToast } from "../contexts/toast-context";
import { phoneDigits, toE164 } from "../lib/format";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export type AuthUser = {
  id: string;
  /** Digits only, for the "Signed in · 1234" label. */
  phone: string;
  /** Demo sign-in: Supabase isn't configured, so nothing leaves this device. */
  demo: boolean;
};

/** Why the phone sign-in dialog opened; picks its title and copy. */
export type SignInReason = "search" | "tour" | "general";

type AuthContextValue = {
  user: AuthUser | null;
  isDemoMode: boolean;
  signInOpen: boolean;
  signInReason: SignInReason;
  /** Runs `action` now if signed in; otherwise opens sign-in and runs it after the code checks out. */
  requireSignIn: (reason: SignInReason, action: (user: AuthUser) => void) => void;
  openSignIn: () => void;
  closeSignIn: () => void;
  requestCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const DEMO_USER_KEY = "chuntHome_demoUser";
const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(u: { id: string; phone?: string } | null | undefined): AuthUser | null {
  return u ? { id: u.id, phone: phoneDigits(u.phone ?? ""), demo: false } : null;
}

function readDemoUser(): AuthUser | null {
  if (isSupabaseConfigured) return null;
  try {
    const phone = localStorage.getItem(DEMO_USER_KEY);
    return phone ? { id: `demo-${phone}`, phone, demo: true } : null;
  } catch {
    return null;
  }
}

/**
 * Phone + SMS code sign-in (Supabase Auth phone provider, Twilio behind it). No passwords.
 * Without Supabase env vars it runs in demo mode: any 6-digit code works, like the prototype.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(readDemoUser);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInReason, setSignInReason] = useState<SignInReason>("general");
  const pending = useRef<((user: AuthUser) => void) | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(toAuthUser(data.session?.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(toAuthUser(session?.user)),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const requireSignIn = useCallback(
    (reason: SignInReason, action: (user: AuthUser) => void) => {
      if (user) {
        action(user);
        return;
      }
      pending.current = action;
      setSignInReason(reason);
      setSignInOpen(true);
    },
    [user],
  );

  const openSignIn = useCallback(() => {
    pending.current = null;
    setSignInReason("general");
    setSignInOpen(true);
  }, []);

  const closeSignIn = useCallback(() => {
    pending.current = null;
    setSignInOpen(false);
  }, []);

  const requestCode = useCallback(async (phone: string) => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOtp({ phone: toE164(phone) });
    if (error) throw error;
  }, []);

  const verifyCode = useCallback(
    async (phone: string, code: string) => {
      let signedIn: AuthUser | null;
      if (supabase) {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: toE164(phone),
          token: code,
          type: "sms",
        });
        if (error) throw error;
        signedIn = toAuthUser(data.user);
        if (!signedIn) throw new Error("That code didn't work. Please try again.");
      } else {
        const digits = phoneDigits(phone);
        try {
          localStorage.setItem(DEMO_USER_KEY, digits);
        } catch {
          // Demo sign-in still works for this session.
        }
        signedIn = { id: `demo-${digits}`, phone: digits, demo: true };
      }
      setUser(signedIn);
      const action = pending.current;
      pending.current = null;
      setSignInOpen(false);
      if (action) action(signedIn);
      else showToast("You're signed in. Your saved homes now sync.");
    },
    [showToast],
  );

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    try {
      localStorage.removeItem(DEMO_USER_KEY);
    } catch {
      // Nothing stored.
    }
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isDemoMode: !isSupabaseConfigured,
      signInOpen,
      signInReason,
      requireSignIn,
      openSignIn,
      closeSignIn,
      requestCode,
      verifyCode,
      signOut,
    }),
    [
      user,
      signInOpen,
      signInReason,
      requireSignIn,
      openSignIn,
      closeSignIn,
      requestCode,
      verifyCode,
      signOut,
    ],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
