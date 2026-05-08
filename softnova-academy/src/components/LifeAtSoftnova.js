"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { Play, X } from 'lucide-react';
import styles from './LifeAtSoftnova.module.css';

const galleryItems = [
  { 
    id: 1, 
    src: '/Images/about/gallery_life_1.png', 
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34448-large.mp4',
    delay: 0.1 
  },
  { 
    id: 2, 
    src: '/Images/about/gallery_life_2.png', 
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-in-a-library-41009-large.mp4',
    delay: 0.2 
  },
  { 
    id: 3, 
    src: '/Images/about/gallery_life_3.png', 
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-teamwork-in-a-modern-office-42502-large.mp4',
    delay: 0.3 
  },
  { 
    id: 4, 
    src: '/Images/about/gallery_life_4.png', 
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-coffee-shop-42284-large.mp4',
    delay: 0.4 
  },
];

const LifeAtSoftnova = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className={styles.lifeSection}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left Side Content */}
          <div className={`${styles.textContent} gsap-fade-left`}>
            <h1 className={styles.title}>
              DISCOVER AND<br />
              EXPERIENCE LIFE AT<br />
              SOFTNOVA
            </h1>
            
            <div className={styles.subTextWrapper}>
              <motion.div 
                className={styles.playIconCircle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedVideo(galleryItems[0].videoUrl)}
              >
                <Play fill="white" size={20} />
              </motion.div>
              <span className={styles.subTitle}>choose your growth journey</span>
            </div>

            <p className={styles.description}>
              Softnova Academy is more than just a learning center; it&apos;s a vibrant ecosystem where innovation meets passion. 
              Our campus is designed to inspire creativity, foster collaboration, and provide the perfect environment for 
              future tech leaders to thrive and build groundbreaking solutions.
            </p>
          </div>

          {/* Right Side Video Showcase */}
          <div className={`${styles.videoShowcase} gsap-fade-right`}>
            <div className={styles.videoCard}>
              <video 
                src="/Images/about/softnova.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className={styles.featuredVideo}
              />
              <div className={styles.videoOverlay}>
                <motion.div 
                  className={styles.mainPlayBtn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedVideo('/Images/about/softnova.mp4')}
                >
                  <Play fill="white" size={30} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy Divider at bottom */}
      <div className={styles.waveDivider}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,113.1,121.73,103.52,183.63,89.69,228.69,79.54,273,65.41,321.39,56.44Z" className={styles.waveFill}></path>
        </svg>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedVideo(null)}
              >
                <X size={30} />
              </button>
              <div className={styles.videoWrapper}>
                <video 
                  src={selectedVideo} 
                  controls 
                  autoPlay 
                  className={styles.videoPlayer}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LifeAtSoftnova;
