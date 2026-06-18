"use client";

import { useState, useEffect } from "react";
import { Linkedin, Twitter, Github } from "./Icons";
import Image from "next/image";
import styles from "../app/about/about.module.css";

const teamMembers = [
  {
    name: "Mahetha Selvaraj",
    role: "HR",
    domain: "HR",
    bio: "She is dedicated to building a positive and professional workplace. She manages recruitment, employee engagement, and team coordination with strong leadership skills. She actively supports student internships and career development initiatives at Softnova. Her people-focused approach helps strengthen the company's culture and organizational growth.",
    image: "/Images/about/Akka.webp",
  },
  {
    name: "Dharshika",
    role: "Team Lead",
    domain: "TEAM LEAD",
    bio: "Guiding the team with dedication and professionalism. She plays an important role in project coordination, team management, and maintaining workflow efficiency. With strong communication and leadership skills, she supports both clients and team members effectively. Her commitment and teamwork contribute to the successful growth of Softnova.",
    image: "/Images/about/TL.webp",
  },
  {
    name: "Adhithyan",
    role: "Developer",
    domain: "DEVELOPER",
    bio: "Specializing in modern and responsive website development. He focuses on creating high-quality, user-friendly, and performance-driven web solutions for clients. With strong technical expertise and creative problem-solving skills, he contributes to successful project delivery. His dedication and innovative approach help strengthen Softnova's digital development team.",
    image: "/Images/about/dev.webp",
  },
];

const CHAR_LIMIT = 120;

function ReadMoreBio({ bio, bioClass, style }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile || bio.length <= CHAR_LIMIT) {
    return <p className={bioClass} style={style}>{bio}</p>;
  }

  return (
    <div className={styles.bioWrapper}>
      <p className={bioClass} style={style}>
        {bio.slice(0, CHAR_LIMIT)}
        {expanded ? bio.slice(CHAR_LIMIT) : "..."}
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
    </div>
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
    <div className={styles.founderBioWrapper}>
      <p className={styles.founderBio}>
        {combined.slice(0, CHAR_LIMIT)}
        {expanded ? combined.slice(CHAR_LIMIT) : "..."}
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
    </div>
  );
}

export default function Team() {
  return (
    <section className={styles.section}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
      </div>

      {/* Founder Section */}
      <div className={`${styles.founderSection} gsap-fade-up`}>
        <div className={styles.founderImageWrapper}>
          <Image
            src="/Images/about/founder.webp"
            alt="Our Founder"
            width={500}
            height={500}
            className={styles.founderImage}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          />
          <div className={styles.orangeSplash} />
          <div className={styles.teamOverlay}>
            <span className={styles.memberRole}>Founder &amp; CEO</span>
          </div>
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
      </div>

      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
      </div>

      <div className={`${styles.teamGrid} gsap-stagger-group`}>
        {teamMembers.map((member, index) => (
          <div key={index} className={`${styles.teamCard} gsap-card`}>
            <div className={styles.teamImageContainer}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={styles.teamImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={
                  member.image === "/Images/about/Akka.webp" ||
                  member.image === "/Images/about/dharshika_new_v4.webp"
                }
              />
              <div className={styles.orangeSplash} />
              <div className={styles.teamOverlay}>
                <span className={styles.memberRole}>{member.role}</span>
              </div>
            </div>

            <div className={styles.teamInfo}>
              <h3>{member.name}</h3>
              <div className={styles.memberDomain}>{member.domain}</div>
              {member.bio && (
                <ReadMoreBio bio={member.bio} style={{ textAlign: "center" }} bioClass={styles.memberBio} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
