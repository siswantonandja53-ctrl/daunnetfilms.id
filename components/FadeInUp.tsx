"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

type FadeInUpProps = PropsWithChildren<{
  delay?: number; // seconds
  duration?: number; // seconds
  y?: number; // initial translateY in px (positive moves down)
  className?: string;
  once?: boolean; // animate only once when in view
}>;

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  once = true,
}: FadeInUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px", once });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
