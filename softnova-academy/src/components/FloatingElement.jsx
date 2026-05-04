"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FloatingElement({ children, yRange = [10, -10], duration = 4, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: yRange }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: duration,
        delay: delay,
        ease: "easeInOut",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
