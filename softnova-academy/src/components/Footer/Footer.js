"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  X,
  Sparkles,
  GraduationCap,
  Briefcase,
  Rocket,
  FacebookIcon,
  MessageSquare,
  LinkedinIcon,
  InstagramIcon
} from "lucide-react";
import { Facebook, Instagram, Linkedin } from "../Icons";
import styles from './Footer.module.css';

const WelcomeModal = ({ isOpen, onClose, onExplore }) => (
  <AnimatePresence>
    {isOpen && (
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div
          className={styles.welcomeModal}
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>

          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.iconCircle}>
                <Sparkles size={32} color="#ff7c30" />
              </div>
              <h2>Welcome to Softnova Family!</h2>
              <p>Your tech journey officially begins today.</p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4>Professional Internships</h4>
                  <p>Get hands-on experience with our exclusive internship programs in real-world tech projects.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4>Affordable Premium Courses</h4>
                  <p>Learn Full-Stack, UI/UX, and Data Science at the most competitive prices in the industry.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <Rocket size={20} />
                </div>
                <div>
                  <h4>Career Transformation</h4>
                  <p>We don't just teach code; we build careers with 100% placement support and mentorship.</p>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <p>A detailed welcome package has been sent to your email. Check it out!</p>
              <button className={styles.continueBtn} onClick={onExplore}>
                Let's Explore
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);

    const serviceID_Admin = "service_mhfzkpa";
    const templateID_Admin = "template_b8dvx8f";
    const publicKey_Admin = "vpbzv8oBccUdyeqJJ";

    const serviceID_User = "service_u6nzzm4";
    const templateID_User = "template_hygmmag";
    const publicKey_User = "QUgXsda6133_fLb1P";

    const templateParams = {
      name: "Footer Subscriber",
      email: email,
      phone: "Not provided (Footer Join)",
      education: "N/A",
      course: "Quick Interest from Footer",
      address: "N/A",
      message: `New subscriber from Footer: ${email}`
    };

    const sendAdminEmail = emailjs.send(serviceID_Admin, templateID_Admin, templateParams, publicKey_Admin);
    const sendUserEmail = emailjs.send(serviceID_User, templateID_User, templateParams, publicKey_User);

    Promise.all([sendAdminEmail, sendUserEmail])
      .then(() => {
        setIsSending(false);
        setEmail("");
        setShowWelcome(true);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to join. Please try again.");
        setIsSending(false);
      });
  };

  const handleExplore = () => {
    setShowWelcome(false);
    router.push('/course');
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoDot}></div>
                SOFTNOVA<span>ACADEMY</span>
              </Link>
              <p className={styles.tagline}>
                Empowering the next generation of tech leaders with industry-driven training and mentorship.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>info@softnovatechnology.com</span>
                </div>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>+91 6385118083</span>
                </div>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>1st Floor, Softnova Apartment, SNV Mahal back side, Near SBI bank, Peravurani, Thanjavur, TamilNadu.</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linksCol}>
              <h4 className={styles.heading}>Home</h4>
              <ul className={styles.linkList}>
                <li><Link href="/#benefits">Benefits</Link></li>
                <li><Link href="/course">Our Courses</Link></li>
                <li><Link href="/#faq">Our FAQ</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className={styles.linksCol}>
              <h4 className={styles.heading}>About Us</h4>
              <ul className={styles.linkList}>
                <li><Link href="/#achievements">Achievement</Link></li>
                <li><Link href="/#about">Our Goals</Link></li>
                <li><Link href="/intership">Internship</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className={styles.newsletterCol}>
              <h4 className={styles.heading}>Stay Updated</h4>
              <p className={styles.newsletterText}>Get exclusive updates on internships and affordable tech courses.</p>

              <div className={styles.newsletterContainer}>
                <form className={styles.newsletterForm} onSubmit={handleJoin}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    suppressHydrationWarning
                  />
                  <button type="submit" className={styles.subscribeBtn} disabled={isSending} suppressHydrationWarning>
                    {isSending ? "..." : "Join"}
                  </button>
                </form>
              </div>

              <div className={styles.socials}>
                <h4 className={styles.socialHeading}>Social Profiles</h4>
                <div className={styles.socialIcons}>
                  <a href="https://www.facebook.com/people/Softnovatech/61561099109544/?mibexti…3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                  <a href="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>
                  <a href="https://in.linkedin.com/company/softnovatech" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                  <a href="https://www.instagram.com/softnova_academy?igsh=MW9nNDhieXE1ZndpNA==" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <p>© {currentYear} SOFTNOVA ACADEMY. All Rights Reserved.</p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onExplore={handleExplore}
      />
    </>
  );
};

export default Footer;
