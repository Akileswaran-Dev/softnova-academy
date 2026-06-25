import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  FileText,
  Mail,
  CheckCircle2
} from "lucide-react";
import styles from "./privacy.module.css";

export const metadata = {
  title: "Privacy Policy | Softnova Academy",
  description: "Read the Privacy Policy of Softnova Academy to understand how we collect, use, and protect your personal information.",
};

const PrivacyPolicy = () => {
  return (
    <main className={styles.privacyPage}>
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
          <h1>Privacy Policy</h1>
          <p>Last updated: NOV 03, 2025</p>
          <p>
            Your privacy is highly important to us. This Privacy Policy details the types of personal information 
            Softnova Academy collects, how we use it, and the security measures we take to protect it.
          </p>
        </section>

        {/* Content Card */}
        <section className={styles.contentCard}>
          {/* Section 1 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Eye size={22} />
              1. Information We Collect
            </h2>
            <p className={styles.sectionText}>
              We collect information that you directly provide to us when you enroll in our courses, sign up for internships, 
              or interact with us through our website forms and email. This includes:
            </p>
            <div className={styles.subCard}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Personal Identifiers:</strong> Full name, email address, phone number, and mailing address.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Educational Background:</strong> Information about your current qualification or college to tailor course recommendations.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Preferences:</strong> Courses of interest, internship paths selected, and learning goals.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Database size={22} />
              2. How We Use Your Information
            </h2>
            <p className={styles.sectionText}>
              The data we collect is utilized strictly to provide a high-quality educational and professional training experience. 
              Specifically, we use it to:
            </p>
            <div className={styles.subCard}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span>Process enrollments, registrations, and facilitate internship placements.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span>Send newsletters, course updates, and exclusive placement alerts (only if you subscribe).</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span>Provide customer support, respond to inquiries, and address issues.</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span>Improve our training curriculum based on aggregated and anonymous feedback.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Lock size={22} />
              3. Data Security and Retention
            </h2>
            <p className={styles.sectionText}>
              We implement industry-standard administrative, technical, and physical security measures to safeguard your 
              personal data against unauthorized access, loss, alteration, or disclosure.
            </p>
            <p className={styles.sectionText} style={{ marginTop: "10px" }}>
              We retain personal data only for as long as necessary to fulfill the educational services and administrative requirements 
              outlined in this policy.
            </p>
          </div>

          {/* Section 4 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Shield size={22} />
              4. Third-Party Sharing Policy
            </h2>
            <p className={styles.sectionText}>
              Softnova Academy does NOT sell, rent, or lease your personal information to third parties. We may share information 
              with trusted partners or placement companies only with your explicit consent during internship or career placement opportunities.
            </p>
          </div>

          {/* Section 5 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Mail size={22} />
              5. Contact Us
            </h2>
            <p className={styles.sectionText}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, 
              please reach out to us at:
            </p>
            <div className={styles.subCard}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Email:</strong> info@softnovatechnology.com</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Phone:</strong> +91 6385118083</span>
                </li>
                <li className={styles.bulletItem}>
                  <CheckCircle2 size={16} />
                  <span><strong>Address:</strong> 1st Floor, Softnova Apartment, Peravurani, Thanjavur, TamilNadu - 614804.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
