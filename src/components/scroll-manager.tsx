import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Header + banner height to clear when scrolling to an anchor. */
const ANCHOR_OFFSET = 120;

/**
 * Scrolls to the top on page change, or to `#anchor` when the URL has one
 * (the season banner's "See what's on near you →" goes to /towns#events).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  // biome-ignore lint/correctness/useExhaustiveDependencies: must re-run on every page change
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    let tries = 0;
    let timer = 0;
    // Lazy pages render a moment after navigation, so wait for the anchor to exist.
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (tries++ < 20) {
        timer = window.setTimeout(seek, 50);
      }
    };
    seek();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}
