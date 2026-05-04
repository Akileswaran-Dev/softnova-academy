"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "./Icons";
import Image from "next/image";
import styles from "../app/about/about.module.css";

const teamMembers = [
  {
    name: "Mahetha Selvaraj",
    role: "HR",
    image: "/Images/gallery/Akka.png",
  },
  {
    name: "Dharshika",
    role: "Team Lead",
    image: "/Images/about/dharshika_new_v3.jpg",
  },
  {
    name: "Adhithyan",
    role: "Developer",
    image: "/Images/gallery/dev.jpg",
  },
];

export default function Team() {
  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
      </motion.div>

      {/* Founder Section */}
      <motion.div 
        className={styles.founderSection}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.founderImageWrapper}>
          <Image
            src="/gallery/CEO.jpg"
            alt="Founder & CEO"
            width={500}
            height={500}
            className={styles.founderImage}
          />
        </div>
        <div className={styles.founderContent}>
          <div className={styles.founderHeader}>
            <h2 className={styles.founderName}>Our Founder</h2>
            <span className={styles.founderRole}>Founder & CEO</span>
          </div>
          <p className={styles.founderBio}>
            At the heart of Softnova Academy is our founder's unwavering commitment to transforming how technology is taught. With over a decade of industry experience, he recognized the gap between academic theory and industry reality.
          </p>
          <p className={styles.founderBio}>
            His vision for Softnova is to create a nurturing ecosystem where aspiring developers don't just learn to code, but learn to build, innovate, and lead in the global tech landscape.
          </p>
          <div className={styles.founderQuote}>
            "Our goal is not just to produce developers, but to empower creators who will build the future of technology."
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
      </motion.div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styles.teamCard}
            whileHover="hover"
            variants={{
              hover: { scale: 1.03 }
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--background)", boxShadow: "var(--neumorph-inset-sm)" }}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
                className={styles.teamImage}
              />
              <motion.div 
                variants={{
                  hover: { opacity: 1, y: 0 }
                }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  background: "linear-gradient(to top, rgba(230, 81, 0, 0.7) 0%, rgba(230, 81, 0, 0.1) 60%, transparent 100%)",
                  backdropFilter: "blur(2px)",
                  color: "white",
                  padding: "2rem",
                  textAlign: "center",
                  pointerEvents: "none"
                }}
              >
                <span style={{ 
                  fontWeight: "900", 
                  fontSize: "1.2rem", 
                  letterSpacing: "2px", 
                  textTransform: "uppercase",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)" 
                }}>{member.role}</span>
              </motion.div>
            </div>
            <div className={styles.teamInfo}>
              <h3 style={{ margin: "1rem 0 0.5rem" }}>{member.name}</h3>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
                <motion.a whileHover={{ y: -3, color: "var(--primary)" }} style={{ color: "var(--text-muted)", cursor: "pointer" }}><Linkedin size={18} /></motion.a>
                <motion.a whileHover={{ y: -3, color: "var(--primary)" }} style={{ color: "var(--text-muted)", cursor: "pointer" }}><Twitter size={18} /></motion.a>
                <motion.a whileHover={{ y: -3, color: "var(--primary)" }} style={{ color: "var(--text-muted)", cursor: "pointer" }}><Github size={18} /></motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
