"use client";
import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const FAQS = [
  {
    id: 1,
    question: 'What is the institute working time?',
    answer: 'We operate Monday to Friday from 10.00 am to 5.00 pm. Weekends are holidays unless otherwise notified.',
  },
  {
    id: 2,
    question: 'If this institute run offline or online?',
    answer: 'Currently we provide offline training session only with direct interaction and hands on practice',
  },
  {
    id: 3,
    question: 'Do you offer certification for the courses?',
    answer: 'Yes, we provide internship and course completion certificates only after the successful completion.',
  },
  {
    id: 4,
    question: 'Are installment options available?',
    answer: 'Yes, we offer flexible installment plans for selected courses.',
  },
  {
    id: 5,
    question: 'Who are the trainers?',
    answer: 'Our trainers are experienced professional from IT industry, offering both theoritical and practical training with Real-time projects.',
  },
  {
    id: 6,
    question: 'Will I get project experience during the course?',
    answer: 'Absolutely we focus on real-time, live projects training for every courses.',
  },
  {
    id: 7,
    question: 'Are the courses self-paced or do they have specific start and end dates?',
    answer: 'Most of our courses are self-paced, allowing you to learn at your convenience. However, certain progress or internship-linked courses may have scheduled start and end dates with live sessions.',
    points: [
      'Web Design – 2 months  Self-paced – You can learn at your own convenience within the 2-month period.',
      'UI/UX – 2 months  Self-paced – Flexible learning with no fixed schedule, complete within 2 months.',
      'Front-end Development – 3 months  Self-paced – Start anytime and complete the course within 3 months at your own pace.',
      'Java Full Stack Development – 4 months  Self-paced – Complete the course within 4 months based on your own schedule.',
      'Full Stack Development – 4 months  Self-paced – Offers flexibility with a 4-month learning window.',
      'Desktop Support Engineer – 1 month  Self-paced – Learn at your own convenience and complete within 1 month.',
      'CISCO Certified Network Associate (CCNA) – 3 months  Self-paced – Flexible schedule. You can start anytime and finish within 3 months.',
      'HR Training – 3 months  Self-paced – No fixed schedule. Learn at your pace and complete within 3 months.',
      'Business Development Executive – 3 months  Self-paced – Designed for independent learning over a 3-month period.',
    ],
  },
  {
    id: 8,
    question: 'How can I enroll for different courses?',
    answer: 'Enrollment is simple-choose your course , complete the registration form, and make the payment once enrolled.You will receive instant access to course material and your student dashboard',
  },
  {
    id: 9,
    question: 'What kind of support can I expect from instructors?',
    answer: 'Our instructors are committed to your Q&A forms,email support and personalized feedback on your assignments and projects.',
  },
  {
    id: 10,
    question: 'Are there any prequisites for the courses?',
    answer: 'No prior experience is required for beginner courses. However intermediate or advanced courses may require basic knowledge of relevent tools or language',
  },
  {
    id: 11,
    question: 'Is placement assistance provided?',
    answer: 'Yes, we assist with job refferals and interview guidance after successful completion of course.',
  },
  {
    id: 12,
    question: 'Do you offer internships?',
    answer: 'Yes, we offer internship for selected course. Students receives certificate after completing the internship period.',
  },
  {
    id: 14,
    question: 'Do you provide study materials?',
    answer: 'Yes, all required study materials will be provided during the course.',
  },
  {
    id: 15,
    question: 'Can I switch batches after enrollment?',
    answer: 'Yes, batch switching is allowed on valid reasons and availability.',
  },
  {
    id: 16,
    question: 'How can I contact the institute directly?',
    answer: 'You can call us at (91-638-5118-083) or email us at (hr@softnovatechnology.com)our office is open for direct visits as well.',
  },
  {
    id: 17,
    question: 'What is the class schedule?',
    answer: 'We offer week days batches (monday-friday) morning/afternoon session.',
  },
  {
    id: 18,
    question: 'Can I add the internship to my resume?',
    answer: 'Yes, and we guide you on how to present in effectively in interviews.',
  },
  {
    id: 19,
    question: 'Do you offer placement support?',
    answer: 'Yes, we offer:',
    points: [
      'Resume building',
      'Placement drives',
      'Interview preparation',
      'Job referrals',
    ],
  },
  {
    id: 20,
    question: 'How do I escalate, if I have any issues?',
    answer: 'You can speak to our student counsellor or the training co-ordinator directly.Feedback forms are also available in this website.',
  },
  {
    id: 21,
    question: 'Can I shift to another course after joining one?',
    answer: 'Yes, but only within the first and with management approvals.',
  },
  {
    id: 22,
    question: 'Can I pause my training and rejoin later?',
    answer: 'Yes, in genuine cases (health,Relocation,etc,...) we allow you to hold and rejoin.',
  },
];

import FloatingElement from "@/components/FloatingElement";

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleOpen = (id) => {
    // Only one accordion open at a time
    setOpenId(openId === id ? null : id);
  };

  const visibleFaqs = showAll ? FAQS : FAQS.slice(0, 6);

  const renderFaq = ({ faq, originalIndex }) => {
    const isOpen = openId === faq.id;
    const numberString = String(originalIndex + 1).padStart(2, '0');

    return (
      <FloatingElement key={faq.id} yRange={[6, -6]} duration={4.5 + (originalIndex % 2)} delay={originalIndex * 0.15}>
        <div className={styles.accordionItemWrapper}>
          <div className={styles.purpleBlock}>
            {numberString}
          </div>
          <div
            className={`${styles.glassCard} ${isOpen ? styles.open : ''}`}
            onClick={() => toggleOpen(faq.id)}
          >
            <div className={styles.accordionHeader}>
              <h3 className={styles.question}>{faq.question}</h3>
              <div className={styles.iconWrapper}>
                {isOpen ? '−' : '+'}
              </div>
            </div>
            <div className={styles.answerWrapper}>
              <div className={styles.answerContent}>
                <p>{faq.answer}</p>
                {faq.points && faq.points.length > 0 && (
                  <ul className={styles.pointsList}>
                    {faq.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </FloatingElement>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        {/* Header Content */}
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>
            <span className={styles.dot}></span> FAQs
          </div>
          <h2 className={styles.heading} id="faq-title">
            Frequently asked questions
            <span className={styles.highlight}></span>
          </h2>
          <p className={styles.subtitle}>
            Here are some common questions about our<br />services to help you understand better.
          </p>
        </div>

        {/* Grid Accordion */}
        <div className={styles.grid}>
          {visibleFaqs.map((faq, index) => renderFaq({ faq, originalIndex: index }))}
        </div>

        {/* Action Button */}
        {FAQS.length > 6 && (
          <div className={styles.buttonContainer}>
            <button className={styles.moreButton} onClick={() => setShowAll(!showAll)} suppressHydrationWarning>
              {showAll ? 'Show Less' : 'More FAQs'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;

