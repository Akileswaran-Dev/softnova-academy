"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FloatingElement({ children, yRange = [10, -10], duration = 4, delay = 0 }) {
  const [isMobileTouch, setIsMobileTouch] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobileTouch(isTouch);
  }, []);

  if (isMobileTouch) {
    return <div style={{ width: "100%", height: "100%", display: "flex" }}>{children}</div>;
  }

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
      style={{ width: "100%", height: "100%", willChange: "transform", display: "flex" }}
    >
      {children}
    </motion.div>
  );
}

