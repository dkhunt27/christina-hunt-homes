import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Node 25 defines a `localStorage` global that is undefined without --localstorage-file, and it
// shadows jsdom's. Give tests an in-memory Storage instead.
if (!globalThis.localStorage) {
  const store = new Map<string, string>();
  const memoryStorage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (i) => [...store.keys()][i] ?? null,
    removeItem: (key) => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, "localStorage", { value: memoryStorage, configurable: true });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});
