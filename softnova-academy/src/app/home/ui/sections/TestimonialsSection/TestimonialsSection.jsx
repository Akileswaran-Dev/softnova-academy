import React from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Shanmathi',
    role: 'Front-End Developer',
    text: 'I had a great learning experience at Softnova Academy. The trainers were supportive, and the practical sessions helped me improve my skills and confidence in real-time projects.',
    
  },
  {
    id: 2,
    name: 'Ega Ajith',
    role: 'Full Stack Developer',
    text: 'Softnova Academy provided the perfect environment to learn React and Node.js. The mentors are truly industry experts.',
  
  },
  {
    id: 3,
    name: 'Akileswaran',
    role: 'Full Stack Developer',
    text: 'I completed Full Stack Development training at Softnova Academy, where I gained hands-on experience in both front-end and back-end development. The real-time projects and practical learning approach helped me build confidence in developing complete web applications.',
    
  },
  {
    id: 4,
    name: 'Thangadeepak',
    role: 'Front-End Developer',
    text: "I recently completed the Frontend Development course here. The curriculum was very practical, especially the focus on modern frameworks and responsive design. It really helped me build a strong foundation for my role as a developer. Thanks to the mentors for the great support!",
   
  },
  {
    id: 5,
    name: 'Archana',
    role: 'Web Designing',
    text: 'I completed web designing training at Softnova Academy, where I learned to create modern and responsive website designs. The practical sessions and trainer support helped me improve my creativity and design skills effectively.',
    
  },
  {
    id: 6,
    name: 'Shamina Jasmine',
    role: 'Web Development',
    text: 'I completed web development training at Softnova Academy, and the course gave me a strong foundation in both design and development concepts. The practical approach and real-time projects made learning more effective and improved my confidence in building websites.',
    
  },
  {
    id: 7,
    name: 'Jenith',
    role: 'Front-End Developer',
    text: 'I completed front-end development training at Softnova Academy, where I gained strong knowledge in building responsive and interactive websites. The real-time practice sessions and guidance from trainers helped me improve both my coding skills and creativity.',
    
  },
  {
    id: 8,
    name: 'Ashif',
    role: 'Web Development',
    text: 'I learned web development at Softnova Academy, and the training was very practical and easy to understand. The hands-on projects and supportive teaching helped me improve my front-end development skills confidently.',
    
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
