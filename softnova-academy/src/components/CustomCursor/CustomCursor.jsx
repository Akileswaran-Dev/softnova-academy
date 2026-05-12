"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position (immediate)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing effect (spring with delay/lag)
  const springConfig = { damping: 20, stiffness: 120 }; // Slower spring for visible lag
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", () => setIsVisible(false));
    document.body.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <div className={`${styles.cursorContainer} ${!isVisible ? styles.hidden : ""}`}>
      {/* Outer Trailing Orange Circle (Follows with lag) */}
      <motion.div
        className={styles.trailCircle}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2 : isClicked ? 0.8 : 1,
          opacity: isHovered ? 0.5 : 1,
          borderWidth: isHovered ? "1px" : "2px",
        }}
      />

      {/* Inner Precision Cursor (Immediate) */}
      <motion.div
        className={styles.innerCursor}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.5 : 1,
          backgroundColor: isHovered ? "#FF7C30" : "#fff",
        }}
      />
    </div>
  );
};

export default CustomCursor;
