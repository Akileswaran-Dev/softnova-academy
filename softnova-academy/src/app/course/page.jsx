"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { 
  ArrowRight, 
  Code, 
  PenTool, 
  Layout, 
  Terminal, 
  Database, 
  Layers,
  Monitor,
  Globe,
  Zap,
  Users
} from "lucide-react";
import styles from "./course.module.css";

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  {
    id: 1,
    category: "Design & UX",
    title: "Web Design",
    slug: "web-design",
    image: "/Images/Course/web design.jpg",
    description: "Web design blends creativity, technical expertise, responsive layouts, and smooth navigation into a seamless digital experience.",
    author: "Softnova Academy",
    duration: "2 MONTHS",
    icon: <PenTool size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to HTML" },
      { id: "02", text: "Designing using CSS" },
      { id: "03", text: "Responsive Design Using BS5" },
      { id: "04", text: "Basic of JS" },
      { id: "05", text: "Building a basic Website" }
    ]
  },
  {
    id: 2,
    category: "Design & UX",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    image: "/Images/Course/UI and UX.jpg",
    description: "UI/UX Designers craft intuitive, visually engaging digital experiences through research, prototyping, and design tools.",
    author: "Softnova Academy",
    duration: "2 MONTHS",
    icon: <Layout size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to HTML" },
      { id: "02", text: "Designing using CSS" },
      { id: "03", text: "Responsive Design Using BS5" },
      { id: "04", text: "Web Design Tools" },
      { id: "05", text: "Building a basic Website Design" }
    ]
  },
  {
    id: 3,
    category: "Development",
    title: "Front-End Development",
    slug: "front-end-development",
    image: "/Images/Course/Fronend developer.jpg",
    description: "Front-end developers build responsive, interactive user interfaces with HTML, CSS, JavaScript, and frameworks like React.",
    author: "Softnova Academy",
    duration: "3 - 3.5 MONTHS",
    icon: <Code size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to HTML & CSS" },
      { id: "02", text: "Responsive Design Using BS5" },
      { id: "03", text: "Basic of JS" },
      { id: "04", text: "Building a basic Website" },
      { id: "05", text: "Domain as REACT" }
    ]
  },
  {
    id: 4,
    category: "Development",
    title: "Full-Stack Development",
    slug: "full-stack-development",
    image: "/Images/Course/Full Stack.jpg",
    description: "Full Stack Developers build web apps, handling front-end, back-end, and databases using various technologies.",
    author: "Softnova Academy",
    duration: "4 MONTHS",
    icon: <Layers size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to Front-end (HTML, CSS)" },
      { id: "02", text: "Design of BS5 & Basic of JS" },
      { id: "03", text: "Domain as REACT" },
      { id: "04", text: "BACK-End: Node JS & Express JS" },
      { id: "05", text: "MongoDB (Database)" }
    ]
  },
  {
    id: 5,
    category: "Development",
    title: "Java Full Stack Development",
    slug: "java-full-stack-development",
    image: "/Images/Course/Java Full stack.jpg",
    description: "Covers building and managing both front-end and back-end using Java, Spring Boot, and modern web technologies.",
    author: "Softnova Academy",
    duration: "4 MONTHS",
    icon: <Terminal size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to Front-end (HTML, CSS)" },
      { id: "02", text: "Design of BS5 & Basic of JS" },
      { id: "03", text: "Introduction of JAVA" },
      { id: "04", text: "Spring Boot Framework & Libraries" },
      { id: "05", text: "MySQL for Database" }
    ]
  },
  {
    id: 6,
    category: "Engineering",
    title: "Desktop Support Engineer",
    slug: "desktop-support-engineer",
    image: "/Images/Course/Desktop engineer.jpg",
    description: "Engineers manage setup, troubleshooting, updates, security, and user support to ensure smooth organizational IT operations.",
    author: "Softnova Academy",
    duration: "1 - 1.5 MONTHS",
    icon: <Monitor size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to Operating Systems" },
      { id: "02", text: "Introduction to Hardware & Software" },
      { id: "03", text: "Commencement of Networking & Troubleshooting" },
      { id: "04", text: "Preface of Customer Service" }
    ]
  },
  {
    id: 7,
    category: "Networking",
    title: "Networking & CCNA",
    slug: "networking-ccna",
    image: "/Images/Course/Networking.jpg",
    description: "A CCNA is a globally recognized certification that validates core networking skills for a strong foundation in a networking career.",
    author: "Softnova Academy",
    duration: "3 MONTHS",
    icon: <Globe size={60} />,
    curriculum: [
      { id: "01", text: "Introduction to Hardware and Software" },
      { id: "02", text: "Fundamentals of Networking" },
      { id: "03", text: "IP Services / Server" },
      { id: "04", text: "Network Access" }
    ]
  },
  {
    id: 8,
    category: "Business",
    title: "Business Development Executive",
    slug: "business-development-executive",
    image: "/Images/Course/Business.jpg",
    description: "BDEs grow companies by generating leads, pitching, closing deals, and expanding revenue through strategic planning.",
    author: "Softnova Academy",
    duration: "2 MONTHS",
    icon: <Zap size={60} />,
    curriculum: [
      { id: "01", text: "Strategic Planning & Relationship Building" },
      { id: "02", text: "Market Research & Sales Strategies" },
      { id: "03", text: "Negotiation & Communication Skills" },
      { id: "04", text: "Financial Management" },
      { id: "05", text: "Digital Marketing" }
    ]
  },
  {
    id: 9,
    category: "Management",
    title: "HR Training",
    slug: "hr-training",
    image: "/Images/Course/HR.jpg",
    description: "HR training builds expertise in hiring, onboarding, payroll, and performance management and labor laws.",
    author: "Softnova Academy",
    duration: "3 MONTHS",
    icon: <Users size={60} />,
    curriculum: [
      { id: "01", text: "Recruitment & Selection Process" },
      { id: "02", text: "Performance & People management" },
      { id: "03", text: "Employee relations and talent management" },
      { id: "04", text: "Hr analytics and HR technology" },
      { id: "05", text: "Compensation & Benefits" }
    ]
  }
];

