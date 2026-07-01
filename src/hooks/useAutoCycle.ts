import { useEffect, useRef, useState } from "react";

interface AutoCycleOptions {
  /** Total number of items in the cycle. */
  total: number;
  /** Milliseconds between automatic advances. */
  interval?: number;
  /** Whether the cycle is currently paused (e.g. hover, off-screen). */
  paused?: boolean;
  /** Initial active index. */
  initial?: number;
}

/**
 * Auto-advances an index from 0 → total-1 → 0 on a fixed interval.
 * Returns the current index plus a manual setter (used when the user
 * interacts to overtake the timer).
 */
export function useAutoCycle({
  total,
  interval = 3500,
  paused = false,
  initial = 0,
}: AutoCycleOptions) {
  const [index, setIndex] = useState(initial);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [total, interval, paused]);

  return [index, setIndex] as const;
}