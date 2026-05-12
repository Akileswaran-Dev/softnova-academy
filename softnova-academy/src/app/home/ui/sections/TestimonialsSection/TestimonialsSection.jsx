import React from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'UI/UX Design Student',
    text: 'The UI/UX course was transformative. The hands-on projects helped me build a portfolio that landed me my dream internship!',
    initial: 'S',
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    role: 'Full Stack Developer',
    text: 'Softnova Academy provided the perfect environment to learn React and Node.js. The mentors are truly industry experts.',
    initial: 'R',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Graphic Design',
    text: 'I loved the interactive learning style. Combining theory with practical assignments made complex concepts easy to grasp.',
    initial: 'E',
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Mobile App Developer',
    text: 'The placement support is exceptional. I felt prepared for every interview thanks to the mock sessions and guidance.',
    initial: 'M',
  },
  {
    id: 5,
    name: 'Aisha Khan',
    role: 'Data Science Student',
    text: 'Comprehensive curriculum and great community. I particularly enjoyed the peer-to-peer learning sessions.',
    initial: 'A',
  },
  {
    id: 6,
    name: 'David Wilson',
    role: 'Web Development',
    text: 'Softnova is more than just an academy; it is a platform for growth. Highly recommended for anyone starting their tech journey.',
    initial: 'D',
  },
];

import FloatingElement from "@/components/FloatingElement";

const TestimonialsSection = () => {
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.topTitle}>Our Testimonials</span>
            <h2 className={styles.heading} id="testimonials-title">What Our<br/>Students Say</h2>
          </div>
          <div className={styles.headerRight}>
            <h3 className={styles.subHeading}>Student Stories</h3>
            <p className={styles.intro}>
              Join thousands of successful students who have transformed their careers with Softnova Academy. 
              Hear what they have to say about their journey and our immersive learning experience.
            </p>
          </div>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
              <div key={`${t.id}-${index}`} className={styles.cardWrapper}>
                <FloatingElement yRange={[8, -8]} duration={5 + (index % 2)} delay={index * 0.2}>
                  <div className={styles.card}>
                    <div className={styles.avatarCrater}>
                      <div className={styles.avatarRaised}>
                        <span className={styles.avatarText}>{t.initial}</span>
                      </div>
                    </div>
                    <h4 className={styles.name}>{t.name}</h4>
                    <span className={styles.role}>{t.role}</span>
                    
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={styles.star} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    <p className={styles.text}>"{t.text}"</p>
                  </div>
                </FloatingElement>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
