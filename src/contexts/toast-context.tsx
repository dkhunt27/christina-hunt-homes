import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ToastState = { message: string; key: number } | null;

type ToastContextValue = {
  toast: ToastState;
  showToast: (message: string) => void;
  clearToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const showToast = useCallback((message: string) => setToast({ message, key: Date.now() }), []);
  const clearToast = useCallback(() => setToast(null), []);
  const value = useMemo(() => ({ toast, showToast, clearToast }), [toast, showToast, clearToast]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}
