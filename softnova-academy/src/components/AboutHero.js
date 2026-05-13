"use client";

import { motion } from "framer-motion";
import { Laptop, Monitor, Smartphone, Globe, Cpu, Layout } from "lucide-react";
import Link from "next/link";
import styles from "../app/about/about.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero3d}>
      {/* Background Shapes */}
      <div className={styles.bgShape1}></div>
      <div className={styles.bgShape2}></div>

      {/* Podium Base */}
      <div className={styles.podiumBase}>
         <div className={styles.podiumTop}></div>
      </div>
      <div className={styles.podiumRing}></div>

      {/* Left Elements */}
      <div className={styles.leftSphere}></div>

      {/* Right Elements */}
      <div className={styles.floatingCards}>
        <div className={styles.floatCard1}>
          <div className={styles.cardHeader}>INNOVATION</div>
          <div className={styles.cardCircles}>
             <span></span><span></span>
          </div>
        </div>
        <div className={styles.floatCard2}>
          <div className={styles.cardHeader}>TECHNOLOGY</div>
          <div className={styles.cardCircles}>
             <span></span><span></span>
          </div>
        </div>
      </div>

      <div className={styles.rightSphere}></div>

      {/* Central Screen */}
      <motion.div 
        className={styles.centralScreenWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.screenGlass}>
           <div className={styles.screenInner}>
              <div className={styles.screenTopBar}>
                 <span>VISION 2026</span>
                 <div className={styles.topRightLine}></div>
              </div>
              
              <h1 className={styles.mainTitle}>
                “Empowering students with knowledge and real-world skills.
Learn today, lead tomorrow.”
              </h1>

              <div className={styles.highlightsGrid}>
                 <div className={styles.highlightCard}>
                    <Laptop size={24} className={styles.highlightIcon} />
                    <span>Practical Learning</span>
                 </div>
                 <div className={styles.highlightCard}>
                    <Cpu size={24} className={styles.highlightIcon} />
                    <span>Expert Mentorship</span>
                 </div>
                 <div className={styles.highlightCard}>
                    <Globe size={24} className={styles.highlightIcon} />
                    <span>Industry Projects</span>
                 </div>
              </div>
              <Link href="/course" className={styles.learnMoreHint}>
                 Discover the Softnova way of learning <span className={styles.arrow}>→</span>
              </Link>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
