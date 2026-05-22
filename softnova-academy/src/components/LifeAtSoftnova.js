"use client";
import React, { useState, useRef } from 'react';
import { Compass } from 'lucide-react';
import styles from './LifeAtSoftnova.module.css';

const LifeAtSoftnova = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

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
              <div className={styles.playIconCircle}>
                <Compass fill="white" color="white" size={20} />
              </div>
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
            <div className={styles.videoCard} onClick={handlePlayToggle} style={{ cursor: 'pointer' }}>
              <video 
                ref={videoRef}
                src="/Images/about/softnova.mp4" 
                loop 
                playsInline
                controls={isPlaying}
                className={styles.featuredVideo}
              />
              {!isPlaying && (
                <div className={styles.videoOverlay} style={{ opacity: 1, pointerEvents: 'none' }}>
                  <div className={styles.mainPlayBtn}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
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

      {/* Video Modal Removed */}
    </section>
  );
};

export default LifeAtSoftnova;
