"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";
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
  { id: "all",      label: "All",      icon: <Layout size={20} /> },
  { id: "events",   label: "Events",   icon: <Zap size={20} /> },
  { id: "interns",  label: "Interns",  icon: <Award size={20} /> },
  { id: "students", label: "Students", icon: <Users size={20} /> },
];

const GALLERY_IMAGES = [
  // Events (cel-* and rec-*)
  { id: 1,  title: "Celebration Vibes",    category: "events",   img: "/gallery/cel-1.webp",    size: "short" },
  { id: 2,  title: "Moments of Joy",       category: "events",   img: "/gallery/cel-2.webp",    size: "tall" },
  { id: 3,  title: "Academy Life",         category: "events",   img: "/gallery/cel-3.webp",    size: "short" },
  { id: 4,  title: "Team Bonding",         category: "events",   img: "/gallery/cel-4.webp",    size: "tall" },
  { id: 5,  title: "Festival Spirit",      category: "events",   img: "/gallery/cel-5.webp",    size: "short" },
  { id: 6,  title: "Campus Gathering",     category: "events",   img: "/gallery/cel-6.webp",    size: "tall" },
  { id: 7,  title: "Special Event",        category: "events",   img: "/gallery/cel-7.webp",    size: "short" },
  { id: 8,  title: "Softnova Moments",     category: "events",   img: "/gallery/cel-8.webp",    size: "tall" },
  { id: 9,  title: "Batch Celebration",    category: "events",   img: "/gallery/cel-9.webp",    size: "short" },
  { id: 10, title: "Cultural Event",       category: "events",   img: "/gallery/cel-12.webp",   size: "tall" },
  { id: 11, title: "Academy Meetup",       category: "events",   img: "/gallery/cel-13.webp",   size: "short" },
  { id: 12, title: "Joyful Session",       category: "events",   img: "/gallery/cel-14.webp",   size: "tall" },
  { id: 13, title: "Student Interaction",  category: "events",   img: "/gallery/cel-15.webp",   size: "short" },
  { id: 14, title: "Evening Vibe",         category: "events",   img: "/gallery/cel-16.webp",   size: "tall" },
  { id: 15, title: "Memorable Day",        category: "events",   img: "/gallery/cel-17.webp",   size: "short" },
  { id: 16, title: "Tech Gathering",       category: "events",   img: "/gallery/cel-18.webp",   size: "tall" },
  { id: 17, title: "Academy Vibes",        category: "events",   img: "/gallery/cel-19.webp",   size: "short" },
  { id: 18, title: "Celebration 2024",     category: "events",   img: "/gallery/cel-20.webp",   size: "tall" },
  { id: 19, title: "Award Ceremony",       category: "events",   img: "/gallery/rec-1.webp",    size: "short" },
  { id: 20, title: "Achievement Day",      category: "events",   img: "/gallery/rec-2.webp",    size: "tall" },
  { id: 21, title: "Recognition Gala",     category: "events",   img: "/gallery/rec-3.webp",    size: "short" },

  // Interns (intern-*)
  { id: 22, title: "Intern Batch 2024",    category: "interns",  img: "/gallery/intern1.webp",  size: "short" },
  { id: 23, title: "Intern Team Work",     category: "interns",  img: "/gallery/intern2.webp",  size: "tall" },
  { id: 24, title: "Workspace Vibe",       category: "interns",  img: "/gallery/intern3.webp",  size: "short" },
  { id: 25, title: "Internship Project",   category: "interns",  img: "/gallery/intern4.webp",  size: "tall" },
  { id: 26, title: "Intern Showcase",      category: "interns",  img: "/gallery/intern5.webp",  size: "short" },

  // Students (skill-* and new image)
  { id: 27, title: "Skill Up Session",     category: "students", img: "/gallery/skill1.webp",   size: "tall" },
  { id: 28, title: "Practical Training",   category: "students", img: "/gallery/skill2.webp",   size: "short" },
  { id: 29, title: "Tech Workshop",        category: "students", img: "/gallery/skill3.webp",   size: "tall" },
  { id: 30, title: "Hands-on Experience",  category: "students", img: "/gallery/skill4.webp",   size: "short" },
  { id: 31, title: "Learning Journey",     category: "students", img: "/gallery/skill5.webp",   size: "tall" },
  { id: 32, title: "Campus Interaction",   category: "students", img: "/gallery/Image20260504101812.jpg", size: "short" },
];

const TiltCard = ({ img, onImageClick, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className={`${styles.cardWrapper} ${styles[img.size]}`}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: (idx % 3) * 0.1 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onImageClick(img)}
        className={styles.card}
      >
        <img src={img.img} alt={img.title} className={styles.cardImg} style={{ transform: "translateZ(20px)" }} />
        <div className={styles.cardOverlay} style={{ transform: "translateZ(40px)" }}>
          <span className={styles.cardTitle}>{img.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Column = ({ images, yOffset, onImageClick }) => {
  return (
    <motion.div style={{ y: yOffset }} className={styles.column}>
      {images.map((img, idx) => (
        <TiltCard key={idx} img={img} idx={idx} onImageClick={onImageClick} />
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

  // More dramatic parallax for floating feeling
  const smY1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const smY2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const smY3 = useTransform(scrollYProgress, [0, 1], [0, -350]);

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
      {/* Liquid Premium Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>
      <div className={styles.blob4}></div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setSelectedImg(null)}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedImg(null)}>
              <X size={32} />
            </button>
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
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
                <span className={styles.modalCat}>{CATEGORIES.find(c => c.id === selectedImg.category)?.label}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.contentWrapper}>
        {/* Holographic Header */}
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className={styles.headerGlass}>
            <span className={styles.tagline}>OUR VISUAL JOURNEY</span>
            <h1>Explore Softnova</h1>
            <p>A collection of moments that define our innovative spirit and dedication to excellence.</p>
          </div>
        </motion.header>

        {/* 3D Parallax Grid */}
        <div className={styles.stadiumGrid}>
          <Column images={columns[0]} yOffset={smY1} onImageClick={setSelectedImg} />
          <Column images={columns[1]} yOffset={smY2} onImageClick={setSelectedImg} />
          <Column images={columns[2]} yOffset={smY3} onImageClick={setSelectedImg} />
        </div>

        {/* Huge Bottom Spacer to prevent cutting off the fast parallax column */}
        <div className={styles.bottomSpacer}></div>
      </div>

      {/* Floating Dynamic Island Dock for Filters */}
      <motion.nav 
        className={styles.floatingDock}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className={styles.dockInner}>
          <AnimatePresence>
            {CATEGORIES.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  className={`${styles.dockItem} ${isActive ? styles.dockItemActive : ""}`}
                  onClick={() => setActiveCat(cat.id)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="dockIndicator" 
                      className={styles.dockIndicator} 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={styles.dockIcon}>{cat.icon}</span>
                  <span className={styles.dockLabel}>{cat.label}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.nav>

    </main>
  );
}
