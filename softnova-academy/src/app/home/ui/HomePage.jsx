"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import AboutSection from "./sections/AboutSection/AboutSection";
import BenefitsSection from "./sections/BenefitsSection/BenefitsSection";
import TestimonialsSection from "./sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "./sections/FAQSection/FAQSection";
import CoursesSection from "./sections/CoursesSection/CoursesSection";
import styles from "./HomePage.module.css";
import FloatingElement from "@/components/FloatingElement";
import Magnetic from "@/components/Magnetic";
import ParticlesBackground from "@/components/ParticlesBackground";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Normalize scroll for mobile touch events
    ScrollTrigger.normalizeScroll(true);

    let ctx = gsap.context(() => {

      // --- Fade from LEFT ---
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
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- Fade from RIGHT ---
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
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- Fade UP ---
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
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- Staggered CARDS ---
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
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Scale and Depth transitions
      gsap.utils.toArray(".gsap-scale").forEach((elem) => {
        gsap.fromTo(
          elem,
          { scale: 0.9, opacity: 0.8 },
          {
            scale: 1, opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: elem,
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, containerRef);

    // Refresh ScrollTrigger after a short delay to ensure DOM is fully painted
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      {/* SVG Gradients for Icons */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7C30" />
            <stop offset="100%" stopColor="#FFA375" />
          </linearGradient>
        </defs>
      </svg>

      {/* PRODUCT DETAIL STYLE HERO SECTION */}
      <section className={styles.productHero}>
        {/* Simplified Background */}
        <div className={styles.heroBackground}></div>

        {/* Top Header/Background */}
        <div className={styles.topYellowBg}>
          <h1 className={styles.mainTitleUpper}>Softnova Academy</h1>
        </div>

        {/* Main Central Glass Card */}
        <div className={styles.glassCard}>
          {/* Left: Content/Theory */}
          <div className={styles.cardLeft}>
            <h2 className={styles.academyTitle}>
              Digital Design & <br /> Developments
            </h2>
            <p className={styles.tagline}>
              Unlock Your Potential Through Engaging and Learning with Softnova.
            </p>
            <div className={styles.miniThumbnails}>
              <div className={styles.miniBox}>
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
              </div>
              <div className={styles.miniBox}>
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
              </div>
              <div className={styles.miniBox}>
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
            </div>
          </div>

          {/* Center: Hero Image (Humans Learning) */}
          <div className={styles.cardCenter}>
            <div className={styles.imageCircle}>
              <Image
                src="/Images/premium-learning.webp"
                alt="Students learning"
                width={600}
                height={600}
                priority
                className={styles.learningImg}
              />
            </div>
            <Link href="/intership">
              <div className={styles.priceTag} style={{ cursor: "pointer" }}>JOIN SOFTNOVA</div>
            </Link>
          </div>

          {/* Right: Tech Icons & Action */}
          <div className={styles.cardRight}>
            <div className={styles.techStackContainer}>
              <div className={styles.staticTechGrid}>
                <div className={styles.staticItem}>
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
                </div>
                <div className={styles.staticItem}>
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>
                </div>
                <div className={styles.staticItem}>
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
              </div>
            </div>

            <Link href="/course">
              <button className={styles.joinBtn} suppressHydrationWarning>Explore Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the page */}
      <section className={styles.cardsSection} id="achievements">
        <h2 className={`${styles.cardsTitle} gsap-fade-up`}>What You Will Get from Softnova Academy?</h2>
        <div className={`${styles.cardsGrid} gsap-stagger-group`}>
          <div className={`${styles.featureCard} gsap-card`}>
            <div className={styles.cardIconRow}>
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></svg>
            </div>
            <h4>Challenging Projects</h4>
            <p>Work on real-world projects that elevate your design and dev portfolio to the next level.</p>
          </div>
          <div className={`${styles.featureCard} gsap-card`}>
            <div className={styles.cardIconRow}>
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h4>Placement Support</h4>
            <p>Guaranteed guidance for securing high-paying roles in the IT and software testing fields.</p>
          </div>
          <div className={`${styles.featureCard} gsap-card`}>
            <div className={styles.cardIconRow}>
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" /></svg>
            </div>
            <h4>Modern Workspace</h4>
            <p>Access our premium digital laboratories and design tools to sharpen your technical skills.</p>
          </div>
          <div className={`${styles.featureCard} gsap-card`}>
            <div className={styles.cardIconRow}>
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="#ff7c30" strokeWidth="2" fill="none"><path d="M18 8a3 3 0 0 1-3 3H5a3 3 0 0 1 0-6h10a3 3 0 0 1 3 3z" /><path d="M10 2c0 2 2 2 2 4s-2 2-2 4" /><path d="M14 2c0 2 2 2 2 4s-2 2-2 4" /><path d="M18 11v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V11" /></svg>
            </div>
            <h4>Interactive Sessions</h4>
            <p>Live doubt solving, peer reviews, and interactive Q&A sessions ensuring maximum retention.</p>
          </div>
        </div>
      </section>

      <CoursesSection />

      <main className={styles.main}>
        <div id="benefits" className="gsap-fade-left">
          <BenefitsSection />
        </div>
        <div id="faq" className="gsap-fade-right">
          <FAQSection />
        </div>
        <div className="gsap-fade-left">
          <TestimonialsSection />
        </div>
        <div id="about" className="gsap-fade-right">
          <AboutSection />
        </div>
      </main>
    </div>
  );
}
