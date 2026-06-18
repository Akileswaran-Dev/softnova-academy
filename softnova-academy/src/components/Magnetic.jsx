"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobileTouch, setIsMobileTouch] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices (they don't support true hover/magnetic)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobileTouch(isTouch);
  }, []);

  const handleMouseEnter = () => {
    if (isMobileTouch) return;
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouse = (e) => {
    if (isMobileTouch) return;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
  };

  if (isMobileTouch) {
    return <div style={{ display: "inline-block", width: "100%", height: "100%" }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block", width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

