"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
    </MotionConfig>
  );
}
