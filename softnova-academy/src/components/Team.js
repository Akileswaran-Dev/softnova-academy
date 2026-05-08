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
    bio: "She is dedicated to building a positive and professional workplace. She manages recruitment, employee engagement, and team coordination with strong leadership skills. She actively supports student internships and career development initiatives at Softnova. Her people-focused approach helps strengthen the company’s culture and organizational growth.",
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
    bio: "Specializing in modern and responsive website development. He focuses on creating high-quality, user-friendly, and performance-driven web solutions for clients. With strong technical expertise and creative problem-solving skills, he contributes to successful project delivery. His dedication and innovative approach help strengthen Softnova’s digital development team.",
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
            src="/Images/about/founder.png"
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
           Our growth and success are guided by the visionary leadership of our CEO, Founder & Managing Director. With a passion for innovation, technology, and entrepreneurship, he established Softnova with a mission to create impactful digital solutions while empowering young talents and businesses to grow in the modern digital world.

          </p>
          <p className={styles.founderBio}>
            Under his leadership, Softnova has expanded into software development, SaaS solutions, digital services, and professional training programs, delivering quality-driven and future-focused solutions to clients across various industries. His commitment to creativity, excellence, and continuous improvement continues to shape the company’s culture, inspire the team, and drive Softnova toward a stronger and more innovative future.
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
              {member.bio && (
                <p className={styles.memberBio}>{member.bio}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
