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
  number: "", // 👈 change here
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
    
    if (formData.name && formData.email) {
      emailjs.sendForm(
        "service_7pm66nn",
        "template_e4yvn0c",
        formRef.current,
        "TFYCoxnoh3Oi4SMYl"
      ).then(
        () => {
          setIsSubmitted(true);
          setFormData({ name: "", email: "", number: "", course: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 5000);
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("EmailJS Error: " + (error.text || error.message || "Unknown error"));
        }
      );
    }
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

        {/* 2. CONTACT CARDS */}
        <section className={styles.cardsSection}>
          {[
            { 
              icon: <MapPin />, 
              title: "Our Location", 
              desc: "Softnova Apartment, Peravurani, TN",
              delay: 0.1 
            },
            { 
              icon: <Mail />, 
              title: "Email Us", 
              desc: "info@softnovatech.com",
              delay: 0.2 
            },
            { 
              icon: <Phone />, 
              title: "Call Us", 
              desc: "+91 6385118083",
              delay: 0.3 
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay }}
            >
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* 3. SPLIT SECTION (Form + Preview) */}
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
              <div className={styles.formGroup}>
                <input 
                  type="text" 
                  name="name"
                  className={styles.input} 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input 
                  type="email" 
                  name="email"
                  className={styles.input} 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input 
                  type="tel" 
                  name="number"
                  className={styles.input} 
                  placeholder="Phone Number" 
                  value={formData.number}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <select 
                  name="course"
                  className={styles.input} 
                  value={formData.course}
                  onChange={handleInputChange}
                  style={{ color: formData.course ? "var(--text-main)" : "var(--text-muted)" }}
                >
                  <option value="" disabled>Course Interested In</option>
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
                  rows="4" 
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.submitBtn}
                type="submit"
              >
                {isSubmitted ? "Message Sent!" : "Send Message"}
                <Send size={18} style={{ marginLeft: "10px", verticalAlign: "middle" }} />
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Live Preview */}
          <motion.div 
            className={styles.previewCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.previewHeader}>
              <div className={styles.previewDot} />
              <h3 style={{ margin: 0 }}>Live Preview</h3>
            </div>

            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Name</div>
              <div className={styles.previewValue}>{formData.name || "Your Name..."}</div>
            </div>

            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Email</div>
              <div className={styles.previewValue}>{formData.email || "hello@example.com"}</div>
            </div>

            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Course</div>
              <div className={styles.previewValue}>{formData.course || "Selecting a path..."}</div>
            </div>

            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Message</div>
              <div className={styles.previewValue} style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {formData.message || "Start typing your thoughts..."}
              </div>
            </div>

            <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "16px", boxShadow: "inset 4px 4px 8px var(--dark-shadow), inset -4px -4px 8px var(--light-shadow)" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <CheckCircle2 size={24} color="var(--primary)" />
                <p style={{ margin: 0, fontSize: "0.9rem" }}>We usually respond within 24 hours.</p>
              </div>
            </div>
          </motion.div>
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

        {/* 5. SOCIAL CONNECT */}
        <section className={styles.socialSection}>
          <h2>Connect With Us</h2>
          <div className={styles.footicons}>
            <a
              href="https://www.facebook.com/people/Softnovatech/61561099109544/?mibextid=qi2Omg&rdid=6hL55dQqxi67yKIS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <Facebook className={styles.svgsicons} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Whatsapp page"
            >
              <MessageSquare className={styles.svgsicons} />
            </a>
            <a
              href="https://www.linkedin.com/company/softnovatechnology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className={styles.svgsicons} />
            </a>
            <a
              href="https://www.instagram.com/softnovatech/?igsh=bjZhdzduOWVqMDlz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
            >
              <Instagram className={styles.svgsicons} />
            </a>
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section className={styles.cta}>
          <motion.div 
            className={styles.ctaBox}
            whileHover={{ scale: 1.01 }}
          >
            <h2>Ready to Take the Leap?</h2>
            <p style={{ marginBottom: "3rem", fontSize: "1.2rem", opacity: 0.9 }}>
              Book a free demo class and experience our teaching style firsthand.
            </p>
            <Link href="/book">
              <motion.button 
                className={styles.ctaBtn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Book Free Demo <ArrowRight size={20} style={{ marginLeft: "10px", verticalAlign: "middle" }} />
              </motion.button>
            </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
};

export default ContactUsPage;
