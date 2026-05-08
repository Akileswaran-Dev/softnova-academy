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

  { id: 2, title: "Event Gathering", category: "celebration", img: "/Images/gallery/cel-4.webp", desc: "Bringing everyone together for a special occasion." },
  { id: 3, title: "Cultural Meet", category: "celebration", img: "/Images/gallery/cel-6.webp", desc: "Showcasing talents and cultural diversity." },
  { id: 4, title: "Unity Festival", category: "celebration", img: "/Images/gallery/cel-7.webp", desc: "Celebrating our collective achievements." },
  { id: 5, title: "Office Fun", category: "celebration", img: "/Images/gallery/cel-9.webp", desc: "Spreading smiles and positivity in the workspace." },
  { id: 6, title: "Grand Gala", category: "celebration", img: "/Images/gallery/cel-11.webp", desc: "A night to remember with the Softnova family." },
  { id: 7, title: "Achievement Party", category: "celebration", img: "/Images/gallery/cel-14.webp", desc: "Cheers to our recent milestones." },
  { id: 8, title: "Holiday Cheer", category: "celebration", img: "/Images/gallery/cel-15.webp", desc: "Festive vibes and seasonal celebrations." },
  { id: 9, title: "Team Lunch", category: "celebration", img: "/Images/gallery/cel-16.webp", desc: "Good food and great conversations." },
  { id: 10, title: "Special Recognition", category: "celebration", img: "/Images/gallery/cel-17.webp", desc: "Honoring our dedicated team members." },
  { id: 11, title: "Legacy Event", category: "celebration", img: "/Images/gallery/cel-18.webp", desc: "Building memories that last a lifetime." },
  { id: 12, title: "Success Meet", category: "celebration", img: "/Images/gallery/cel-19.webp", desc: "Reflecting on our journey and future goals." },
  { id: 13, title: "Annual Day", category: "celebration", img: "/Images/gallery/cel-20.webp", desc: "Celebrating another year of innovation." },
  { id: 14, title: "Gallery Highlight", category: "celebration", img: "/Images/gallery/g1.webp", desc: "Capturing the essence of Softnova." },
  { id: 15, title: "Tech Session", category: "celebration", img: "/Images/gallery/g3.jpeg", desc: "Informal learning and tech talks." },
  { id: 16, title: "Workshop Fun", category: "celebration", img: "/Images/gallery/g4.jpeg", desc: "Hands-on experience with a smile." },
  { id: 17, title: "Collaboration", category: "celebration", img: "/Images/gallery/g6.jpeg", desc: "Working together towards excellence." },

  // Internship
  { id: 18, title: "Internship Program", category: "internship", img: "/Images/gallery/intern1.webp", desc: "Nurturing the next generation of tech leaders." },
  { id: 19, title: "Training Session", category: "internship", img: "/Images/gallery/intern2.webp", desc: "Hands-on guidance from industry experts." },
  { id: 20, title: "Intern Project", category: "internship", img: "/Images/gallery/intern3.webp", desc: "Building real-world applications." },
  { id: 21, title: "Mentorship", category: "internship", img: "/Images/gallery/intern4.webp", desc: "One-on-one guidance for career growth." },
  { id: 22, title: "Intern Graduation", category: "internship", img: "/Images/gallery/intern5.webp", desc: "Celebrating the successful completion of internship." },

  // Requirements
  { id: 23, title: "Client Meeting", category: "requirements", img: "/Images/gallery/rec-1.webp", desc: "Understanding needs to deliver the best solutions." },
  { id: 24, title: "Requirement Analysis", category: "requirements", img: "/Images/gallery/rec-2.webp", desc: "Deep dive into project specifications." },
  { id: 25, title: "Documentation", category: "requirements", img: "/Images/gallery/rec-3.webp", desc: "Ensuring clarity and precision in every project." },

  // Achievements
  { id: 26, title: "Excellence Award", category: "achievements", img: "/Images/gallery/award.webp", desc: "Recognized for our contribution to tech education." },
  { id: 27, title: "Leadership Honor", category: "achievements", img: "/Images/gallery/award2.webp", desc: "Proudly achieving industry benchmarks." },

  // Skill-Up
  { id: 28, title: "Skill Development", category: "skill-up", img: "/Images/gallery/skill1.webp", desc: "Expanding horizons through continuous learning." },
  { id: 29, title: "Advanced Workshop", category: "skill-up", img: "/Images/gallery/skill2.webp", desc: "Mastering modern tech stacks." },
  { id: 30, title: "Coding Bootcamp", category: "skill-up", img: "/Images/gallery/skill3.webp", desc: "Intensive training for industry readiness." },
  { id: 31, title: "Design Masterclass", category: "skill-up", img: "/Images/gallery/skill4.webp", desc: "Crafting beautiful and functional interfaces." },
  { id: 32, title: "Soft Skills Training", category: "skill-up", img: "/Images/gallery/skill5.webp", desc: "Preparing for the professional world." },
  
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(GALLERY_IMAGES);

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

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
              onMouseEnter={() => setHoveredTab(cat.id)}
              onMouseLeave={() => setHoveredTab(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.iconBox}>{cat.icon}</div>
              <motion.span 
                className={styles.dockLabel}
                animate={hoveredTab === cat.id ? { opacity: 1, x: 0, display: 'block' } : { opacity: 0, x: -10, transitionEnd: { display: 'none' } }}
                transition={{ duration: 0.2 }}
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
                  {img.type === 'video' && (
                    <div className={styles.playOverlay}>
                      <Play fill="white" size={40} />
                    </div>
                  )}
                  <div className={`${styles.itemOverlay} ${hoveredId === img.id ? styles.overlayVisible : ''}`}>
                    <div className={styles.overlayContent}>
                      <span className={styles.itemTag}>{img.category}</span>
                      {img.type === 'video' && <span className={styles.videoTag}>Video</span>}
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
                {selectedImage.type === 'video' ? (
                  <div className={styles.modalVideoWrapper}>
                    <video 
                      src={selectedImage.video} 
                      controls 
                      autoPlay 
                      className={styles.modalVideo}
                    />
                  </div>
                ) : (
                  <div className={styles.modalImgWrapper}>
                    <Image src={selectedImage.img} alt="full" fill className={styles.modalImg} />
                  </div>
                )}
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

