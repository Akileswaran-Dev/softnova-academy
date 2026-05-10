"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Twitter, Github } from "./Icons";
import Image from "next/image";
import styles from "../app/about/about.module.css";

const teamMembers = [
  {
    name: "Mahetha Selvaraj",
    role: "HR",
    domain: "HR",
    bio: "She is dedicated to building a positive and professional workplace. She manages recruitment, employee engagement, and team coordination with strong leadership skills. She actively supports student internships and career development initiatives at Softnova. Her people-focused approach helps strengthen the company's culture and organizational growth.",
    image: "/Images/gallery/Akka.png",
  },
  {
    name: "Dharshika",
    role: "Team Lead",
    domain: "TEAM LEAD",
    bio: "Guiding the team with dedication and professionalism. She plays an important role in project coordination, team management, and maintaining workflow efficiency. With strong communication and leadership skills, she supports both clients and team members effectively. Her commitment and teamwork contribute to the successful growth of Softnova.",
    image: "/Images/about/dharshika_new_v3.jpg",
  },
  {
    name: "Adhithyan",
    role: "Developer",
    domain: "DEVELOPER",
    bio: "Specializing in modern and responsive website development. He focuses on creating high-quality, user-friendly, and performance-driven web solutions for clients. With strong technical expertise and creative problem-solving skills, he contributes to successful project delivery. His dedication and innovative approach help strengthen Softnova's digital development team.",
    image: "/Images/gallery/dev.jpg",
  },
];

const CHAR_LIMIT = 120;

function ReadMoreBio({ bio, bioClass }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile || bio.length <= CHAR_LIMIT) {
    return <p className={bioClass}>{bio}</p>;
  }

  return (
    <motion.div layout className={styles.bioWrapper}>
      <p className={bioClass}>
        {bio.slice(0, CHAR_LIMIT)}
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.span
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {bio.slice(CHAR_LIMIT)}
            </motion.span>
          )}
          {!expanded && (
            <motion.span
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ...
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={styles.readMoreBtn}
        >
          {expanded ? " Show Less" : " Read More"}
        </button>
      </p>
    </motion.div>
  );
}

function ReadMoreFounderBio({ paras }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) {
    return (
      <>
        {paras.map((p, i) => (
          <p key={i} className={styles.founderBio}>{p}</p>
        ))}
      </>
    );
  }

  const combined = paras.join(" ");
  return (
    <motion.div layout className={styles.founderBioWrapper}>
      <p className={styles.founderBio}>
        {combined.slice(0, CHAR_LIMIT)}
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.span
              key="expanded-founder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {combined.slice(CHAR_LIMIT)}
            </motion.span>
          )}
          {!expanded && (
            <motion.span
              key="collapsed-founder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ...
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={styles.readMoreBtn}
        >
          {expanded ? " Show Less" : " Read More"}
        </button>
      </p>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className={styles.section}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
      </div>

      {/* Founder Section */}
      <motion.div
        layout
        className={`${styles.founderSection} gsap-fade-up`}
        whileHover="hover"
        initial="initial"
        transition={{ layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 25 } }}
      >
        <div className={styles.founderImageWrapper}>
          <Image
            src="/Images/about/founder.png"
            alt="Our Founder"
            width={500}
            height={500}
            className={styles.founderImage}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          />
          <motion.div
            className={styles.orangeSplash}
            variants={{
              initial: { scale: 0, opacity: 0, rotate: -20 },
              hover: { scale: 1.8, opacity: 0.5, rotate: 10 },
            }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className={styles.teamOverlay}
          >
            <span className={styles.memberRole}>Founder &amp; CEO</span>
          </motion.div>
        </div>

        <div className={styles.founderContent}>
          <div className={styles.founderHeader}>
            <h2 className={styles.founderName}>Our Founder</h2>
            <span className={styles.founderRole}>Founder &amp; CEO</span>
          </div>

          <ReadMoreFounderBio
            paras={[
              "Our growth and success are guided by the visionary leadership of our CEO, Founder & Managing Director. With a passion for innovation, technology, and entrepreneurship, he established Softnova with a mission to create impactful digital solutions while empowering young talents and businesses to grow in the modern digital world.",
              "Under his leadership, Softnova has expanded into software development, SaaS solutions, digital services, and professional training programs, delivering quality-driven and future-focused solutions to clients across various industries. His commitment to creativity, excellence, and continuous improvement continues to shape the company's culture, inspire the team, and drive Softnova toward a stronger and more innovative future.",
            ]}
          />

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
            layout
            key={index}
            className={`${styles.teamCard} gsap-card`}
            whileHover="hover"
            initial="initial"
            transition={{ layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 25 } }}
          >
            <div className={styles.teamImageContainer}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={styles.teamImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <motion.div
                className={styles.orangeSplash}
                variants={{
                  initial: { scale: 0, opacity: 0, rotate: -20 },
                  hover: { scale: 1.5, opacity: 0.6, rotate: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              />
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={styles.teamOverlay}
              >
                <span className={styles.memberRole}>{member.role}</span>
              </motion.div>
            </div>

            <div className={styles.teamInfo}>
              <h3>{member.name}</h3>
              <div className={styles.memberDomain}>{member.domain}</div>
              {member.bio && (
                <ReadMoreBio bio={member.bio} bioClass={styles.memberBio} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
