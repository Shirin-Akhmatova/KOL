import { useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  active = true
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, active]);

  return ref;
}
