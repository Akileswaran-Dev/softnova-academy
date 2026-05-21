"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BookPreview3D.module.css";

function Dust({ color }) {
  const dots = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      dur: 6 + Math.random() * 6,
    })),
    []);
  return (
    <div className={styles.dust}>
      {dots.map(d => (
        <div
          key={d.id}
          className={styles.dustDot}
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            background: color,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function BookPreview3D({ book, isOpen, onClose, bookPages }) {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);
  const [isOpenState, setIsOpenState] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const totalSpreads = Math.ceil((bookPages?.length || 0) / 2);

  useEffect(() => {
    if (isOpen) {
      setSpread(0);
      setFlipping(false);
      setIsOpenState(false);
      setIsOpening(false);

      const startTimer = setTimeout(() => {
        setIsOpening(true);
        setIsOpenState(true);
      }, 300);

      const endTimer = setTimeout(() => {
        setIsOpening(false);
      }, 1500);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isOpen]);

  const flip = (dir) => {
    if (flipping) return;
    const next = spread + dir;
    if (next < 0 || next >= totalSpreads) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setSpread(next);
    }, 300);
    setTimeout(() => {
      setFlipping(false);
    }, 600);
  };

  const leftIdx = spread * 2;
  const rightIdx = spread * 2 + 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.bg} />
          <div className={styles.rays} />
          <Dust color={book?.imgColor} />
          <div
            className={styles.spotlight}
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${book?.imgColor}25 0%, transparent 70%)`,
            }}
          />
          <motion.button
            className={styles.closeBtn}
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
          >
            <X size={20} />
          </motion.button>

          <div className={styles.stage}>
            <motion.div className={styles.readerPhase}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}>
              {/* Loading Text */}
              {(!isOpenState || isOpening) && (
                <motion.div
                  className={styles.openBtnText}
                  animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 10 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    background: "rgba(255,255,255,0.08)",
                    padding: "10px 24px",
                    borderRadius: "30px",
                  }}
                >
                  {isOpening ? "Opening..." : "Click to Open"}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
        </AnimatePresence>
  );
}
