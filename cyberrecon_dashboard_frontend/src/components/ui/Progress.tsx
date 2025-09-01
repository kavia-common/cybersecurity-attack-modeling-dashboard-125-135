import React from "react";
import { motion } from "framer-motion";

interface Props {
  value: number; // 0..100
  color?: "primary" | "secondary" | "accent";
}

export default function Progress({ value, color = "primary" }: Props): JSX.Element {
  return (
    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
      <motion.div
        className={`h-full bg-${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: "tween", duration: 0.4 }}
        style={{ backgroundColor: "rgb(var(--color-" + color + "))" }}
      />
    </div>
  );
}
