"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import {
  X,
  Home,
  Search,
  Download,
  User,
  Settings,
  Bell,
  ChevronDown,
  Play,
  RotateCcw,
  Film,
  Zap,
  MoreHorizontal,
  Layout,
  Users,
  Layers,
  Award
} from "lucide-react";
import ScrollToTop from '@/components/ScrollToTop';
import styles from "./gallery.module.css";

const CATEGORIES = [
  { id: "all", label: "All", icon: <Layout size={22} /> },
  { id: "internship", label: "Internship", icon: <Users size={22} /> },
  { id: "celebration", label: "Celebration", icon: <Zap size={22} /> },
  { id: "requirements", label: "Requirements", icon: <Layers size={22} /> },
  { id: "achievements", label: "Achievements", icon: <Award size={22} /> },
  { id: "skill-up", label: "Skill-Up", icon: <Film size={22} /> },
];

const GALLERY_IMAGES = [
  // Celebrations
  { id: 1, title: "Grand Celebration", category: "celebration", img: "/Images/gallery/cel-1.webp", desc: "A night of excellence and unity at Softnova." },
  { id: 2, title: "Cultural Meet", category: "celebration", img: "/Images/gallery/cel-2.webp", desc: "Showcasing vibrant student talents." },
  { id: 3, title: "Academy Gathering", category: "celebration", img: "/Images/gallery/cel-3.webp", desc: "Everyday moments that define our culture." },
  { id: 4, title: "Team Spirit", category: "celebration", img: "/Images/gallery/cel-4.webp", desc: "Strengthening roots through collaboration." },

  { id: 6, title: "Unity Event", category: "celebration", img: "/Images/gallery/cel-6.webp", desc: "Fostering strong bonds." },
  { id: 7, title: "Special Moment", category: "celebration", img: "/Images/gallery/cel-7.webp", desc: "Capturing the joy of achievement." },

  { id: 9, title: "Group Joy", category: "celebration", img: "/Images/gallery/cel-9.webp", desc: "The energetic atmosphere of Softnova." },

  { id: 11, title: "Festive Highlights", category: "celebration", img: "/Images/gallery/cel-12.webp", desc: "Memorable event coverage." },

  { id: 13, title: "Celebration Night", category: "celebration", img: "/Images/gallery/cel-14.webp", desc: "Cheers to our collective success." },
  { id: 14, title: "Cultural Day", category: "celebration", img: "/Images/gallery/cel-15.webp", desc: "Vibrant performances and unity." },
  { id: 15, title: "Team Dinner", category: "celebration", img: "/Images/gallery/cel-16.webp", desc: "Celebrating progress." },
  { id: 16, title: "Grand Event", category: "celebration", img: "/Images/gallery/cel-17.webp", desc: "A snapshot of excellence." },
  { id: 17, title: "Success Party", category: "celebration", img: "/Images/gallery/cel-18.webp", desc: "Honoring our high achievers." },
  { id: 18, title: "Legacy Meet", category: "celebration", img: "/Images/gallery/cel-19.webp", desc: "Building the future together." },
  { id: 19, title: "Holiday Fest", category: "celebration", img: "/Images/gallery/cel-20.webp", desc: "Season of joy at Softnova." },

  // Internship & Training
 
  { id: 26, title: "Learning Zone", category: "internship", img: "/Images/gallery/g3.jpeg", desc: "Focused study sessions." },
  { id: 27, title: "Team Collab", category: "internship", img: "/Images/gallery/g4.jpeg", desc: "Collaborative development." },
  { id: 28, title: "Tech Hub", category: "internship", img: "/Images/gallery/g6.jpeg", desc: "Where ideas come to life." },

  // Requirements & Infrastructure
  { id: 30, title: "Campus Infrastructure", category: "requirements", img: "/Images/gallery/rec-1.webp", desc: "State-of-the-art facilities." },
  { id: 31, title: "Lab Setup", category: "requirements", img: "/Images/gallery/rec-2.webp", desc: "Industrial standard equipment." },
  { id: 32, title: "Requirements Meet", category: "requirements", img: "/Images/gallery/rec-3.webp", desc: "Setting benchmarks for success." },

  // Achievements
  { id: 33, title: "Excellence Award", category: "achievements", img: "/Images/gallery/award.webp", desc: "Recognized for educational leadership." },
  { id: 34, title: "Top Performer", category: "achievements", img: "/Images/gallery/award2.webp", desc: "Celebrating our students' wins." },

  // Skill-Up
  { id: 35, title: "Skill Enhancement", category: "skill-up", img: "/Images/gallery/skill1.webp", desc: "Intensive training for industry readiness." },
  { id: 36, title: "Bootcamp Session", category: "skill-up", img: "/Images/gallery/skill2.webp", desc: "Fast-tracking technical skills." },
  { id: 37, title: "Expert Training", category: "skill-up", img: "/Images/gallery/skill3.webp", desc: "Learning from the best." },
  { id: 38, title: "Masterclass", category: "skill-up", img: "/Images/gallery/skill4.webp", desc: "Deep dive into tech stacks." },
  { id: 39, title: "Final Project", category: "skill-up", img: "/Images/gallery/skill5.webp", desc: "Showcasing mastered skills." }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(GALLERY_IMAGES);

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setSelectedImage(null);
  };

  const filteredImages = useMemo(() => {
    let base = activeTab === "all"
      ? images
      : images.filter(img => img.category === activeTab);
    
    if (searchQuery) {
      base = base.filter(img => 
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return base;
  }, [activeTab, searchQuery, images]);

  return (
    <div className={styles.galleryPage}>
      {/* Brand Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      {/* Interactive Vertical Sidebar */}
      <nav className={styles.sideDock}>
        <div className={styles.dockInner}>
          {CATEGORIES.map(cat => (
            <motion.div 
              key={cat.id}
              className={`${styles.dockItem} ${activeTab === cat.id ? styles.dockActive : ''}`}
              onClick={() => setActiveTab(cat.id)}
              whileHover="hover"
            >
              <div className={styles.iconBox}>{cat.icon}</div>
              <motion.span 
                className={styles.dockLabel}
                variants={{
                  initial: { opacity: 0, x: -10 },
                  hover: { opacity: 1, x: 0 }
                }}
                initial="initial"
              >
                {cat.label}
              </motion.span>
              {activeTab === cat.id && (
                <motion.div layoutId="dockActiveBg" className={styles.activePill} />
              )}
            </motion.div>
          ))}
        </div>
      </nav>

      <div className={styles.container}>
        {/* Modern Brand Header */}
        <header className={styles.header}>
          <motion.div 
            className={styles.brandBadge}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            OUR VISUAL JOURNEY
          </motion.div>
          <h1 className={styles.title}>Innovative <span>Gallery</span></h1>
          <p className={styles.subtitle}>Capturing excellence, innovation, and academy life at Softnova.</p>
        </header>

        {/* 3D Neumorphic Search Bar */}
        <div className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search moments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.neumorphInput}
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className={styles.bentoGrid}>
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                className={styles.gridItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedImage(img)}
              >
                <div className={styles.itemInner}>
                  <Image 
                    src={img.img} 
                    alt={img.title} 
                    fill 
                    className={styles.gridImg}
                    priority={idx < 4}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ 
                      transform: hoveredId === img.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.5s ease-out'
                    }}
                  />
                  <div className={`${styles.itemOverlay} ${hoveredId === img.id ? styles.overlayVisible : ''}`}>
                    <div className={styles.overlayContent}>
                      <span className={styles.itemTag}>{img.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Neumorphic Lightbox Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalBody}>
                <div className={styles.modalImgWrapper}>
                  <Image src={selectedImage.img} alt="full" fill className={styles.modalImg} />
                </div>
              </div>

              {/* Top Right Close X */}
              <button className={styles.exitIcon} onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollToTop />
    </div>
  );
}
