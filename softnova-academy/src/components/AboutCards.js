"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, Users } from "lucide-react";
import styles from "../app/about/about.module.css";
import FloatingElement from "@/components/FloatingElement";

const features = [
  {
    icon: <Users size={36} />,
    title: "Industry Experts",
    desc: "Learn from experienced industry professionals who provide real-world knowledge, practical insights, and hands-on training.Our expert mentors help students build confidence, improve technical skills, and prepare for successful careers.",
    colSpan: "span 7",
    color: "#FF7C30",
  },
  {
    icon: <BookOpen size={36} />,
    title: "Real-Time Projects",
    desc: "Students gain practical experience by working on real-time projects that reflect current industry standards and challenges.This hands-on approach improves technical skills, problem-solving abilities, and confidence for real-world careers.",
    colSpan: "span 5",
    color: "#ff9c60",
  },
  {
    icon: <Briefcase size={36} />,
    title: "Placement Support",
    desc: "Our placement support program helps students prepare for successful careers through interview training, resume building, and career guidance. We provide professional support and industry-focused preparation to improve confidence and job opportunities.",
    colSpan: "span 5",
    color: "#ff9c60",
  },
  {
    icon: <GraduationCap size={36} />,
    title: "Internship Opportunity",
    desc: "We provide internship opportunities that help students gain real-world industry experience and practical exposure. Through hands-on training and live projects, learners can improve their skills, confidence, and career readiness.",
    colSpan: "span 7",
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
         Empowering students with practical learning, expert guidance, and industry-ready skills for a successful future.
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
              <div className={`${styles.featureCard} gsap-card`}>
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
            </FloatingElement>

          );
        })}
      </div>
    </section>
  );
}
