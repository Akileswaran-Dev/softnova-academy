"use client";

import { motion } from "framer-motion";
import { Laptop, Monitor, Smartphone, Globe, Cpu, Layout } from "lucide-react";
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
                 <span>VISION 2027</span>
                 <div className={styles.topRightLine}></div>
              </div>
              
              <h1 className={styles.mainTitle}>
                EMPOWERING THE<br/>NEXT GENERATION<br/>OF TECH LEADERS
              </h1>

              <div className={styles.bottomIcons}>
                 <Laptop size={18} />
                 <Monitor size={18} />
                 <Smartphone size={18} />
                 <Globe size={18} />
                 <Cpu size={18} />
                 <Layout size={18} />
              </div>
              <p className={styles.tinyText}>Softnova Academy - Bridging the gap between learning and industry</p>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
