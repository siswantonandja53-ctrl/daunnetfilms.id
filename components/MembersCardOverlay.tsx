"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Reusable Members Card Overlay component
type MembersCardOverlayProps = {
  count: string;
  label: string;
  // Optional delay in ms before starting the count after it becomes visible
  startAfterMs?: number;
  // Whether to wait until the component is in view to start
  startWhenInView?: boolean;
};

export default function MembersCardOverlay({ count, label, startAfterMs = 0, startWhenInView = true }: MembersCardOverlayProps) {
  // Parse numeric value and preserve any suffix (e.g., '+') from the provided count string
  const targetNumber = useMemo(() => {
    const numStr = (count ?? "").toString().replace(/[^0-9.]/g, "");
    const n = parseFloat(numStr);
    return Number.isFinite(n) ? n : 0;
  }, [count]);

  const suffix = useMemo(() => {
    return (count ?? "").toString().replace(/[0-9.,\s]/g, "");
  }, [count]);

  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    // Only start when conditions are met
    if (startWhenInView && !inView) return;

    // Reset before animating to target
    setCurrent(0);
    const duration = 1200; // ms
    let startTime = 0;

    const startAnim = () => {
      startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(targetNumber * eased);
        setCurrent(value);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    if (startAfterMs > 0) {
      timeoutRef.current = window.setTimeout(startAnim, startAfterMs);
    } else {
      startAnim();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView, startAfterMs, startWhenInView, targetNumber]);

  // const formatted = useMemo(() => {
  //   try {
  //     return current.toLocaleString("id-ID");
  //   } catch {
  //     return String(current);
  //   }
  // }, [current]);

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center justify-center w-64 h-24 z-20 rounded-[10px] shadow-lg"
      style={{
        background:
          'linear-gradient(270deg, rgba(255,132,0,0.3) 0%, rgba(74,13,57,0.3) 100%)',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-28 h-10 text-3xl font-bold leading-9 bg-gradient-to-r from-[#F57C00] to-[#EE6028] bg-clip-text text-transparent mt-1"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {current}
        {suffix}
      </div>
      <div className="w-28 h-1 bg-gradient-to-r from-[#F57C00] to-[#EE6028] rounded mt-1 mb-1" />
      <div
        className="flex items-center justify-center w-20 h-9 text-base font-thin leading-9 text-white"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </div>
    </div>
  );
}
