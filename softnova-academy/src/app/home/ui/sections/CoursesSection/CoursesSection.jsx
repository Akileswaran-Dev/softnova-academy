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

const COURSES = [
  {
    id: 1,
    title: "Web Design",
    slug: "web-design",
    description: "Our web design training helps students create modern, responsive, and user-friendly websites with creative UI/UX concepts. Students learn HTML, CSS, JavaScript, and design principles through practical projects and real-time training. The program builds strong design and development skills to prepare learners for careers in the web industry.",
    icon: <PenTool size={32} color="#ff7eb3" />,
    blobClass: styles.pinkBlob,
    tag: "2 months"
  },
  {
    id: 9,
    title: "HR Training",
    slug: "hr-training",
    description: "Our HR training program develops recruitment, communication, employee management, and workplace leadership skills through practical learning. It helps students gain corporate knowledge, build confidence, and prepare for successful HR careers.",
    icon: <Users size={32} color="#4facfe" />,
    blobClass: styles.blueBlob,
    tag: "3 months"
  },
  {
    id: 2,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Our UI/UX design training helps students create attractive, user-friendly, and interactive digital experiences for websites and mobile applications. Students learn wireframing, prototyping, user research, and modern design tools through practical projects and real-time training. The program builds creative and professional design skills to prepare learners for careers in the UI/UX industry.",
    icon: <Layout size={32} color="#f093fb" />,
    blobClass: styles.orangeBlob,
    tag: "2 months"
  },
  {
    id: 3,
    title: "Front End Development",
    slug: "front-end-development",
    description: "Our front-end development training teaches students to build modern, responsive, and interactive websites using the latest web technologies. Students learn HTML, CSS, JavaScript, React, and frameworks through practical projects and real-time development experience. The program develops strong coding and UI implementation skills to prepare learners for successful front-end careers.",
    icon: <Code size={32} color="#6a11cb" />,
    blobClass: styles.purpleBlob,
    tag: "1 - 1.5 months"
  },
  {
    id: 4,
    title: "MERN Stack Development",
    slug: "mern-stack-development",
    description: "Our MERN Stack Development training is designed to provide students with knowledge of how to build full-stack web applications from scratch using MongoDB, Express.js, React, and Node.js. Students gain hands-on experience in real-time projects in front-end and back-end development, database management, RESTful APIs, authentication, and modern development practices. The programme is designed to equip students with coding skills that are ready for industry, providing practical experience to succeed in a career in full-stack web development.",
    icon: <Layers size={32} color="#ff7eb3" />,
    blobClass: styles.pinkBlob,
    tag: "4 months"
  },
  {
    id: 5,
    title: "Python Full Stack Development",
    slug: "python-full-stack-development",
    description: "Our full-stack Python development training provides students with the competencies to construct comprehensive web applications utilizing Python, front-end technologies, and databases. Students acquire practical experience in Django, REST APIs, user interface development, database management, authentication, and real-time project execution. The program cultivates robust full-stack programming competencies and applicable industry expertise to equip learners for prosperous careers in software and web development.",
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
            <div className={`${styles.courseBlobCard} gsap-card`} key={course.id}>
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
                    <span className={styles.viewBtn}>Learn More</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className={styles.buttonContainer}>
          <Link href="/course">
            <button className={styles.exploreMoreBtn} suppressHydrationWarning>
              Explore More Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
