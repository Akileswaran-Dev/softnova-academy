"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  Send,
  CheckCircle2,
  X
} from "lucide-react";
import styles from "./EnrollModal.module.css";

const EnrollModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    education: "",
    course: "",
    address: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // EmailJS Configuration (Using credentials from Contact page)
    const serviceID_Admin = "service_mhfzkpa";
    const templateID_Admin = "template_b8dvx8f";
    const publicKey_Admin = "vpbzv8oBccUdyeqJJ";

    const serviceID_User = "service_u6nzzm4";
    const templateID_User = "template_hygmmag";
    const publicKey_User = "QUgXsda6133_fLb1P";

    // Send Admin Email
    const sendAdminEmail = emailjs.sendForm(serviceID_Admin, templateID_Admin, formRef.current, publicKey_Admin);
    
    // Send User Confirmation Email
    const sendUserEmail = emailjs.sendForm(serviceID_User, templateID_User, formRef.current, publicKey_User);

    Promise.all([sendAdminEmail, sendUserEmail])
      .then(() => {
        setIsSubmitted(true);
        setIsSending(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          education: "",
          course: "",
          address: "",
        });
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send application. Please try again.");
        setIsSending(false);
      });
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircle2 size={60} color="#ff7c30" />
                <h2>Enrollment Success!</h2>
                <p>We&apos;ve received your application. See you soon!</p>
              </motion.div>
            ) : (
              <>
                <div className={styles.header}>
                  <h2>Enroll Now</h2>
                  <p>Fill in the details to start your journey.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGrid}>
                    <div className={styles.inputGroup}>
                      <label><User size={16} /> Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label><Phone size={16} /> Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Number"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label><Mail size={16} /> Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label><GraduationCap size={16} /> Qualification</label>
                      <input 
                        type="text" 
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="e.g. B.E CS"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label><BookOpen size={16} /> Course</label>
                      <select 
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Choose Course</option>
                        <option value="Full Stack Development">Full Stack Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Software Testing">Software Testing</option>
                        <option value="Data Science">Data Science</option>
                      </select>
                    </div>

                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label><MapPin size={16} /> Address</label>
                      <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Your full address"
                        rows="2"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button 
                    type="submit"
                    className={styles.submitBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isSending ? "Sending..." : "Send Application"}</span>
                    <Send size={18} />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnrollModal;
