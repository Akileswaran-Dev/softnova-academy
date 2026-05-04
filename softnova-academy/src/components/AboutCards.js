"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, Users } from "lucide-react";
import styles from "../app/about/about.module.css";

const features = [
  {
    icon: <Users size={32} />,
    title: "Industry Experts",
    desc: "Learn directly from professionals who have built products for top-tier tech companies.",
  },
  {
    icon: <BookOpen size={32} />,
    title: "Real-Time Projects",
    desc: "Gain hands-on experience by building production-ready applications.",
  },
  {
    icon: <Briefcase size={32} />,
    title: "Placement Support",
    desc: "Dedicated placement cell to help you secure your dream job in tech.",
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Internship Opportunity",
    desc: "Guaranteed internship opportunities for top-performing students.",
  },
];

export default function AboutCards() {
  return (
    <section className={styles.section}>
      <div className="gsap-fade-up">
        <h2 className={styles.sectionTitle}>
          Why Choose Us
        </h2>
      </div>

      <div className={`${styles.featureGrid} gsap-stagger-group`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.featureCard} gsap-card`}
          >
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
