"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BookPreview3D.module.css";

function Dust({ color }) {
  const dots = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    dur: 6 + Math.random() * 6,
  })), []);
  return (
    <div className={styles.dust}>
      {dots.map(d => (
        <div key={d.id} className={styles.dustDot} style={{
          width: d.size, height: d.size,
          left: `${d.x}%`, top: `${d.y}%`,
          background: color,
          animationDelay: `${d.delay}s`,
          animationDuration: `${d.dur}s`,
        }} />
      ))}
    </div>
  );
}

export default function BookPreview3D({ book, isOpen, onClose, bookPages }) {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);
  const [phase, setPhase] = useState("book");
  const totalSpreads = Math.ceil((bookPages?.length || 0) / 2);

  useEffect(() => {
    if (isOpen) { setSpread(0); setFlipping(false); setPhase("book"); }
  }, [isOpen]);

  const flip = (dir) => {
    if (flipping) return;
    const next = spread + dir;
    if (next < 0 || next >= totalSpreads) return;
    
    setFlipDir(dir);
    setFlipping(true);
    
    // Smooth timing: update content halfway through the 600ms flip
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
        <motion.div className={styles.overlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          
          <div className={styles.bg} />
          <div className={styles.rays} />
          <Dust color={book?.imgColor} />
          <div className={styles.spotlight} style={{ background: `radial-gradient(ellipse at 50% 0%, ${book?.imgColor}25 0%, transparent 70%)` }} />

          <motion.button className={styles.closeBtn} onClick={onClose} whileHover={{ rotate: 90, scale: 1.1 }}>
            <X size={20} />
          </motion.button>

          <div className={styles.stage}>
            <AnimatePresence mode="wait">
              {phase === "book" ? (
                <motion.div key="closed" className={styles.bookPhase}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1, y: -40 }}>
                  <motion.div className={styles.book3D} 
                    animate={{ y: [0, -15, 0], rotateY: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ "--cover-color": book?.imgColor }}
                  >
                    <div className={styles.bookFront} style={{ backgroundImage: `url(${book?.coverImage})`, backgroundSize: 'cover' }}>
                      <div className={styles.bookGlow} style={{ background: book?.imgColor }} />
                      <div className={styles.bookCoverBrand}>SOFTNOVA ACADEMY</div>
                    </div>
                    <div className={styles.bookSpine3D} style={{ background: book?.imgColor }} />
                    <div className={styles.bookBack} style={{ background: book?.imgColor }} />
                  </motion.div>
                  <motion.button className={styles.openBtn} style={{ background: book?.imgColor }}
                    onClick={() => setPhase("reading")} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    Start Reading →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="reading" className={styles.readerPhase}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  
                  <div className={styles.bookOpenContainer}>
                    <div className={styles.bookOpenBase} style={{ "--cover-color": book?.imgColor }}>
                      
                      {/* Left Page Static */}
                      <div className={styles.openPageLeft}>
                        <div className={styles.pageInnerContent}>{bookPages[leftIdx]}</div>
                        <div className={styles.pageNum}>{leftIdx + 1}</div>
                      </div>

                      {/* Spine */}
                      <div className={styles.openSpine} />

                      {/* Right Page Static */}
                      <div className={styles.openPageRight}>
                        <div className={styles.pageInnerContent}>{bookPages[rightIdx]}</div>
                        <div className={styles.pageNum}>{rightIdx + 1}</div>
                      </div>

                      {/* THE FLIPPING PAGE (ANIMATED OVERLAY) */}
                      {flipping && (
                        <div className={`${styles.flipSheet} ${flipDir > 0 ? styles.flipNext : styles.flipPrev}`}>
                          <div className={styles.flipFront} />
                          <div className={styles.flipBack} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.readerNav}>
                    <button onClick={() => flip(-1)} disabled={spread === 0 || flipping} className={styles.navBtn}>
                      <ChevronLeft /> Prev
                    </button>
                    <div className={styles.pageIndicator}>
                      {spread + 1} / {totalSpreads}
                    </div>
                    <button onClick={() => flip(1)} disabled={spread >= totalSpreads - 1 || flipping} className={styles.navBtn}>
                      Next <ChevronRight />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
