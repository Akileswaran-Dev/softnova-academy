"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BookPreview3D.module.css";

function Dust({ color }) {
  const [isMobileTouch, setIsMobileTouch] = useState(false);
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobileTouch(isTouch);
  }, []);

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

  if (isMobileTouch) return null;

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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>

          <div className={styles.stage}>
            <motion.div className={styles.readerPhase}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {isOpenState && !isOpening ? (
                <>
                  {/* Book Open Base */}
                  <div className={styles.bookOpenContainer}>
                    <div className={styles.bookOpenBase}>
                      {/* Left Page */}
                      <div className={styles.openPageLeft}>
                        <div className={styles.pageInnerContent}>
                          {bookPages[leftIdx] || (
                            <div className={styles.emptyPage}>
                              <p>No content on this page.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Open Spine */}
                      <div className={styles.openSpine} />

                      {/* Right Page */}
                      <div className={styles.openPageRight}>
                        <div className={styles.pageInnerContent}>
                          {bookPages[rightIdx] || (
                            <div className={styles.emptyPage}>
                              {/* <p>End of preview.</p> */}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Flipping animation sheet */}
                      {flipping && (
                        <div
                          className={`${styles.flipSheet} ${flipDir === 1 ? styles.flipNext : styles.flipPrev
                            }`}
                        >
                          <div className={styles.flipFront}>
                            <div className={styles.pageInnerContent}>
                              {flipDir === 1
                                ? (bookPages[leftIdx - 2] || null)
                                : (bookPages[leftIdx] || null)}
                            </div>
                          </div>
                          <div className={styles.flipBack}>
                            <div className={styles.pageInnerContent}>
                              {flipDir === 1
                                ? (bookPages[rightIdx] || null)
                                : (bookPages[rightIdx + 2] || null)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className={styles.readerNav}>
                    <button
                      className={styles.navBtn}
                      onClick={() => flip(-1)}
                      disabled={spread === 0 || flipping}
                    >
                      <ChevronLeft size={18} />
                      <span>Prev</span>
                    </button>
                    <span className={styles.pageIndicator}>
                      {spread + 1} / {totalSpreads}
                    </span>
                    <button
                      className={styles.navBtn}
                      onClick={() => flip(1)}
                      disabled={spread >= totalSpreads - 1 || flipping}
                    >
                      <span>Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                /* Loading State */
                <motion.div
                  className={styles.openBtnText}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: "#4a5568",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    background: "var(--background)",
                    boxShadow: "var(--neumorph-shadow-sm)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    padding: "12px 28px",
                    borderRadius: "30px",
                  }}
                >
                  {isOpening ? "Opening Preview..." : "Loading..."}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
