"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './InternshipPage.module.css';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import FloatingElement from "@/components/FloatingElement";

const INTERNSHIPS = [
  {
    id: 1, title: 'Web Design', description: 'Web Design – A Creative and Technical Skill Web design involves creating visually appealing, user-friendly websites using layout, colours or theory, typography, and UX principles.It blends aesthetics with functionality, ensuring responsive design, smooth navigation, and fast performance.Using tools like HTML, CSS and Figma web designers build sites that enhance digital presence and drive success.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>)
  },
  {
    id: 2, title: 'UI/UX Designer', description: 'UI/UX Designer – Crafting Seamless Digital Experiences UI/UX Designers create intuitive, visually appealing digital interfaces that enhance user satisfaction and usability.They conduct user research, build wireframes and prototypes, and collaborate with developers to bring designs to life.Using tools like Figma and Sketch, they ensure designs are both functional and aesthetically pleasing.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>)
  },
  {
    id: 3, title: 'Front-End Developer', description: 'Front-End Developer – Building the User Side of the Web Front-end developers create the visual and interactive elements of websites using HTML, CSS, and JavaScript.They work with designers to build responsive, user-friendly interfaces that function smoothly across devices.Using tools like React, Angular, or Vue. Js, they ensure fast, accessible, and high-performing web experiences.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>)
  },
  {
    id: 4, title: 'Java Full Stack Development', description: 'Java Full Stack Development involves building both front-end and back-end of web applications using Java and related technologies. It includes using HTML, CSS, JavaScript (Angular/React) for UI, and Java with Spring Boot for server-side logic. Developers also manage databases (MySQL/MongoDB), APIs, and version control (Git). They handle the full application lifecycle from design to deployment.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><path d="M8 7h8"></path><path d="M8 11h8"></path><path d="M8 15h4"></path></svg>)
  },
  {
    id: 5, title: 'Full Stack Development', description: 'A Full Stack Developer is a software professional skilled in both front-end (client-side) and back-end (server-side) development of web applications.They work on:Front-End: Designing user interfaces using HTML, CSS, JavaScript, and frameworks like React.Back-End: Databases using languages like Java, Python, Node.js, PHP, or Ruby, along with frameworks like Spring Boot or Express.js. Databases: Managing data using MySQL, MongoDB.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 16V4a2 2 0 0 1 2-2h11"></path><path d="M22 18v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"></path><rect x="8" y="7" width="14" height="11" rx="2"></rect></svg>)
  },
  {
    id: 6, title: 'Desktop Support Engineer', description: 'A Desktop Support Engineer is an IT specialist who handles the installation, configuration, and troubleshooting of operating systems, software, and hardware on desktops and laptops. They assist with network connectivity, peripheral setup, and provide user support through remote or on-site help. Their role includes performing system updates, backups, and ensuring device security. They also maintain documentation of technical issues, solutions, and inventory records. This role is essential for minimizing downtime and ensuring smooth IT operations within an organization.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>)
  },
  {
    id: 7, title: 'CISCO', description: 'A CISCO Certified Network Associate (CCNA) is a globally recognized certification that validates essential networking skills. It covers topics like network fundamentals, IP addressing, routing, switching, and security basics. CCNA holders can install, configure, and troubleshoot networks using Cisco devices. This certification suits entry-level network engineers and IT professionals. It serves as a strong foundation for a career in networking.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>)
  },
  {
    id: 8, title: 'HR Training', description: 'HR Training is a structured program that builds essential skills for effective human resource management. It covers recruitment strategies, onboarding processes, and accurate payroll handling. Participants learn to manage performance through goal setting, feedback, and fair appraisals. The program also emphasizes legal compliance and understanding of labor laws. Overall, it prepares HR professionals to support both employees and organizational goals efficiently.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>)
  },
  {
    id: 9, title: 'Business Development Executive', description: 'A Business Development Executive focuses on growing a company by identifying opportunities and generating leads. They pitch products/services, build client relationships, and close deals. The role includes market research, sales target achievement, and coordination with internal teams. Strong communication and negotiation skills are vital. They play a key role in expanding business reach and revenue.',
    icon: (<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>)
  }
];

