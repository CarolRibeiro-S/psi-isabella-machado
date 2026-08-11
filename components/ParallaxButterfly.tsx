"use client";

import { useEffect, useRef } from "react";
import ButterflyIcon from "@/components/ButterflyIcon";

type ParallaxButterflyProps = {
  className: string;
  /** How strongly the icon lags behind normal scroll (0 = none, higher = more lag). */
  speed?: number;
};

export default function ParallaxButterfly({ className, speed = 0.15 }: ParallaxButterflyProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = el.closest("section, footer") as HTMLElement | null;
    if (!section) return;

    let ticking = false;
    function update() {
      ticking = false;
      const rect = section!.getBoundingClientRect();
      el!.style.transform = `translateY(${rect.top * speed}px)`;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return <ButterflyIcon ref={ref} className={className} />;
}
