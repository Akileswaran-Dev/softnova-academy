"use client";

import React from "react";
import Link from "next/link";
import { 
  PenTool, 
  Layout, 
  Code, 
  Layers, 
  Terminal, 
  Users 
} from "lucide-react";
import styles from "./CoursesSection.module.css";
import FloatingElement from "@/components/FloatingElement";

const COURSES = [
  {
    id: 1,
    title: "Web Design",
    slug: "web-design",
    description: "Web design blends creativity, technical expertise, responsive layouts, and smooth navigation into a seamless digital experience.",
    icon: <PenTool size={32} color="#ff7eb3" />,
    blobClass: styles.pinkBlob,
    tag: "2 months"
  },
  {
    id: 9,
    title: "HR Training",
    slug: "hr-training",
    description: "HR training builds expertise in hiring, onboarding, payroll, and performance management. It also strengthens knowledge of labor laws.",
    icon: <Users size={32} color="#4facfe" />,
    blobClass: styles.blueBlob,
    tag: "3 months"
  },
  {
    id: 2,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "UI/UX Designers craft intuitive, visually engaging digital experiences through research, prototyping, and design tools.",
    icon: <Layout size={32} color="#f093fb" />,
    blobClass: styles.orangeBlob,
    tag: "2 months"
  },
  {
    id: 3,
    title: "Front End Development",
    slug: "front-end-development",
    description: "Front-end developers build responsive, interactive user interfaces with HTML, CSS, JavaScript, and frameworks like React.",
    icon: <Code size={32} color="#6a11cb" />,
    blobClass: styles.purpleBlob,
    tag: "1 - 1.5 months"
  },
  {
    id: 4,
    title: "Full Stack Development",
    slug: "full-stack-development",
    description: "Full Stack Developers build web apps, handling front-end, back-end, and databases using various technologies.",
    icon: <Layers size={32} color="#ff7eb3" />,
    blobClass: styles.pinkBlob,
    tag: "4 months"
  },
  {
    id: 5,
    title: "Java Full Stack Development",
    slug: "java-full-stack-development",
    description: "Covers building and managing both front-end and back-end (UI, APIs, databases) using Java, Spring Boot, and modern web technologies.",
    icon: <Terminal size={32} color="#4facfe" />,
    blobClass: styles.blueBlob,
    tag: "4 months"
  }
];

const CoursesSection = () => {
  return (
    <section className={styles.section} id="courses">
      <div className={styles.container}>
        <div className={`${styles.header} gsap-fade-up`}>
          <h2>Our Courses</h2>
          <p>
            Our courses cater to both beginners and professionals aiming to upskill. Each program follows a project-based approach, ensuring hands-on learning and practical experience. We integrate the latest tools and technologies used in the industry.
          </p>
        </div>

        <div className={`${styles.coursesGrid} gsap-stagger-group`}>
          {COURSES.map((course, index) => (
            <FloatingElement 
              key={course.id} 
              yRange={[15, -15]} 
              duration={4 + index} 
              delay={index * 0.2}
            >
              <div className={`${styles.courseBlobCard} gsap-card`}>
                <div className={`${styles.blob} ${course.blobClass}`}></div>
                <div className={styles.contentWrapper}>
                  <div className={styles.circleIcon}>
                    {course.icon}
                    <span>{course.title.split(' ')[0]}</span>
                  </div>
                  <div className={styles.textSide}>
                    <span className={styles.courseTag}>{course.tag}</span>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDesc}>{course.description}</p>
                    <Link href={`/course/${course.slug}`}>
                      <button className={styles.viewBtn}>Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
            </FloatingElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
