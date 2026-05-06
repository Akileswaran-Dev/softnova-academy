"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, 
  BookOpen, 
  Clock, 
  Target, 
  Award,
  CheckCircle2,
  PlayCircle,
  FileText,
  User,
  Star
} from "lucide-react";
import gsap from "gsap";
import styles from "./course-detail.module.css";

const COURSE_DATA = {
  "web-design": {
    title: "Web Design",
    category: "Design & UX",
    duration: "2 MONTHS",
    image: "/Images/Course/web design.jpg",
    overview: "Web Design – A Creative and Technical Skill Web design involves creating visually appealing, user-friendly websites using layout, colours or theory, typography, and UX principles.",
    modules: [
      {
        id: "01",
        title: "Introduction to HTML",
        lessons: ["Basic of HTML", "HTML Tags", "List, Table, Form", "Grid Structure", "Class, Id, Inline, Internal, External Styles"]
      },
      {
        id: "02",
        title: "Designing using CSS",
        lessons: ["Define CSS", "Tag Styling, Font, Color", "Selectors, FlexBox, Grid, Table", "Animation (key frames)", "Mobile Responsive"]
      },
      {
        id: "03",
        title: "Responsive Design Using BS5",
        lessons: ["Uses of BS5 & How we use", "Layout System (Form, Navbar, etc.)", "Components", "Grid Responsive (Table, Image structure)", "Responsive Shortcuts"]
      },
      {
        id: "04",
        title: "Basic of JS",
        lessons: ["DataTypes", "Variables, Conditions", "Loops (Forloop, ForEach, Map, find, filter)", "Events, Functions", "Form Handling"]
      },
      {
        id: "05",
        title: "Building a basic Website",
        lessons: ["Static Website with responsive", "Dynamic Website", "Portfolio Website", "Business Website (static)", "Oral & Practical Test & Certification"]
      }
    ]
  },
  "hr-training": {
    title: "HR Training",
    category: "Management",
    duration: "3 MONTHS",
    image: "/Images/Course/HR.jpg",
    overview: "HR Training is a structured program that builds essential skills for effective human resource management. It covers recruitment strategies, onboarding processes, and accurate payroll handling.",
    modules: [
      {
        id: "01",
        title: "Recruitment & selection Process",
        lessons: ["Job analysis and JD preparation", "Sourcing candidates (portals, referrals, social media)", "Screening and shortlisting techniques", "Interview methods and assessment tools", "Offer letter, onboarding, and joining formalities"]
      },
      {
        id: "02",
        title: "Performance management & People management",
        lessons: ["Setting KPIs and KRAs", "Appraisal process and feedback systems", "Employee engagement strategies", "Leadership and team development", "Conflict resolution techniques"]
      },
      {
        id: "03",
        title: "Employee relations and talent management",
        lessons: ["Handling grievances and employee concerns", "Building workplace culture and ethics", "Talent acquisition and retention plans", "Exit interviews and offboarding", "Disciplinary actions and compliance"]
      },
      {
        id: "04",
        title: "Hr analytics and HR technology",
        lessons: ["Introduction to HRMS tools", "Tracking employee metrics (attrition, performance, etc.)", "Using data for decision-making", "Attendance and payroll systems", "HR dashboards and reporting"]
      },
      {
        id: "05",
        title: "Compensation & Benefits",
        lessons: ["Salary structure and components (CTC, gross, net)", "Payroll process and compliance (PF, ESI, TDS)", "Bonus, incentives, and variable pay", "Statutory and voluntary benefits", "Compensation benchmarking"]
      }
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    category: "Design & UX",
    duration: "2 MONTHS",
    image: "/Images/Course/UI and UX.jpg",
    overview: "UI/UX Designer – Crafting Seamless Digital Experiences. UI/UX Designers create intuitive, visually appealing digital interfaces that enhance user satisfaction and usability.",
    modules: [
      {
        id: "01",
        title: "Introduction to HTML",
        lessons: ["Basic of HTML", "HTML Tags", "List, Table, Form", "Grid Structure", "Class, Id, Inline, Internal, External Styles"]
      },
      {
        id: "02",
        title: "Designing using CSS",
        lessons: ["Define CSS", "Tag Styling, Font, Color", "Selectors, FlexBox, Grid, Table", "Animation (key frames)", "Mobile Responsive"]
      },
      {
        id: "03",
        title: "Responsive Design Using BS5",
        lessons: ["Uses of BS5 & How we use", "Layout System (Form, Navbar, etc.)", "Components", "Grid Responsive (Table, Image structure)", "Responsive Shortcuts"]
      },
      {
        id: "04",
        title: "Web Design Tools",
        lessons: ["Figma Basics", "Auto Layout", "Components & Variants", "Prototyping in Figma", "Collaboration Tools"]
      },
      {
        id: "05",
        title: "Building a basic Website Design",
        lessons: ["Final Project Design", "Design Review", "Style Guide Creation", "Handoff to Developers", "Portfolio Case Study"]
      }
    ]
  },
  "full-stack-development": {
    title: "Full-Stack Development",
    category: "Development",
    duration: "4 MONTHS",
    image: "/Images/Course/Full Stack.jpg",
    overview: "Full Stack Development covers everything from the front-end user interface to the back-end server logic and database management. You'll learn to build complete, dynamic web applications from scratch using modern technologies like React, Node.js, and MongoDB.",
    modules: [
      {
        id: "01",
        title: "Introduction to Front-end (HTML, CSS)",
        lessons: ["HTML5 Semantic Elements", "Advanced CSS Layouts", "Responsive Design Patterns", "CSS Preprocessors (Sass)", "Modern CSS Frameworks"]
      },
      {
        id: "02",
        title: "Design of BS5 & Basic of JS",
        lessons: ["Bootstrap 5 Mastery", "JS Fundamentals", "ES6+ Features", "Async JavaScript (Promises/Async-Await)", "Working with APIs (Fetch)"]
      },
      {
        id: "03",
        title: "Domain as REACT",
        lessons: ["React Hooks", "State Management (Context/Redux)", "React Router", "Component Lifecycle", "Performance Optimization"]
      },
      {
        id: "04",
        title: "BACK-End: Node JS & Express JS",
        lessons: ["Node.js Runtime", "Express Framework", "RESTful API Design", "Authentication & JWT", "Middleware & Routing"]
      },
      {
        id: "05",
        title: "MongoDB (Database)",
        lessons: ["NoSQL Concepts", "Mongoose ODM", "CRUD Operations", "Aggregation Pipeline", "Data Modeling"]
      }
    ]
  },
  "front-end-development": {
    title: "Front-End Development",
    category: "Development",
    duration: "3 - 3.5 MONTHS",
    image: "/Images/Course/Fronend developer.jpg",
    overview: "Front-End Developer – Building the user side of the Web. Front-end developers create the visual and interactive elements of websites using HTML, CSS, and Java-script.",
    modules: [
      {
        id: "01",
        title: "Introduction to HTML & CSS",
        lessons: ["Basic of HTML Tags", "List, Table, Form, Grid Structure", "Class, Id, Inline, Internal, External Styles", "Tag Styling, Font, Color,Selectors, FlexBox, Grid , Table", "Animation (key frames), Mobile Responsive"]
      },
      {
        id: "02",
        title: "Responsive Design Using BS5",
        lessons: ["Uses of BS5 & How we use", "Layout System (Form, Navbar, etc.)", "Components", "Grid Responsive (Table, Image structure)", "Responsive Shortcuts"]
      },
      {
        id: "03",
        title: "Basic of JS",
        lessons: ["DataTypes", "Variables, Conditions", "Loops (Forloop, ForEach, Map, find, filter)", "Events, Functions", "Form Handling"]
      },
      {
        id: "04",
        title: "Building a basic Website",
        lessons: ["Static Website with responsive", "Dynamic Website", "Portfolio Website", "Business Website (static)", "Oral & Practical Test"]
      },
      {
        id: "05",
        title: "Domain as REACT",
        lessons: ["Basic Of React, Installation Method", "Structure of React, Inline Styling, Functions", "Condition, Loop, Events, Routing", "Form Handling, React Hooks", "Oral & Practical Test & Certification"]
      }
    ]
  },
  "java-full-stack-development": {
    title: "Java Full Stack Development",
    category: "Development",
    duration: "4 MONTHS",
    image: "/Images/Course/Java Full stack.jpg",
    overview: "Java Full Stack Development involves building both front-end and back-end of web applications using Java and related technologies. It includes using HTML, CSS, JavaScript (Angular/React) for UI, and Java with Spring Boot for server-side logic. Developers also manage databases (MySQL/MongoDB), APIs, and version control (Git). They handle the full application lifecycle from design to deployment.",
    modules: [
      {
        id: "01",
        title: "Introduction to Front-end (HTML, CSS)",
        lessons: ["Basic of HTML Tags, List, Table, Form, Grid", "Class, Id, Inline, Internal, External Styles", "CSS Tag Styling, Selectors, Grid, Table", "Animation (key frames)", "Mobile Responsive"]
      },
      {
        id: "02",
        title: "Design of BS5 & Basic of JS",
        lessons: ["Layout System (Form, Navbar, etc.,)", "Components, Grid Responsive (Table, Image structure)", "DataTypes, Variables, Conditions", "Loops (Forloop, ForEach, Map, find, filter)", "Functions, Form Handling"]
      },
      {
        id: "03",
        title: "Introduction of JAVA",
        lessons: ["Java Methods (Scope, Recursion)", "Java Classes (OOPs), Java Errors (Debug, Exceptions)", "Java File Handling (CRUD)", "Java Data Structure(List, Tree, Sort, Hash)", "Advance JAVA Concepts"]
      },
      {
        id: "04",
        title: "Spring Boot Framework & Libraries",
        lessons: ["Spring Boot Basics & Project Setup", "Creating REST APIs", "Database Integration (CRUD)", "Application Configuration & Properties", "Spring Boot with Security & Validation"]
      },
      {
        id: "05",
        title: "MySQL for Database",
        lessons: ["MySQL Basics & Installation", "DATABASE & Table Operations", "CRUD Operations(SQL Commands)", "Joins & Relationships", "Advance Concepts"]
      }
    ]
  },
  "desktop-support-engineer": {
    title: "Desktop Support Engineer",
    category: "Engineering",
    duration: "1 - 1.5 MONTHS",
    image: "/Images/Course/Desktop engineer.jpg",
    overview: "A Desktop Support Engineer is an IT specialist who handles the installation, configuration, and troubleshooting of operating systems, software, and hardware on desktops and laptops. They assist with network connectivity, peripheral setup, and provide user support through remote or on-site help. Their role includes performing system updates, backups, and ensuring device security. They also maintain documentation of technical issues, solutions, and inventory records. This role is essential for minimizing downtime and ensuring smooth IT operations within an organization.",
    modules: [
      {
        id: "01",
        title: "Introduction to Operating Systems",
        lessons: ["What is an Operating System (OS)", "Types of OS (Windows, Linux, macOS)", "Functions of OS – Process, Memory, File Management", "User Interface – CLI vs GUI", "OS Installation & basic navigation"]
      },
      {
        id: "02",
        title: "Introduction to Hardware & Software",
        lessons: ["Hardware components – CPU, RAM, Hard Drive, Motherboard", "Types of software – System vs Application software", "Peripherals – Input/Output devices", "Device drivers and firmware", "Troubleshooting common hardware/software issues"]
      },
      {
        id: "03",
        title: "Commencement of Networking & Troubleshooting",
        lessons: ["Basics of LAN, WAN, IP Addressing", "Network devices – Router, Switch, Modem", "Cabling, Ports, and Network Topologies", "IP configuration & ping/tracert commands", "Network issue identification & resolution"]
      },
      {
        id: "04",
        title: "Preface of Customer Service",
        lessons: ["Importance of customer support in IT", "Communication skills – verbal & written", "Ticketing tools (example: Freshdesk, Zoho Desk)", "Handling complaints and feedback professionally", "Providing technical assistance with empathy"]
      }
    ]
  },
  "networking-ccna": {
    title: "Networking & CCNA",
    category: "Networking",
    duration: "3 MONTHS",
    image: "/Images/Course/Networking.jpg",
    overview: "A CISCO Certified Network Associate (CCNA) is a globally recognized certification that validates essential networking skills. It covers topics like network fundamentals, IP addressing, routing, switching, and security basics. CCNA holders can install, configure, and troubleshoot networks using Cisco devices. This certification suits entry-level network engineers and IT professionals. It serves as a strong foundation for a career in networking.",
    modules: [
      {
        id: "01",
        title: "Introduction to Hardware and Software",
        lessons: ["Types of computer hardware and components", "Operating Systems and software types", "Input/output devices and drivers", "BIOS/UEFI and system boot process", "Installation and troubleshooting basics"]
      },
      {
        id: "02",
        title: "Fundamentals of Networking",
        lessons: ["LAN, WAN, MAN, PAN concepts", "OSI and TCP/IP models", "MAC vs IP address", "Types of cables, ports, and topologies", "Basics of switches, routers, and hubs"]
      },
      {
        id: "03",
        title: "IP Services / Server",
        lessons: ["DHCP – Dynamic IP allocation", "DNS – Domain Name Resolution", "NAT – Network Address Translation", "FTP, HTTP, and email services", "Server types and basic configuration"]
      },
      {
        id: "04",
        title: "Network Access",
        lessons: ["VLANs and trunking", "Ethernet standards (IEEE 802.3)", "Media access control", "Switch configuration basics", "Wireless standards and security"]
      }
    ]
  },
  "business-development-executive": {
    title: "Business Development Executive",
    category: "Business",
    duration: "2 MONTHS",
    image: "/Images/Course/Business.jpg",
    overview: "Business Development Executive focuses on growing a company by identifying opportunities and generating leads. They pitch products/services, build client relationships, and close deals. The role includes market research, sales target achievement, and coordination with internal teams. Strong communication and negotiation skills are vital. They play a key role in expanding business reach and revenue.",
    modules: [
      {
        id: "01",
        title: "Strategic Planning & Relationship Building",
        lessons: ["Define goals and vision", "Conduct SWOT analysis", "Plan using SMART strategy", "Map key stakeholders", "Build long-term relationships"]
      },
      {
        id: "02",
        title: "Market Research & Sales Strategies",
        lessons: ["Identify target audience", "Analyze competitors", "Create buyer personas", "Design effective sales funnels", "Use CRM for lead tracking"]
      },
      {
        id: "03",
        title: "Negotiation & Communication & Interpersonal Skills",
        lessons: ["Practice active listening", "Improve body language", "Handle objections calmly", "Use win-win negotiation", "Build trust in teams"]
      },
      {
        id: "04",
        title: "Financial Management",
        lessons: ["Set budgets and forecasts", "Track income and expenses", "Analyze break-even point", "Understand ROI", "Learn funding basics"]
      },
      {
        id: "05",
        title: "Digital Marketing",
        lessons: ["Use SEO and Google Ads", "Market via social media", "Create engaging content", "Track results with analytics", "Run email/WhatsApp campaigns."]
      }
    ]
  }
};

export default function CourseDetailPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const courseId = id || "web-design";
  const course = COURSE_DATA[courseId] || COURSE_DATA["web-design"];
  
  const [activeTab, setActiveTab] = useState(course.modules[0].title);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".gsap-animate", {
        opacity: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const TABS = course.modules.map(mod => mod.title);

  return (
    <main className={styles.detailPage} ref={containerRef}>
      <div className={styles.container}>
        {/* Back Button */}
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={20} /> Back to Courses
        </button>

        {/* Header Section */}
        <header className={`${styles.header} gsap-animate`}>
          <div className={styles.headerInfo}>
            <span className={styles.categoryTag}>{course.category}</span>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.overviewText}>{course.overview}</p>
            <div className={styles.meta}>
              <div className={styles.metaItem}><Clock size={18} /> {course.duration}</div>
              <div className={styles.metaItem}><User size={18} /> 500+ Students</div>
              <div className={styles.metaItem}><Star size={18} color="#ff7c30" fill="#ff7c30" /> 4.9 Rating</div>
            </div>
            <div className={styles.headerAction}>
               <Link href="/contact-us">
                 <div className={styles.enrollBtn}>Contact Us</div>
               </Link>
            </div>
          </div>
          <div className={styles.headerVisual}>
            <div className={styles.headerImgWrapper}>
              <Image 
                src={course.image} 
                alt={course.title} 
                fill 
                className={styles.headerImg}
              />
            </div>
          </div>
        </header>

        {/* Neumorphic Tabs (Module Titles) */}
        <div className={`${styles.tabsContainer} gsap-animate`}>
          {course.modules.map((mod, index) => (
            <div 
              key={mod.title} 
              className={`${styles.tab} ${activeTab === mod.title ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(mod.title)}
            >
              <span className={styles.tabNum}>{String(index + 1).padStart(2, '0')}</span>
              {mod.title}
            </div>
          ))}
        </div>

        <div className={`${styles.contentArea} gsap-animate`}>
          <div className={styles.syllabusGrid}>
            {course.modules
              .filter(mod => mod.title === activeTab) 
              .map((mod) => (
                <div key={mod.id} className={styles.moduleCard}>
                  <div className={styles.moduleHeader}>
                    <div className={styles.modNumCrater}>
                      <span>{mod.id}</span>
                    </div>
                    <h3 className={styles.modTitle}>{mod.title}</h3>
                  </div>
                  <div className={styles.lessonList}>
                    {mod.lessons.map((lesson, idx) => (
                      <div key={idx} className={styles.lessonItem}>
                        <div className={styles.lessonIcon}>
                          <PlayCircle size={16} />
                        </div>
                        <div className={styles.lessonContent}>
                          <span className={styles.lessonTitle}>{lesson}</span>
                          <span className={styles.lessonSub}>Lesson {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
