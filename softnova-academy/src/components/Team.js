"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "./Icons";
import Image from "next/image";
import styles from "../app/about/about.module.css";

const teamMembers = [
  {
    name: "Mahetha Selvaraj",
    role: "HR",
    domain: "HR",
    image: "/Images/gallery/Akka.png",
  },
  {
    name: "Dharshika",
    role: "Team Lead",
    domain: "TEAM LEAD",
    image: "/Images/about/dharshika_new_v3.jpg",
  },
  {
    name: "Adhithyan",
    role: "Developer",
    domain: "DEVELOPER",
    image: "/Images/gallery/dev.jpg",
  },
];

export default function Team() {
  return (
    <section className={styles.section}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
      </div>

      {/* Founder Section */}
      <motion.div 
        className={`${styles.founderSection} gsap-fade-up`}
        whileHover="hover"
        initial="initial"
      >
        <div className={styles.founderImageWrapper}>
          <Image
            src="/Images/about/dharshika_new_v3.jpg"
            alt="Founder & CEO"
            width={500}
            height={500}
            className={styles.founderImage}
          />
          {/* Innovative Orange Splash */}
          <motion.div 
            className={styles.orangeSplash}
            variants={{
              initial: { scale: 0, opacity: 0, rotate: -20 },
              hover: { scale: 1.8, opacity: 0.5, rotate: 10 }
            }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.div 
            variants={{
              initial: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
            className={styles.teamOverlay}
          >
            <span className={styles.memberRole}>Founder & CEO</span>
          </motion.div>
        </div>
        <div className={styles.founderContent}>
          <div className={styles.founderHeader}>
            <h2 className={styles.founderName}>Our Founder</h2>
            <span className={styles.founderRole}>Founder & CEO</span>
          </div>
          <p className={styles.founderBio}>
            At the heart of Softnova Academy is our founder&apos;s unwavering commitment to transforming how technology is taught. With over a decade of industry experience, he recognized the gap between academic theory and industry reality.
          </p>
          <p className={styles.founderBio}>
            His vision for Softnova is to create a nurturing ecosystem where aspiring developers don&apos;t just learn to code, but learn to build, innovate, and lead in the global tech landscape.
          </p>
          <div className={styles.founderQuote}>
            &quot;Our goal is not just to produce developers, but to empower creators who will build the future of technology.&quot;
          </div>
        </div>
      </motion.div>

      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
      </div>

      <div className={`${styles.teamGrid} gsap-stagger-group`}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className={`${styles.teamCard} gsap-card`}
            whileHover="hover"
            initial="initial"
          >
            <div className={styles.teamImageContainer}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={styles.teamImage}
              />
              {/* Innovative Orange Splash */}
              <motion.div 
                className={styles.orangeSplash}
                variants={{
                  initial: { scale: 0, opacity: 0, rotate: -20 },
                  hover: { scale: 1.5, opacity: 0.6, rotate: 0 }
                }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              />
              <motion.div 
                variants={{
                  initial: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={styles.teamOverlay}
              >
                <span className={styles.memberRole}>{member.role}</span>
              </motion.div>
            </div>
            <div className={styles.teamInfo}>
              <h3>{member.name}</h3>
              {/* Domain visible on mobile, icons on desktop */}
              <div className={styles.memberDomain}>{member.domain}</div>
              <div className={styles.socialLinks}>
                <motion.a whileHover={{ y: -3, scale: 1.2, color: "var(--primary)" }} href="#"><Linkedin size={18} /></motion.a>
                <motion.a whileHover={{ y: -3, scale: 1.2, color: "var(--primary)" }} href="#"><Twitter size={18} /></motion.a>
                <motion.a whileHover={{ y: -3, scale: 1.2, color: "var(--primary)" }} href="#"><Github size={18} /></motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
