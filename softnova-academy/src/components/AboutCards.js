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
    color: "#FF7C30",
  },
  {
    icon: <BookOpen size={36} />,
    title: "Real-Time Projects",
    desc: "Gain hands-on experience by building production-ready applications that you can showcase.",
    color: "#ff9c60",
  },
  {
    icon: <Briefcase size={36} />,
    title: "Placement Support",
    desc: "Dedicated placement cell to help you secure your dream job in tech with mock interviews and resume building.",
    color: "#ff9c60",
  },
  {
    icon: <GraduationCap size={36} />,
    title: "Internship Opportunity",
    desc: "Guaranteed internship opportunities for top-performing students to kickstart their career with real company experience.",
    color: "#FF7C30",
  },
];

export default function AboutCards() {
  return (
    <section className={styles.section} style={{ position: "relative" }}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>
          Why Choose Us
        </h2>
        <p className={styles.sectionDesc}>
          We provide an immersive ecosystem designed to accelerate your growth and bridge the gap between learning and industry demands.
        </p>

      </div>

      <div className={`${styles.featureGrid} gsap-stagger-group`}>
        {features.map((feature, index) => {
          return (
            <div className={`${styles.featureCard} gsap-card`} key={index}>
              {/* Decorative background circle */}
              <div 
                className={styles.cardDecoration} 
                style={{ background: feature.color }} 
              />

              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
