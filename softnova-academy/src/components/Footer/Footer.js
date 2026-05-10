"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import emailjs from "@emailjs/browser";
import { CheckCircle2, Send } from "lucide-react";
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const formRef = useRef();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSending(true);

    // EmailJS Configuration (Consistent with Enroll/Contact pages)
    const serviceID_Admin = "service_mhfzkpa";
    const templateID_Admin = "template_b8dvx8f";
    const publicKey_Admin = "vpbzv8oBccUdyeqJJ";

    const serviceID_User = "service_u6nzzm4";
    const templateID_User = "template_hygmmag";
    const publicKey_User = "QUgXsda6133_fLb1P";

    // Prepare template parameters for a "Quick Join" from Footer
    const templateParams = {
      name: "Footer Subscriber",
      email: email,
      phone: "Not provided (Footer Join)",
      education: "N/A",
      course: "Quick Interest from Footer",
      address: "N/A",
      message: `Someone clicked 'Join' from the website footer with email: ${email}`
    };

    // Send Admin Email
    const sendAdminEmail = emailjs.send(serviceID_Admin, templateID_Admin, templateParams, publicKey_Admin);
    
    // Send User Welcome Email
    const sendUserEmail = emailjs.send(serviceID_User, templateID_User, templateParams, publicKey_User);

    Promise.all([sendAdminEmail, sendUserEmail])
      .then(() => {
        setIsSubmitted(true);
        setIsSending(false);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to join. Please try again.");
        setIsSending(false);
      });
  };

  return (
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
                <span>info@softnovatech.com</span>
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
            <p className={styles.newsletterText}>Enter your email to receive our welcome package and latest updates.</p>
            
            <div className={styles.newsletterContainer}>
              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={24} color="#ff7c30" />
                  <span>Welcome to Softnova!</span>
                </div>
              ) : (
                <form className={styles.newsletterForm} onSubmit={handleJoin}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className={styles.input} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <button type="submit" className={styles.subscribeBtn} disabled={isSending}>
                    {isSending ? "..." : "Join"}
                  </button>
                </form>
              )}
            </div>

            <div className={styles.socials}>
              <h4 className={styles.socialHeading}>Social Profiles</h4>
              <div className={styles.socialIcons}>
                <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="WhatsApp" className={styles.socialIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.041-1.852-3.041-1.854 0-2.138 1.448-2.138 2.944v5.701h-3v-11h2.882v1.503h.041c.4-.759 1.381-1.558 2.836-1.558 3.033 0 3.593 1.996 3.593 4.591v6.464z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
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
  );
};

export default Footer;
