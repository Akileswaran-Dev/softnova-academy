"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  X, 
  Camera, 
  Users, 
  Zap, 
  Globe,
  Layout,
  Award
} from "lucide-react";
import styles from "./gallery.module.css";

const CATEGORIES = [
  { id: "all", label: "All", icon: <Layout size={20} /> },
  { id: "Intern", label: "Campus", icon: <Globe size={20} /> },
  { id: "Celebration", label: "Events", icon: <Zap size={20} /> },
  { id: "students", label: "Students", icon: <Users size={20} /> },
  { id: "interns", label: "Interns", icon: <Award size={20} /> },
];

const GALLERY_IMAGES = [
  { id: 1,  title: "Celebration Vibes",       category: "events",   img: "/gallery/cel-1.webp",         size: "short" },
  { id: 2,  title: "Moments of Joy",          category: "events",   img: "/gallery/cel-2.webp",         size: "tall" },
  { id: 3, title: "Recognition 2024",        category: "events",   img: "/gallery/rec-1.webp",         size: "short" },
  { id: 4, title: "Award Ceremony",          category: "events",   img: "/gallery/rec-2.webp",         size: "tall" },
  { id: 5, title: "Recognition Day",         category: "events",   img: "/gallery/rec-3.webp",         size: "short" },
  { id: 6, title: "Intern Batch 2024",       category: "interns",  img: "/gallery/intern1.webp",       size: "tall" },
  { id: 7, title: "Intern Team Work",        category: "interns",  img: "/gallery/intern2.webp",       size: "short" },
  { id: 8, title: "Intern Collaboration",    category: "interns",  img: "/gallery/intern3.webp",       size: "tall" },
  { id: 9, title: "Intern Project Day",      category: "interns",  img: "/gallery/intern4.webp",       size: "short" },
  { id: 10, title: "Intern Showcase",         category: "interns",  img: "/gallery/intern5.webp",       size: "tall" },
  { id: 11, title: "Skill Development",       category: "students", img: "/gallery/skill1.webp",        size: "short" },
  { id: 12, title: "Hands-On Training",       category: "students", img: "/gallery/skill2.webp",        size: "tall" },
  { id: 13, title: "Practical Sessions",      category: "students", img: "/gallery/skill3.webp",        size: "short" },
  { id: 14, title: "Live Project Work",       category: "students", img: "/gallery/skill4.webp",        size: "tall" },
  { id: 15, title: "Workshop Highlights",     category: "students", img: "/gallery/skill5.webp",        size: "short" },
];

const Column = ({ images, y, onImageClick }) => {
  return (
    <motion.div style={{ y }} className={styles.column}>
      {images.map((img, idx) => (
        <div key={idx} className={`${styles.card} ${styles[img.size]}`} onClick={() => onImageClick(img)}>
          <img src={img.img} alt={img.title} className={styles.cardImg} />
          <div className={styles.cardOverlay}>
            <span className={styles.cardTitle}>{img.title}</span>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [selectedImg, setSelectedImg] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const smY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const filteredImages = useMemo(() => {
    return activeCat === "all" 
      ? GALLERY_IMAGES 
      : GALLERY_IMAGES.filter(img => img.category === activeCat);
  }, [activeCat]);

  // Split images into 3 columns
  const columns = useMemo(() => {
    const cols = [[], [], []];
    filteredImages.forEach((img, i) => {
      cols[i % 3].push(img);
    });
    return cols;
  }, [filteredImages]);

  return (
    <main className={styles.galleryPage} ref={containerRef}>
      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedImg(null)}>
              <X size={32} />
            </button>
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.fullImgWrapper}>
                <img 
                  src={selectedImg.img} 
                  alt={selectedImg.title} 
                  className={styles.fullImg}
                />
              </div>
              <div className={styles.modalFooter}>
                <h3>{selectedImg.title}</h3>
                <span>{CATEGORIES.find(c => c.id === selectedImg.category)?.label}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sidebar Filter */}
      <nav className={styles.sidebarFilter}>
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            className={`${styles.filterIcon} ${activeCat === cat.id ? styles.activeIcon : ""}`}
            onClick={() => setActiveCat(cat.id)}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={styles.iconBox}>{cat.icon}</div>
            <span className={styles.iconLabel}>{cat.label}</span>
          </motion.div>
        ))}
      </nav>

      <div className={styles.contentWrapper}>
        {/* Header */}
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tagline}>OUR VISUAL JOURNEY</span>
          <h1>Explore Softnova</h1>
          <p>A collection of moments that define our innovative spirit.</p>
        </motion.header>

        {/* Parallax Stadium Grid */}
        <div className={styles.stadiumGrid}>
          <Column images={columns[0]} y={smY1} onImageClick={setSelectedImg} />
          <Column images={columns[1]} y={smY2} onImageClick={setSelectedImg} />
          <Column images={columns[2]} y={smY3} onImageClick={setSelectedImg} />
        </div>

        {/* Bottom Spacer */}
        <div className={styles.bottomSpacer}></div>
      </div>
    </main>
  );
}
