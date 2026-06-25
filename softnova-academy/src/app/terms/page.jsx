import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  BookOpen,
  Award,
  ShieldCheck,
  AlertCircle,
  Calendar,
  CheckCircle2
} from "lucide-react";
import styles from "./terms.module.css";

export const metadata = {
  title: "Terms and Conditions | Softnova Academy",
  description: "Review the Terms and Conditions of Softnova Academy regarding courses, internship enrollment, and educational services.",
};

const TermsAndConditions = () => {
  return (
    <main className={styles.termsPage}>
      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.container}>
        {/* Back to Home Button */}
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        {/* Header Card */}
        <section className={styles.headerCard}>
          <h1>Terms & Conditions</h1>
          <p>Last updated: NOV 03, 2025</p>
          <p>
            Please read these Terms and Conditions carefully before using our website or enrolling in courses and internships 
            offered by Softnova Academy.
          </p>
        </section>

        {/* Content Card */}
        <section className={styles.contentCard}>
          {/* Section 1 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <BookOpen size={22} />
              1. Acceptance of Terms
            </h2>
            <p className={styles.sectionText}>
              By accessing our website, subscribing to updates, or registering for courses or professional internships, you agree 
              to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our services.
            </p>
          </div>

          {/* Section 2 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Award size={22} />
              2. Enrollment and Internship Eligibility
            </h2>
            <p className={styles.sectionText}>
              Softnova Academy provides professional training and internship opportunities.
            </p>
            <div className={styles.subCard}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Eligibility:</strong> You must provide accurate and complete registration information.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Internship Criteria:</strong> Internship selection and completion certificates are subject to performance, active participation, and completion of assigned real-world projects.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Code of Conduct:</strong> Students and interns must maintain professionalism, ethical conduct, and respect toward mentors and peers.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Scale size={22} />
              3. Course Fees and Refund Policy
            </h2>
            <p className={styles.sectionText}>
              Our course fees are competitive and industry-aligned to make premium education accessible.
            </p>
            <div className={styles.subCard}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span>All fees must be paid according to the selected plan prior to starting the training.</span>
                </li>
                <li className={styles.bulletItem} style={{ color: "var(--foreground)" }}>
                  <CheckCircle2 size={16} />
                  <span>Fees once paid are non-refundable, except as explicitly stated in writing during promotional enrollments.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ShieldCheck size={22} />
              4. Intellectual Property
            </h2>
            <p className={styles.sectionText}>
              All course curriculum, code challenges, mentorship materials, videos, and documentation provided by Softnova Academy 
              are the exclusive intellectual property of Softnova Academy. Content cannot be reproduced, shared publicly, or sold 
              without our prior written permission.
            </p>
          </div>

          {/* Section 5 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <AlertCircle size={22} />
              5. Limitation of Liability
            </h2>
            <p className={styles.sectionText}>
              Softnova Academy offers 100% placement assistance and career mentorship. However, we do not guarantee job placements. 
              Employment offers are solely at the discretion of the recruiting organizations. We are not liable for any direct or 
              indirect career or academic outcome differences resulting from the use of our training materials.
            </p>
          </div>

          {/* Section 6 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Calendar size={22} />
              6. Governing Law
            </h2>
            <p className={styles.sectionText}>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of 
              or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in 
              Thanjavur, TamilNadu, India.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TermsAndConditions;
