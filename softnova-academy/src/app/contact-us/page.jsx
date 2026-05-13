"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  MessageSquare,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import styles from "./contact.module.css";
// Reusing our custom icons for brand consistency and to avoid lucide version issues
import { Github, Twitter, Linkedin, Instagram, Facebook } from "../../components/Icons";
import emailjs from "@emailjs/browser";
const ContactUsPage = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    // Correct Credentials from your Dashboard
    const serviceID = "service_mhfzkpa";
    const templateID_Admin = "template_e4yvn0c";
    const templateID_User = "template_hygmmag"; // Ensure this exists in your EmailJS
    const publicKey = "TFYCoxnoh3Oi4SMYl";

    // 1st email (Admin)
    const sendAdminEmail = emailjs.sendForm(
      "service_mhfzkpa",
      "template_b8dvx8f",
      formRef.current,
      "vpbzv8oBccUdyeqJJ"
    );

    // 2nd email (User confirmation)
    const sendUserEmail = emailjs.sendForm(
      "service_u6nzzm4",
      "template_hygmmag",
      formRef.current,
      "QUgXsda6133_fLb1P"
    );

    Promise.all([sendAdminEmail, sendUserEmail])
      .then(() => {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", course: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send email: " + (error.text || error.message));
      });
  };

  return (
    <main className={styles.contactPage}>
      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      <div className={styles.container}>
        {/* 1. HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let’s Build Your <br />
              <span style={{ color: "var(--primary)" }}>Future Together</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Have a question or ready to start your tech journey?
              Our team is here to help you navigate your way to success.
            </motion.p>
          </div>
        </section>

        {/* 2. SPLIT SECTION (Form + Contact Info) */}
        <section className={styles.splitSection}>
          {/* Left: Form */}
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Send us a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    placeholder="Enter First Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    suppressHydrationWarning
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="lastName"
                    className={styles.input}
                    placeholder="Enter Last Name"
                    onChange={handleInputChange}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    suppressHydrationWarning
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    name="phone"
                    className={styles.input}
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <select
                  name="course"
                  className={styles.input}
                  value={formData.course}
                  onChange={handleInputChange}
                  style={{ color: formData.course ? "var(--text-main)" : "var(--text-muted)" }}
                  suppressHydrationWarning
                >
                  <option value="" disabled>Please Select Your Course</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Backend Engineering">Backend Engineering</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  className={styles.textarea}
                  rows="6"
                  placeholder="Enter your Message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  suppressHydrationWarning
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.submitBtnOrange}
                type="submit"
                suppressHydrationWarning
              >
                {isSubmitted ? "Message Sent!" : "Send Your Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info Cards Stack */}
          <div className={styles.infoStack}>
            {[
              {
                icon: <Mail />,
                title: "Email Us",
                desc: "info@softnovatechnology.com",
                delay: 0.1
              },
              {
                icon: <Phone />,
                title: "Call Us",
                desc: "+91 6385118083",
                delay: 0.2
              },
              {
                icon: <MapPin />,
                title: "Our Location",
                desc: "1st Floor, Softnova Apartment, Peravurani, TN",
                delay: 0.3
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                className={styles.infoCard}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
              >
                <div className={styles.cardIcon}>{card.icon}</div>
                <p className={styles.infoDesc}>{card.desc}</p>
              </motion.div>
            ))}

            {/* Social Profiles Card */}
            <motion.div
              className={styles.infoCard}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className={styles.socialHeading}>Social Profiles</h4>
              <div className={styles.socialGridSmall}>
                <a href="https://facebook.com/..." target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                <a href="https://wa.me/..." target="_blank" rel="noopener noreferrer"><MessageSquare size={20} /></a>
                <a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. GOOGLE MAP */}
        <section className={styles.mapSection}>
          <motion.div
            className={styles.mapContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7851.263486223861!2d79.20632872303162!3d10.291226416297494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a16e9c50ca4939d%3A0x646da28beabf28ab!2sSoftnova%20Technology!5e0!3m2!1sen!2sin!4v1776753992378!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className={styles.mapOverlay}>
              <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Visit Our Campus</h4>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>
                1st Floor, Softnova Apartment, Peravurani, Thanjavur, TamilNadu - 614804
              </p>
            </div>
          </motion.div>
        </section>


        {/* 6. CTA SECTION */}
        <section className={styles.cta}>
          <motion.div
            className={styles.ctaBox}
            whileHover={{ scale: 0.99 }}
          >
            <h2>Ready to Take the Leap?</h2>
            <p style={{ marginBottom: "3rem", fontSize: "1.2rem", opacity: 0.9 }}>
              Book a free demo class and experience our teaching style firsthand.
            </p>
            <Link href="/book">
              <motion.div
                className={styles.ctaBtn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Book Free Demo <ArrowRight size={20} style={{ marginLeft: "10px", verticalAlign: "middle" }} />
              </motion.div>
            </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
};

export default ContactUsPage;
