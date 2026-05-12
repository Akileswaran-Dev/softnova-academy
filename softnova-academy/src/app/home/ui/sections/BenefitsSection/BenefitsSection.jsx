import styles from "./BenefitsSection.module.css";
import FloatingElement from "@/components/FloatingElement";

const ICONS = {
  clock: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  user: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  layers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 12 12 17 22 12"></polyline>
      <polyline points="2 17 12 22 22 17"></polyline>
    </svg>
  ),
  refresh: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  briefcase: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  chat: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
};

const BENEFITS = [
  {
    number: "01",
    title: "Flexible Learning Schedule",
    description: "1 Our flexible learning schedule allows students to learn at their own pace with convenient class timings.It helps learners balance education, work, and personal commitments without affecting their training progress.",
    icon: ICONS.clock
  },
  {
    number: "02",
    title: "Expert Instructors",
    description: "Learn from experienced industry professionals who provide practical knowledge and real-world guidance.Our expert instructors help students improve skills, gain confidence, and stay updated with current technologies.",
    icon: ICONS.user
  },
  {
    number: "03",
    title: "Diverse Course Offerings",
    description: "We offer a wide range of courses covering design, development, programming, and emerging technologies.Students can choose the right program based on their interests, career goals, and skill levels.",
    icon: ICONS.layers
  },
  {
    number: "04",
    title: "Updated Curriculum",
    description: "Our curriculum is regularly updated to match the latest industry trends, tools, and technologies.It helps students gain relevant skills and stay prepared for current job market requirements.",
    icon: ICONS.refresh
  },
  {
    number: "05",
    title: "Practical Projects and Assignments",
    description: "Students work on real-time projects and assignments to gain hands-on experience and practical knowledge.This approach improves problem-solving skills and prepares learners for real-world industry challenges.",
    icon: ICONS.briefcase
  },
  {
    number: "06",
    title: "Interactive Learning Environment",
    description: "Our interactive learning environment helps students learn in a smooth, engaging, and practical way through live sessions and real-time activities.It improves creativity, communication, confidence, and problem-solving skills for better career growth.",
    icon: ICONS.chat
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section} aria-labelledby="benefits-title">
      <div className={styles.header}>
        <h2 className={styles.heading} id="benefits-title">
          Benefits
        </h2>
        <p className={styles.lead}>
          Our programs offer an up-to-date, industry-relevant curriculum with hands-on training
          through real-world projects. Learn from experienced professionals with the flexibility
          to study anytime, anywhere.
        </p>
      </div>

      <div className={styles.grid}>
        {BENEFITS.map((b, index) => (
          <article className={styles.card} key={b.number}>
            <div className={styles.iconCircle}>
               <div className={styles.iconInner}>
                   {b.icon}
               </div>
            </div>
            
            <div className={styles.stepWrapper}>
                <span className={styles.stepText}>STEP</span>
                <span className={styles.stepNumber}>{b.number}</span>
            </div>

            <h3 className={styles.cardTitle}>{b.title}</h3>
            <p className={styles.cardDesc}>{b.description}</p>
            
          </article>
        ))}
      </div>
    </section>
  );
}
