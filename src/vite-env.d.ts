/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SHOW_THEME_DEBUG?: string;
  /** off | subtle (default) | festive */
  readonly VITE_SEASONAL_FX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
