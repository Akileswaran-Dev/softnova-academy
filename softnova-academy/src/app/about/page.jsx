"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Target, Lightbulb } from "lucide-react";
import styles from "./about.module.css";

import AboutHero from "../../components/AboutHero";
import AboutCards from "../../components/AboutCards";
import Stats from "../../components/Stats";
import Team from "../../components/Team";
import LifeAtSoftnova from "../../components/LifeAtSoftnova";
import EnrollModal from "../../components/EnrollModal/EnrollModal";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade Left
      gsap.utils.toArray(".gsap-fade-left").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, x: -80 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Fade Right
      gsap.utils.toArray(".gsap-fade-right").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Fade Up
      gsap.utils.toArray(".gsap-fade-up").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger Group
      gsap.utils.toArray(".gsap-stagger-group").forEach((group) => {
        const cards = group.querySelectorAll(".gsap-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Refresh ScrollTrigger after a short delay to handle Next.js hydration shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.aboutPage} ref={containerRef}>
      {/* 1. Hero Section */}
      <AboutHero />

      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      {/* 2. About Softnova */}
      <section className={styles.section}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutSplit}>
            <div className={`${styles.aboutText} gsap-fade-left`}>
              <h2>Transforming Tech Education</h2>
              <p>
                At Softnova Academy, we believe that traditional education often falls short in preparing students for the fast-paced tech industry. That&apos;s why we&apos;ve built a curriculum that focuses on practical, real-world skills.
              </p>
              <p>
                Our mission is to empower the next generation of software engineers with the tools, knowledge, and mentorship they need to build innovative products and shape the future of technology.
              </p>
            </div>
            <div className={`${styles.aboutImageWrapper} gsap-fade-right`}>
              <video
                src="/Images/gallery/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className={styles.aboutVideo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <div className="gsap-fade-up">
        <AboutCards />
      </div>

      {/* 4. Stats Section */}
      <div className="gsap-fade-up">
        <Stats />
      </div>

      {/* 5. Team Section */}
      <Team />

      {/* 6. Vision & Mission */}
      <section className={styles.section}>
        <div className={`${styles.visionGrid} gsap-stagger-group`}>
          <div className={`${styles.glassCard} gsap-card`}>
            <div className={styles.iconWrapper} style={{ marginBottom: "1.5rem" }}>
              <Lightbulb size={32} />
            </div>
            <h2>Our Vision</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
              To be the globally recognized hub for tech talent, fostering a community where innovation meets execution, and every learner transforms into a creator.
            </p>
          </div>

          <div className={`${styles.glassCard} gsap-card`}>
            <div className={styles.iconWrapper} style={{ marginBottom: "1.5rem" }}>
              <Target size={32} />
            </div>
            <h2>Our Mission</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
              To provide industry-aligned, hands-on training that equips students with the exact skills companies are looking for, bridging the talent gap in the tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Life at Softnova */}
      <LifeAtSoftnova />
      
      {/* 8. CTA Section */}
      <section className={`${styles.ctaFooter} gsap-fade-up`}>
        <div className={styles.glow} />
        <h2 style={{ position: "relative", zIndex: 1 }}>Start Your Career Today</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
          Join the ranks of top-tier developers. The future is waiting for you.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.ctaButton}
          suppressHydrationWarning
        >

          Enroll Now
        </button>
      </section>

      <EnrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default AboutPage;