export default function CoursePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gsap-header-animate", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all"
      });

      // Cards Animation - Faster and clearer
      gsap.from(".gsap-course-card", {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".gsap-course-grid",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.coursePage} ref={containerRef}>
      <div className={styles.container}>
        <header className={`${styles.header} gsap-header-animate`}>
          <span className={styles.tagline}>PREMIUM OFFLINE COURSES</span>
          <h1>Offline Courses on <br/>Design and Development</h1>
          <p>
            Our courses offer a hands-on, immersive learning experience in a collaborative classroom setting. 
            Whether you&apos;re a beginner or a professional, we cater to all skill levels.
          </p>
        </header>

        <div className={`${styles.courseGrid} gsap-course-grid`}>
          {COURSES.map((course) => (
            <div key={course.id} className={`${styles.courseCard} gsap-course-card`}>
              {/* Left Image Section */}
              <div className={styles.cardLeft}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={course.image} 
                    alt={course.title} 
                    fill 
                    className={styles.courseImg}
                  />
                  <div className={styles.iconOverlay}>
                    {course.icon}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className={styles.cardRight}>
                <span className={styles.category}>{course.category}</span>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDesc}>{course.description}</p>

                <div className={styles.cardMeta}>
                  <p className={styles.author}>Created by <span>{course.author}</span></p>
                  <span className={styles.duration}>{course.duration}</span>
                </div>

                {/* Curriculum Steps (from Image 1 style) */}
                <div className={styles.curriculum}>
                  {course.curriculum.map((step) => (
                    <div key={step.id} className={styles.step}>
                      <span className={styles.stepNum}>{step.id}</span>
                      <span className={styles.stepText}>{step.text}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow Action Button (from Image 2 style) */}
                <Link href={`/course/${course.slug}`} className={styles.actionBtn}>
                  <ArrowRight size={32} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
