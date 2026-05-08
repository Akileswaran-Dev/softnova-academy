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
      <motion.div 
        className={styles.leftSphere}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Right Elements */}
      <div className={styles.floatingCards}>
        <motion.div 
          className={styles.floatCard1}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className={styles.cardHeader}>INNOVATION</div>
          <div className={styles.cardCircles}>
             <span></span><span></span>
          </div>
        </motion.div>
        <motion.div 
          className={styles.floatCard2}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className={styles.cardHeader}>TECHNOLOGY</div>
          <div className={styles.cardCircles}>
             <span></span><span></span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.rightSphere}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      ></motion.div>

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
