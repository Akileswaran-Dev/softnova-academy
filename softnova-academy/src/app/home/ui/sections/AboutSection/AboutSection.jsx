"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './AboutSection.module.css';

import FloatingElement from "@/components/FloatingElement";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="about-title">
      <FloatingElement yRange={[10, -10]} duration={6}>
        <div className={styles.glassCard}>
          <h2 className={styles.heading} id="about-title">About Our Softnova Academy</h2>
          <div className={`${styles.paragraphWrapper} ${isExpanded ? styles.expanded : ''}`}>
            <p className={styles.paragraph}>
At Softnova Academy, we are dedicated to empowering students and professionals with industry-oriented skills through innovative and practical learning experiences. Our programs are carefully designed to bridge the gap between academic learning and real-world industry expectations, helping learners build confidence, creativity, and technical expertise.
We offer career-focused training in web design, UI/UX design, front-end development, full stack development, Java full stack development, and HR training. With the support of expert mentors, real-time projects, and an interactive learning environment, students gain hands-on experience and valuable professional knowledge throughout their journey.
Our mission is to shape future-ready professionals by delivering high-quality education, modern technologies, and continuous career support. At Softnova Academy, we inspire learners to grow, innovate, and succeed in today’s fast-evolving digital world.'</p>
          </div>
          
          <div className={styles.mobileActions}>
            <button 
              className={styles.readMoreBtn} 
              onClick={() => setIsExpanded(!isExpanded)}
              suppressHydrationWarning
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
            <Link href="/about">
              <button className={styles.button} suppressHydrationWarning>View To Page</button>
            </Link>
          </div>
        </div>
      </FloatingElement>
    </section>
  );
}

