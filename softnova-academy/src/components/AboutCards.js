"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, Users } from "lucide-react";
import styles from "../app/about/about.module.css";
import FloatingElement from "@/components/FloatingElement";

const features = [
  {
    icon: <Users size={36} />,
    title: "Industry Experts",
    desc: "Learn directly from professionals who have built products for top-tier tech companies. Get mentored by the best in the business.",
    colSpan: "span 7",
    color: "#FF7C30",
  },
  {
    icon: <BookOpen size={36} />,
    title: "Real-Time Projects",
    desc: "Gain hands-on experience by building production-ready applications that you can showcase.",
    colSpan: "span 5",
    color: "#ff9c60",
  },
  {
    icon: <Briefcase size={36} />,
    title: "Placement Support",
    desc: "Dedicated placement cell to help you secure your dream job in tech with mock interviews and resume building.",
    colSpan: "span 5",
    color: "#ff9c60",
  },
  {
    icon: <GraduationCap size={36} />,
    title: "Internship Opportunity",
    desc: "Guaranteed internship opportunities for top-performing students to kickstart their career with real company experience.",
    colSpan: "span 7",
    color: "#FF7C30",
  },
];

export default function AboutCards() {
  return (
    <section className={styles.section} style={{ padding: "6rem 2rem", position: "relative" }}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle} style={{ marginBottom: "1rem", fontSize: "3rem", fontWeight: "900", textAlign: "center" }}>
          Why Choose Us
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
          We provide an immersive ecosystem designed to accelerate your growth and bridge the gap between learning and industry demands.
        </p>
      </div>

      <div className={`${styles.featureGrid} gsap-stagger-group`}>
        {features.map((feature, index) => {
          // Subtle floating animations
          const yRange = index % 2 === 0 ? [8, -8] : [12, -12];
          const delay = index * 0.2;
          const duration = 4.5 + (index % 2);

          return (
            <FloatingElement key={index} yRange={yRange} duration={duration} delay={delay}>
              <div 
                className={`${styles.featureCard} gsap-card`}
                style={{
                  gridColumn: feature.colSpan,
                  // Keep these dynamic styles inline as they differ per card
                  background: "var(--background)",
                  textAlign: "left",
                  minHeight: "280px",
                  minWidth: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  borderRadius: "40px",
                  padding: "3rem",
                  boxShadow: "20px 20px 40px rgba(210, 190, 170, 0.5), -20px -20px 40px rgba(255, 255, 255, 0.9)",
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Decorative background circle */}
                <div style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "200px",
                  height: "200px",
                  background: feature.color,
                  opacity: 0.05,
                  borderRadius: "50%",
                  filter: "blur(20px)"
                }}></div>

                <div className={styles.iconWrapper} style={{
                  background: "var(--background)",
                  boxShadow: "inset 8px 8px 16px rgba(210, 190, 170, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 1)",
                  borderRadius: "24px",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  margin: "0", 
                  flexShrink: 0
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-main)", marginTop: "1.5rem", marginBottom: "1rem" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6", opacity: 0.8 }}>
                  {feature.desc}
                </p>
              </div>
            </FloatingElement>
          );
        })}
      </div>
    </section>
  );
}