const InternshipPage = () => {
  const contactFormRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainInternships = INTERNSHIPS.slice(0, 3); // Get top 3 for carousel

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % mainInternships.length);
    }, 4500); // 4.5 seconds auto-cycle
    return () => clearInterval(interval);
  }, [mainInternships.length]);

  const activeItem = mainInternships[activeIndex];

  const handleApplyClick = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
  };

  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade Up
      gsap.utils.toArray(".gsap-fade-up").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger Cards
      gsap.utils.toArray(".gsap-stagger-group").forEach((group) => {
        const cards = group.querySelectorAll(".gsap-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.section} ref={containerRef}>
      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      <div className={styles.container}>
        <section className={styles.hero3d}>
          <div className={styles.baseBlob}></div>

          {/* Architectural Lines */}
          <div className={styles.linesHorizontal}></div>
          <div className={styles.linesVertical}></div>
          <div className={styles.linesCorner}></div>

          {/* Left Elements */}
          <div className={styles.leftElements}>
            <div className={styles.glassHalfSphere}></div>
            <div className={styles.whiteSphereLarge}></div>
            <div className={styles.whiteDish}></div>
            <div className={styles.smallCardLeft}>
              <div className={styles.miniHeader}>PRACTICAL SKILLS</div>
              <div className={styles.miniLines}>
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          {/* Central Tablet */}
          <div className={styles.centerTablet}>
            <div className={styles.tabletInner}>
              <div className={styles.tealBand}></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    x: 350,
                    y: (activeIndex - 1) * 120, // Calculates dynamic Y based on stack position (-120, 0, 120)
                    scale: 0.35, // Starts at the size of the mini card
                    rotateZ: -5,
                    rotateY: -20
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateZ: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -300, y: 50, scale: 0.7, rotateZ: -10, rotateY: -30 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={styles.tabletContentCard}
                  style={{ transformOrigin: "center center", transformPerspective: 1200 }}
                >
                  <div className={styles.carouselContent}>
                    <h1 className={styles.mainTitle}>
                      {activeItem.title}
                    </h1>
                    <p className={styles.mainDesc}>
                      {activeItem.description.substring(0, 160)}...
                    </p>
                  </div>
                  <button className={styles.exploreBtn} onClick={handleApplyClick} suppressHydrationWarning>
                    APPLY NOW
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Elements */}
          <div className={styles.rightElements}>
            <div className={styles.rightCardStack}>
              {mainInternships.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={styles.stackedCard}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    x: index === activeIndex ? -20 : 0,
                    opacity: index === activeIndex ? 1 : 0.5,
                    scale: index === activeIndex ? 1.05 : 1
                  }}
                  whileHover={{ scale: 1.05, opacity: 1, x: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {/* Show a colored indicator strip if active */}
                  <motion.div
                    className={styles.activeIndicator}
                    initial={false}
                    animate={{ opacity: index === activeIndex ? 1 : 0 }}
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '10px',
                      bottom: '10px',
                      width: '5px',
                      background: '#4cc9b0',
                      borderRadius: '0 5px 5px 0'
                    }}
                  />
                  <div className={styles.miniHeader}>{item.title.substring(0, 20)}</div>
                  <div className={styles.miniLines}>
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Elements */}
          <div className={styles.bottomSpheres}>
            <div className={styles.whiteSphereMedium}></div>
            <div className={styles.whiteSphereSmall}></div>
            <div className={styles.tinyCone}></div>
          </div>
        </section>

        <div className={`${styles.grid} gsap-stagger-group`}>
          {INTERNSHIPS.map((item, index) => (
            <FloatingElement 
              key={item.id} 
              yRange={[15, -15]} 
              duration={4 + index % 3} 
              delay={index * 0.1}
            >
              <div className={`${styles.card} gsap-card`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description.substring(0, 150)}...</p>
                </div>
                <div className={styles.cardFooter}>
                  <button className={styles.applyButton} onClick={handleApplyClick} suppressHydrationWarning>
                    Apply Now
                  </button>
                </div>
              </div>
            </FloatingElement>
          ))}
        </div>

      {/* Contact Section */}
      <section className={`${styles.contactSection} gsap-fade-up`} ref={contactFormRef}>
        <div className={styles.contactGrid}>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <input type="text" placeholder="Enter First Name" className={styles.input} suppressHydrationWarning required />
                <input type="text" placeholder="Enter Last Name" className={styles.input} suppressHydrationWarning required />
              </div>
              <div className={styles.row}>
                <input type="email" placeholder="Enter your Email" className={styles.input} suppressHydrationWarning required />
                <input type="tel" placeholder="Enter Phone Number" className={styles.input} suppressHydrationWarning required />
              </div>
              <select className={styles.select} suppressHydrationWarning required>
                <option value="">Please Select Your Course</option>
                {INTERNSHIPS.map(course => (
                  <option key={course.id} value={course.title}>{course.title}</option>
                ))}
              </select>
              <textarea placeholder="Enter your Message here..." className={styles.textarea} suppressHydrationWarning required></textarea>
              <button type="submit" className={styles.submitBtn} suppressHydrationWarning>Send Your Message</button>
            </form>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.infoCard}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <span className={styles.infoText}>hr@softnovatech.com</span>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span className={styles.infoText}>+91-638-5118-083</span>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <span className={styles.infoText}>1st Floor, Softnova Apartment, SNV Mahal back side, Near SBI bank, Peravurani, Thanjavur, TamilNadu</span>
            </div>
            <div className={styles.socialProfiles}>
              <h4 className={styles.socialTitle}>Social Profiles</h4>
              <div className={styles.socialIcons}>
                <div className={styles.socialIcon}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <div className={styles.socialIcon}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                </div>
                <div className={styles.socialIcon}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.041-1.852-3.041-1.854 0-2.138 1.448-2.138 2.944v5.701h-3v-11h2.882v1.503h.041c.4-.759 1.381-1.558 2.836-1.558 3.033 0 3.593 1.996 3.593 4.591v6.464z"></path></svg>
                </div>
                <div className={styles.socialIcon}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      </div>
    </div>
  );
};

export default InternshipPage;
