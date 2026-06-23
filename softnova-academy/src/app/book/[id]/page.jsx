"use client";
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Star, BookOpen, Layers, Eye, ChevronRight, Quote, Heart, Globe, Calendar } from 'lucide-react';
import Link from 'next/link';
import { BOOKS } from '../data/books';
import styles from './BookDetails.module.css';

const BookPreview3D = dynamic(() => import('./BookPreview3D'), { ssr: false });

/* ── PARTICLES ── */
function Particles({ color, count = 14 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      size: 3 + Math.random() * 6,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      dur: 4 + Math.random() * 6,
    }));
  }, [count, mounted]);

  if (!mounted) return null;

  return (
    <div className={styles.particleLayer}>
      {particles.map(p => (
        <div key={p.key} className={styles.particle} style={{
          width: p.size, height: p.size,
          top: `${p.top}%`, left: `${p.left}%`,
          background: color, opacity: 0.15,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
        }} />
      ))}
    </div>
  );
}

/* ── 3D BOOK (reusable) ── */
function Book3D({ book, width = 300, height = 420, className, animate3D = true, floating = false }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-150, 150], [14, -14]), { stiffness: 200, damping: 30 });
  const rY = useSpring(useTransform(mx, [-150, 150], [-14, 14]), { stiffness: 200, damping: 30 });

  const [isMobileTouch, setIsMobileTouch] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobileTouch(isTouch);
  }, []);

  const handleMouseEnter = () => {
    if (isMobileTouch || !animate3D) return;
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const onMove = useCallback((e) => {
    if (isMobileTouch || !animate3D) return;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const r = rectRef.current;
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [animate3D, mx, my, isMobileTouch]);

  const onLeave = () => {
    rectRef.current = null;
    mx.set(0);
    my.set(0);
  };

  const shouldFloat = floating && !isMobileTouch;

  return (
    <div ref={ref} className={`${styles.bookWrap} ${className || ''}`}
      onMouseEnter={handleMouseEnter} onMouseMove={onMove} onMouseLeave={onLeave} style={{ height: height + 60 }}>
      <motion.div
        className={styles.book3D}
        style={{ width, height, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, rotateY: -35, y: 30 }}
        animate={shouldFloat
          ? { opacity: 1, rotateY: 0, y: [0, -16, 0] }
          : { opacity: 1, rotateY: 0, y: 0 }}
        transition={shouldFloat
          ? { opacity: { duration: 0.7 }, rotateY: { duration: 0.8 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }
          : { duration: 0.9, ease: 'easeOut' }}
      >
        <div className={styles.bookCover} style={{
          borderLeft: `14px solid ${book.imgColor}`,
          backgroundImage: `url(${book.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className={styles.coverGlow} style={{ background: book.imgColor }} />
          {!book.coverImage && (
            <>
              <div className={styles.coverTitle}>{book.title}</div>
              <div className={styles.coverSub}>{book.subtitle}</div>
            </>
          )}
          <div className={styles.coverBrand}>SOFTNOVA ACADEMY</div>
        </div>
        <div className={styles.bookSpine} style={{ background: book.imgColor }} />
        <div className={styles.bookPages} />
      </motion.div>
      <motion.div className={styles.bookShadow}
        animate={shouldFloat ? { opacity: [0.25, 0.45, 0.25], scaleX: [1, 1.08, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {shouldFloat && (
        <motion.div className={styles.glowRing} style={{ borderColor: book.imgColor }}
          animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      )}
    </div>
  );
}

/* ── TYPEWRITER ── */
function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [started, text]);

  return <span ref={ref}>{displayed}<span className={styles.cursor}>|</span></span>;
}

/* ══════════════════════════════════════════════ */
export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPreviewOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isPreviewOpen]);

  const book = useMemo(() => BOOKS.find(b => b.id === bookId), [bookId]);
  const recommendations = useMemo(() => BOOKS.filter(b => b.id !== bookId).slice(0, 4), [bookId]);

  const bookPages = useMemo(() => {
    if (!book) return [];

    // CUSTOM CONTENT FOR WEB DESIGN BOOK (ID: 1)
    if (book.id === 1) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_wd">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocSub}><span>Introduction To Web Design</span> <small>pg 5</small></li>

            <li className={styles.tocChapter}><strong>Chapter 1 (HTML)</strong></li>
            <li className={styles.tocSub}><span>1.1 Introduction</span> <small>pg 9</small></li>
            <li className={styles.tocSub}><span>1.2 Structure of HTML</span> <small>pg 10</small></li>
            <li className={styles.tocSub}><span>1.3 Semantic Tags</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>1.4 Text Formatting Tags</span> <small>pg 13</small></li>
            <li className={styles.tocSub}><span>1.5 Working with Hyperlinks</span> <small>pg 14</small></li>
            <li className={styles.tocSub}><span>1.6 HTML Lists</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.7 HTML Form Elements</span> <small>pg 17</small></li>
            <li className={styles.tocSub}><span>1.8 HTML Tables</span> <small>pg 19</small></li>
            <li className={styles.tocSub}><span>1.9 Images and Multimedia</span> <small>pg 21</small></li>
            <li className={styles.tocSub}><span>1.10 HTML Attributes</span> <small>pg 24</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_wd">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1 (HTML Cont.)</strong></li>
            <li className={styles.tocSub}><span>1.11 Block vs Inline Elements</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>1.12 HTML Entities and Special Characters</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>1.13 Meta Tags</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>1.14 Web Accessibility</span> <small>pg 31</small></li>
            <li className={styles.tocSub}><span>1.15 Iframes and Embedding External Content</span> <small>pg 33</small></li>

            <li className={styles.tocChapter}><strong>Chapter 2 (CSS)</strong></li>
            <li className={styles.tocSub}><span>2.1 CSS Introduction</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>2.2 CSS Selectors</span> <small>pg 37</small></li>
            <li className={styles.tocSub}><span>2.3 Colors& Backgrounds</span> <small>pg 40</small></li>
            <li className={styles.tocSub}><span>2.4 Typography (Google Fonts, Line Height, etc.)</span> <small>pg 42</small></li>
            <li className={styles.tocSub}><span>2.5 CSS Units (px, rem, em, vh, vw)</span> <small>pg 45</small></li>
            <li className={styles.tocSub}><span>2.6 CSS Positions</span> <small>pg 48</small></li>
            <li className={styles.tocSub}><span>2.7 Display Property (Flex, Grid, etc.)</span> <small>pg 50</small></li>
            <li className={styles.tocSub}><span>2.8 CSS Flexbox</span> <small>pg 53</small></li>
            <li className={styles.tocSub}><span>2.9 CSS Grid Layout</span> <small>pg 55</small></li>
            <li className={styles.tocSub}><span>2.10 Media Queries</span> <small>pg 58</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_wd">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 2 (CSS Cont.)</strong></li>
            <li className={styles.tocSub}><span>2.11 CSS Transitions and Transforms</span> <small>pg 60</small></li>
            <li className={styles.tocSub}><span>2.12 Keyframe Animation</span> <small>pg 63</small></li>
            <li className={styles.tocSub}><span>2.13 CSS Variables</span> <small>pg 66</small></li>
            <li className={styles.tocSub}><span>2.14 Z-Index and Stacking Contexts</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>2.15 Filter Effects</span> <small>pg 70</small></li>

            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5)</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction</span> <small>pg 75</small></li>
            <li className={styles.tocSub}><span>3.2 Bootstrap – 12 Column Grid System</span> <small>pg 76</small></li>
            <li className={styles.tocSub}><span>3.3 Bootstrap Containers</span> <small>pg 79</small></li>
            <li className={styles.tocSub}><span>3.4 Typography in Bootstrap</span> <small>pg 82</small></li>
            <li className={styles.tocSub}><span>3.5 Buttons in Bootstrap</span> <small>pg 84</small></li>
            <li className={styles.tocSub}><span>3.6 Navbar and Responsive Toggle in Bootstrap</span> <small>pg 87</small></li>
            <li className={styles.tocSub}><span>3.7 Cards in Bootstrap</span> <small>pg 90</small></li>
            <li className={styles.tocSub}><span>3.8 Modals and Offcanvas in Bootstrap</span> <small>pg 92</small></li>
            <li className={styles.tocSub}><span>3.9 Forms in Bootstrap</span> <small>pg 94</small></li>
            <li className={styles.tocSub}><span>3.10 Tooltips and Popovers in Bootstrap</span> <small>pg 97</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_wd">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5 Cont.)</strong></li>
            <li className={styles.tocSub}><span>3.11 Alerts and Badges in Bootstrap</span> <small>pg 99</small></li>
            <li className={styles.tocSub}><span>3.12 Carousel and Image Slides in Bootstrap</span> <small>pg 102</small></li>
            <li className={styles.tocSub}><span>3.13 Tables and List Groups in Bootstrap</span> <small>pg 104</small></li>
            <li className={styles.tocSub}><span>3.14 Colours and Backgrounds in Bootstrap</span> <small>pg 106</small></li>
            <li className={styles.tocSub}><span>3.15 Bootstrap Icons</span> <small>pg 108</small></li>
            <li className={styles.tocSub}><span>3.16 Z-Index in Bootstrap</span> <small>pg 109</small></li>
            <li className={styles.tocSub}><span>3.17 Breakpoints in Bootstrap</span> <small>pg 112</small></li>

            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT)</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction</span> <small>pg 121</small></li>
            <li className={styles.tocSub}><span>4.2 Variables</span> <small>pg 122</small></li>
            <li className={styles.tocSub}><span>4.3 Data Types</span> <small>pg 123</small></li>
            <li className={styles.tocSub}><span>4.4 Operators</span> <small>pg 124</small></li>
            <li className={styles.tocSub}><span>4.5 Conditional Statements</span> <small>pg 126</small></li>
            <li className={styles.tocSub}><span>4.6 Loops</span> <small>pg 128</small></li>
            <li className={styles.tocSub}><span>4.7 JS Functions</span> <small>pg 130</small></li>
            <li className={styles.tocSub}><span>4.8 Objects and Array Methods</span> <small>pg 131</small></li>
            <li className={styles.tocSub}><span>4.9 JS Display Objects and Constructors</span> <small>pg 134</small></li>
            <li className={styles.tocSub}><span>4.10 JS Events</span> <small>pg 136</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_wd">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT Cont.)</strong></li>
            <li className={styles.tocSub}><span>4.11 JS String Methods</span> <small>pg 138</small></li>
            <li className={styles.tocSub}><span>4.12 Big Three Array Methods (find)</span> <small>pg 140</small></li>
            <li className={styles.tocSub}><span>4.13 DOM Manipulation</span> <small>pg 141</small></li>
            <li className={styles.tocSub}><span>4.14 Async / Await</span> <small>pg 143</small></li>
            <li className={styles.tocSub}><span>4.15 Fetch API</span> <small>pg 145</small></li>
            <li className={styles.tocSub}><span>4.16 Arrow Functions and Modern Syntax</span> <small>pg 147</small></li>
            <li className={styles.tocSub}><span>4.17 JSON Data Manipulation</span> <small>pg 151</small></li>
            <li className={styles.tocSub}><span>4.18 Debugging Techniques & Console</span> <small>pg 154</small></li>
          </ul>
        </div>
      );

      // Page 6: Table of Contents - Part 6
      pages.push(
        <div className={styles.pageInner} key="toc6_wd">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 5 (VS Code Installation)</strong></li>
            <li className={styles.tocSub}><span>5.1 Introduction to Visual Studio Code</span> <small>pg 159</small></li>
            <li className={styles.tocSub}><span>5.2 Features of VS Code</span> <small>pg 160</small></li>
            <li className={styles.tocSub}><span>5.3 System Requirements</span> <small>pg 161</small></li>
            <li className={styles.tocSub}><span>5.4 Steps to Download VS Code</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>5.5 Installing VS Code on Windows</span> <small>pg 163</small></li>
            <li className={styles.tocSub}><span>5.6 Installing VS Code on MacOS</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.7 Installing VS Code on Linux</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.8 VS Code Interface Overview</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.9 Installing Useful Extensions</span> <small>pg 165</small></li>
            <li className={styles.tocSub}><span>5.10 React Router</span> <small>pg 166</small></li>
            <li className={styles.tocSub}><span>5.11 Creating Your First Project</span> <small>pg 167</small></li>
            <li className={styles.tocSub}><span>5.12 Conclusion</span> <small>pg 168</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR UI/UX BOOK (ID: 2)
    if (book.id === 2) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>1. Introduction to UI/UX</strong></li>
            <li className={styles.tocSub}><span>1.1 Defining UI (User Interface)</span> <small>pg 4</small></li>
            <li className={styles.tocSub}><span>1.2 Defining UX (User Experience)</span> <small>pg 4</small></li>
            <li className={styles.tocSub}><span>1.3 Collaboration Features</span> <small>pg 4</small></li>

            <li className={styles.tocChapter}><strong>2. HTML in UI Design</strong></li>
            <li className={styles.tocSub}><span>2.1 HTML Basic Structure</span> <small>pg 6</small></li>
            <li className={styles.tocSub}><span>2.2 Headings</span> <small>pg 6</small></li>
            <li className={styles.tocSub}><span>2.3 Paragraphs</span> <small>pg 7</small></li>
            <li className={styles.tocSub}><span>2.4 Links (Navigation)</span> <small>pg 7</small></li>
            <li className={styles.tocSub}><span>2.5 Images</span> <small>pg 7</small></li>
            <li className={styles.tocSub}><span>2.6 Buttons</span> <small>pg 7</small></li>
            <li className={styles.tocSub}><span>2.7 Forms</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>2.8 Lists</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>2.9 Layout Tags</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>2.10 Tables</span> <small>pg 9</small></li>

            <li className={styles.tocChapter}><strong>3. CSS in UI/UX Design</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction to CSS</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>3.2 Colors and Background</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>3.3 Typography</span> <small>pg 12</small></li>
            <li className={styles.tocSub}><span>3.4 Margin and Padding (Spacing)</span> <small>pg 13</small></li>
            <li className={styles.tocSub}><span>3.5 Layout Design (Flexbox and Grid)</span> <small>pg 13</small></li>
            <li className={styles.tocSub}><span>3.6 Buttons and UI Components</span> <small>pg 14</small></li>
            <li className={styles.tocSub}><span>3.7 Hover Effects and Interaction</span> <small>pg 14</small></li>
            <li className={styles.tocSub}><span>3.8 Responsive Design</span> <small>pg 15</small></li>
            <li className={styles.tocSub}><span>3.9 Consistent Design</span> <small>pg 15</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>4. Bootstrap in UI/UX</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction to Bootstrap</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>4.2 Grid System</span> <small>pg 17</small></li>
            <li className={styles.tocSub}><span>4.3 Buttons</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>4.4 Navigation Bars</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>4.5 Cards</span> <small>pg 19</small></li>
            <li className={styles.tocSub}><span>4.6 Forms</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>4.7 Alerts</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>4.8 Responsive Utilities</span> <small>pg 21</small></li>
            <li className={styles.tocSub}><span>4.9 Spacing Utilities</span> <small>pg 21</small></li>

            <li className={styles.tocChapter}><strong>5. Getting Started with Figma</strong></li>
            <li className={styles.tocSub}><span>5.1 Figma Interface Overview</span> <small>pg 23</small></li>
            <li className={styles.tocSub}><span>5.2 Platform Options</span> <small>pg 25</small></li>
            <li className={styles.tocSub}><span>5.3 The Home Screen</span> <small>pg 25</small></li>
            <li className={styles.tocSub}><span>5.4 Community & Resources</span> <small>pg 27</small></li>

            <li className={styles.tocChapter}><strong>6. Project Setup & Workspace</strong></li>
            <li className={styles.tocSub}><span>6.1 File Management in Figma</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>6.2 Drafts and Team Projects</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>6.3 Version History</span> <small>pg 29</small></li>
            <li className={styles.tocSub}><span>6.4 Sharing and Access Control</span> <small>pg 29</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>7. UI Layout in Figma</strong></li>
            <li className={styles.tocSub}><span>7.1 Toolbar</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>7.2 Layers Panel</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>7.3 Design Panel</span> <small>pg 31</small></li>
            <li className={styles.tocSub}><span>7.4 Canvas</span> <small>pg 31</small></li>

            <li className={styles.tocChapter}><strong>8. Basic Design Tools & Objects</strong></li>
            <li className={styles.tocSub}><span>8.1 Layer & Group Management</span> <small>pg 33</small></li>
            <li className={styles.tocSub}><span>8.2 Object Control</span> <small>pg 34</small></li>
            <li className={styles.tocSub}><span>8.3 Nesting</span> <small>pg 35</small></li>
            <li className={styles.tocSub}><span>8.4 Creating & Customizing Shapes</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>8.5 Property Adjustments</span> <small>pg 37</small></li>
            <li className={styles.tocSub}><span>8.6 Styling</span> <small>pg 38</small></li>

            <li className={styles.tocChapter}><strong>9. Advanced Vector Tools</strong></li>
            <li className={styles.tocSub}><span>9.1 The Pen Tool</span> <small>pg 40</small></li>
            <li className={styles.tocSub}><span>9.2 Vector Editing</span> <small>pg 41</small></li>
            <li className={styles.tocSub}><span>9.3 Precision Tools</span> <small>pg 42</small></li>

            <li className={styles.tocChapter}><strong>10. Typography and Visuals</strong></li>
            <li className={styles.tocSub}><span>10.1 Text & Typography Systems</span> <small>pg 44</small></li>
            <li className={styles.tocSub}><span>10.2 Styling & Formatting</span> <small>pg 45</small></li>
            <li className={styles.tocSub}><span>10.3 Design Fundamentals</span> <small>pg 47</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>11. Media & Visual Effects</strong></li>
            <li className={styles.tocSub}><span>11.1 Image Integration</span> <small>pg 49</small></li>
            <li className={styles.tocSub}><span>11.2 Advanced Masking</span> <small>pg 49</small></li>
            <li className={styles.tocSub}><span>11.3 Blending & Effects</span> <small>pg 50</small></li>

            <li className={styles.tocChapter}><strong>12. Advanced Workflow & Systems</strong></li>
            <li className={styles.tocSub}><span>12.1 Responsive Design Foundations</span> <small>pg 51</small></li>
            <li className={styles.tocSub}><span>12.2 Auto Layout</span> <small>pg 51</small></li>
            <li className={styles.tocSub}><span>12.3 Layout Grids</span> <small>pg 53</small></li>
            <li className={styles.tocSub}><span>12.4 Frames vs Groups</span> <small>pg 54</small></li>

            <li className={styles.tocChapter}><strong>13. Design Systems & Scalability</strong></li>
            <li className={styles.tocSub}><span>13.1 Components</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>13.2 Global Styles</span> <small>pg 58</small></li>
            <li className={styles.tocSub}><span>13.3 Extending Figma</span> <small>pg 59</small></li>

            <li className={styles.tocChapter}><strong>14. Prototyping, Sharing & Handoff</strong></li>
            <li className={styles.tocSub}><span>14.1 Interactive Prototypes</span> <small>pg 61</small></li>
            <li className={styles.tocSub}><span>14.2 Presentation Mode</span> <small>pg 62</small></li>
            <li className={styles.tocSub}><span>14.3 Stakeholder Handoff</span> <small>pg 63</small></li>

            <li className={styles.tocChapter}><strong>15. UI/UX Practice Questions</strong></li>
            <li className={styles.tocSub}><span>Exam Practice & Case Studies</span> <small>pg 64</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR FRONT-END BOOK (ID: 3)
    if (book.id === 3) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_fe">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1 (HTML)</strong></li>
            <li className={styles.tocSub}><span>1.1 Introduction</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>1.2 Structure of HTML</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>1.3 Semantic Tags</span> <small>pg 12</small></li>
            <li className={styles.tocSub}><span>1.4 Text Formatting Tags</span> <small>pg 15</small></li>
            <li className={styles.tocSub}><span>1.5 Working with Hyperlinks</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.6 HTML Lists</span> <small>pg 17</small></li>
            <li className={styles.tocSub}><span>1.7 HTML Form Elements</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>1.8 HTML Tables</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>1.9 Images and Multimedia</span> <small>pg 22</small></li>
            <li className={styles.tocSub}><span>1.10 HTML Attributes</span> <small>pg 24</small></li>
            <li className={styles.tocSub}><span>1.11 Block vs Inline Elements</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>1.12 HTML Entities and Special Characters</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>1.13 Meta Tags</span> <small>pg 29</small></li>
            <li className={styles.tocSub}><span>1.14 Web Accessibility</span> <small>pg 31</small></li>
            <li className={styles.tocSub}><span>1.15 Iframes and Embedding External Content</span> <small>pg 32</small></li>

            <li className={styles.tocChapter}><strong>Chapter 2 (CSS)</strong></li>
            <li className={styles.tocSub}><span>2.1 CSS Introduction</span> <small>pg 43</small></li>
            <li className={styles.tocSub}><span>2.2 CSS Selectors</span> <small>pg 44</small></li>
            <li className={styles.tocSub}><span>2.3 Colors& Backgrounds</span> <small>pg 46</small></li>
            <li className={styles.tocSub}><span>2.4 Typography (Google Fonts, Line Height, etc.)</span> <small>pg 48</small></li>
            <li className={styles.tocSub}><span>2.5 CSS Units (px, rem, em, vh, vw)</span> <small>pg 51</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_fe">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 2 (CSS Cont.)</strong></li>
            <li className={styles.tocSub}><span>2.6 CSS Positions</span> <small>pg 54</small></li>
            <li className={styles.tocSub}><span>2.7 Display Property (Flex, Grid, etc.)</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>2.8 CSS Flexbox</span> <small>pg 59</small></li>
            <li className={styles.tocSub}><span>2.9 CSS Grid Layout</span> <small>pg 61</small></li>
            <li className={styles.tocSub}><span>2.10 Media Queries</span> <small>pg 64</small></li>
            <li className={styles.tocSub}><span>2.11 CSS Transitions and Transforms</span> <small>pg 66</small></li>
            <li className={styles.tocSub}><span>2.12 Keyframe Animation</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>2.13 CSS Variables</span> <small>pg 71</small></li>
            <li className={styles.tocSub}><span>2.14 Z-Index and Stacking Contexts</span> <small>pg 73</small></li>
            <li className={styles.tocSub}><span>2.15 Filter Effects</span> <small>pg 76</small></li>

            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5)</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction</span> <small>pg 79</small></li>
            <li className={styles.tocSub}><span>3.2 Bootstrap – 12 Column Grid System</span> <small>pg 81</small></li>
            <li className={styles.tocSub}><span>3.3 Bootstrap Containers</span> <small>pg 83</small></li>
            <li className={styles.tocSub}><span>3.4 Typography in Bootstrap</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>3.5 Buttons in Bootstrap</span> <small>pg 88</small></li>
            <li className={styles.tocSub}><span>3.6 Navbar and Responsive Toggle in Bootstrap</span> <small>pg 91</small></li>
            <li className={styles.tocSub}><span>3.7 Cards in Bootstrap</span> <small>pg 93</small></li>
            <li className={styles.tocSub}><span>3.8 Modals and Offcanvas in Bootstrap</span> <small>pg 96</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_fe">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5 Cont.)</strong></li>
            <li className={styles.tocSub}><span>3.9 Forms in Bootstrap</span> <small>pg 98</small></li>
            <li className={styles.tocSub}><span>3.10 Tooltips and Popovers in Bootstrap</span> <small>pg 100</small></li>
            <li className={styles.tocSub}><span>3.11 Alerts and Badges in Bootstrap</span> <small>pg 102</small></li>
            <li className={styles.tocSub}><span>3.12 Carousel and Image Slides in Bootstrap</span> <small>pg 105</small></li>
            <li className={styles.tocSub}><span>3.13 Tables and List Groups in Bootstrap</span> <small>pg 107</small></li>
            <li className={styles.tocSub}><span>3.14 Colours and Backgrounds in Bootstrap</span> <small>pg 109</small></li>
            <li className={styles.tocSub}><span>3.15 Bootstrap Icons</span> <small>pg 111</small></li>
            <li className={styles.tocSub}><span>3.16 Z-Index in Bootstrap</span> <small>pg 113</small></li>
            <li className={styles.tocSub}><span>3.17 Breakpoints in Bootstrap</span> <small>pg 115</small></li>

            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT)</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction</span> <small>pg 119</small></li>
            <li className={styles.tocSub}><span>4.2 Variables</span> <small>pg 120</small></li>
            <li className={styles.tocSub}><span>4.3 Data Types</span> <small>pg 121</small></li>
            <li className={styles.tocSub}><span>4.4 Operators</span> <small>pg 122</small></li>
            <li className={styles.tocSub}><span>4.5 Conditional Statements</span> <small>pg 124</small></li>
            <li className={styles.tocSub}><span>4.6 Loops</span> <small>pg 125</small></li>
            <li className={styles.tocSub}><span>4.7 JS Functions</span> <small>pg 127</small></li>
            <li className={styles.tocSub}><span>4.8 Objects and Array Methods</span> <small>pg 128</small></li>
            <li className={styles.tocSub}><span>4.9 JS Display Objects and Constructors</span> <small>pg 130</small></li>
            <li className={styles.tocSub}><span>4.10 JS Events</span> <small>pg 132</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_fe">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT Cont.)</strong></li>
            <li className={styles.tocSub}><span>4.11 JS String Methods</span> <small>pg 134</small></li>
            <li className={styles.tocSub}><span>4.12 Big Three Array Methods (find)</span> <small>pg 135</small></li>
            <li className={styles.tocSub}><span>4.13 DOM Manipulation</span> <small>pg 137</small></li>
            <li className={styles.tocSub}><span>4.14 Async / Await</span> <small>pg 139</small></li>
            <li className={styles.tocSub}><span>4.15 Fetch API</span> <small>pg 141</small></li>
            <li className={styles.tocSub}><span>4.16 Arrow Functions and Modern Syntax</span> <small>pg 143</small></li>
            <li className={styles.tocSub}><span>4.17 JSON Data Manipulation</span> <small>pg 146</small></li>
            <li className={styles.tocSub}><span>4.18 Debugging Techniques & Console</span> <small>pg 148</small></li>
            <li className={styles.tocSub}><span>4.19 AJAX in Javascript</span> <small>pg 151</small></li>
            <li className={styles.tocSub}><span>4.20 JSON in Javascript</span> <small>pg 157</small></li>

            <li className={styles.tocChapter}><strong>Chapter 5 (React Js)</strong></li>
            <li className={styles.tocSub}><span>5.1 Introduction to React</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>5.2 Virtual DOM</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.3 JSX Syntax and Rules</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.4 React Components</span> <small>pg 165</small></li>
            <li className={styles.tocSub}><span>5.5 Props and State</span> <small>pg 166</small></li>
            <li className={styles.tocSub}><span>5.6 React Events</span> <small>pg 168</small></li>
            <li className={styles.tocSub}><span>5.7 Conditional Rendering in React</span> <small>pg 170</small></li>
            <li className={styles.tocSub}><span>5.8 React Lists and Keys</span> <small>pg 172</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_fe">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 5 (React Js Cont.)</strong></li>
            <li className={styles.tocSub}><span>5.9 React Forms</span> <small>pg 173</small></li>
            <li className={styles.tocSub}><span>5.10 React Router</span> <small>pg 174</small></li>
            <li className={styles.tocSub}><span>5.11 React Hooks</span> <small>pg 176</small></li>
            <li className={styles.tocSub}><span>5.12 CSS modules In Reactjs</span> <small>pg 181</small></li>
            <li className={styles.tocSub}><span>5.13 Context API In React</span> <small>pg 182</small></li>
            <li className={styles.tocSub}><span>5.14 Basic npm commands</span> <small>pg 184</small></li>
            <li className={styles.tocSub}><span>5.15 Handling API Calls in React</span> <small>pg 187</small></li>
            <li className={styles.tocSub}><span>5.16 Debugging Techniques</span> <small>pg 190</small></li>

            <li className={styles.tocChapter}><strong>Chapter 6 (API)</strong></li>
            <li className={styles.tocSub}><span>6.1 Introduction to API</span> <small>pg 195</small></li>
            <li className={styles.tocSub}><span>6.2 HTTP Methods in APIs</span> <small>pg 195</small></li>
            <li className={styles.tocSub}><span>6.3 Common HTTP Status Codes</span> <small>pg 201</small></li>
            <li className={styles.tocSub}><span>6.4 API Authentication</span> <small>pg 201</small></li>
            <li className={styles.tocSub}><span>6.5 Headers and Payloads</span> <small>pg 206</small></li>
            <li className={styles.tocSub}><span>6.6 Getting API Response</span> <small>pg 207</small></li>
            <li className={styles.tocSub}><span>6.7 File uploading Via API</span> <small>pg 208</small></li>
            <li className={styles.tocSub}><span>6.8 Testing API In Frontend</span> <small>pg 209</small></li>
            <li className={styles.tocSub}><span>6.9 Payment gateway API</span> <small>pg 209</small></li>
            <li className={styles.tocSub}><span>6.10 Google Authentication</span> <small>pg 213</small></li>
            <li className={styles.tocSub}><span>6.11 Postman API Testing</span> <small>pg 214</small></li>
          </ul>
        </div>
      );

      // Page 6: Table of Contents - Part 6
      pages.push(
        <div className={styles.pageInner} key="toc6_fe">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 7 (VS Code Installation)</strong></li>
            <li className={styles.tocSub}><span>7.1. Introduction to VS Code</span> <small>pg 217</small></li>
            <li className={styles.tocSub}><span>7.2 Features of VS Code</span> <small>pg 218</small></li>
            <li className={styles.tocSub}><span>7.3 System Requirements</span> <small>pg 219</small></li>
            <li className={styles.tocSub}><span>7.4 Steps to Download VS Code</span> <small>pg 219</small></li>
            <li className={styles.tocSub}><span>7.5. Installing VS Code on Windows</span> <small>pg 221</small></li>
            <li className={styles.tocSub}><span>7.6. Installing on MacOS</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.7. Installing on Linux</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.8 VS Code Interface Overview</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.9 Installing Useful Extensions</span> <small>pg 223</small></li>
            <li className={styles.tocSub}><span>7.10 React Router</span> <small>pg 224</small></li>
            <li className={styles.tocSub}><span>7.11 Creating Your First Project</span> <small>pg 225</small></li>

            <li className={styles.tocChapter}><strong>Chapter 8 (Node Js Installation)</strong></li>
            <li className={styles.tocSub}><span>8.1 Introduction to Nodejs</span> <small>pg 226</small></li>
            <li className={styles.tocSub}><span>8.2 Features of Nodejs</span> <small>pg 226</small></li>
            <li className={styles.tocSub}><span>8.3 System Requirements</span> <small>pg 227</small></li>
            <li className={styles.tocSub}><span>8.4 Downloading Node.js</span> <small>pg 227</small></li>
            <li className={styles.tocSub}><span>8.5 Installing Node.js on Windows</span> <small>pg 228</small></li>
            <li className={styles.tocSub}><span>8.6 Verifying the Installation</span> <small>pg 230</small></li>
            <li className={styles.tocSub}><span>8.7 Installing on macOS / Linux</span> <small>pg 231</small></li>
            <li className={styles.tocSub}><span>8.9 Creating First Node.js Program</span> <small>pg 231</small></li>
            <li className={styles.tocSub}><span>8.10 Installing Packages via NPM</span> <small>pg 232</small></li>
            <li className={styles.tocSub}><span>8.11 Advantages of Node.js</span> <small>pg 232</small></li>
            <li className={styles.tocSub}><span>8.12 Conclusion</span> <small>pg 233</small></li>

            <li className={styles.tocChapter}><strong>Chapter 9 (Git & GitHub)</strong></li>
            <li className={styles.tocSub}><span>9.1. Version Control Introduction</span> <small>pg 234</small></li>
            <li className={styles.tocSub}><span>9.2 Installing and Setting Up Git</span> <small>pg 237</small></li>
            <li className={styles.tocSub}><span>9.3 Git Basics</span> <small>pg 241</small></li>
            <li className={styles.tocSub}><span>9.4 Git Basic Commands</span> <small>pg 254</small></li>
            <li className={styles.tocSub}><span>9.5.Working with Git Files</span> <small>pg 258</small></li>
            <li className={styles.tocSub}><span>9.6 Branching in Git</span> <small>pg 262</small></li>
            <li className={styles.tocSub}><span>9.7. Merging and Conflict Resolution</span> <small>pg 266</small></li>
            <li className={styles.tocSub}><span>9.8 GitHub Basics</span> <small>pg 271</small></li>
            <li className={styles.tocSub}><span>9.9 Remote Repositories</span> <small>pg 278</small></li>
            <li className={styles.tocSub}><span>9.10 Collaboration with Github</span> <small>pg 282</small></li>
            <li className={styles.tocSub}><span>9.11 Advanced Git Concepts</span> <small>pg 289</small></li>
            <li className={styles.tocSub}><span>9.12 GitHub Features & Best Practices</span> <small>pg 293</small></li>
            <li className={styles.tocSub}><span>9.13 Real-World Projects</span> <small>pg 305</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR FULL STACK BOOK (ID: 4)
    if (book.id === 4) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_fs">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1: Introduction to Full Stack</strong></li>
            <li className={styles.tocSub}><span>1.1 What is Full Stack Development?</span> <small>pg 5</small></li>
            <li className={styles.tocSub}><span>1.2 Front-End vs Back-End</span> <small>pg 6</small></li>
            <li className={styles.tocSub}><span>1.3 Client-Server Architecture</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>1.4 MERN Stack Overview</span> <small>pg 9</small></li>
            <li className={styles.tocSub}><span>1.5 Software Development Life Cycle</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>1.6 Career Opportunities</span> <small>pg 13</small></li>

            <li className={styles.tocChapter}><strong>Chapter 2: Web Fundamentals</strong></li>
            <li className={styles.tocSub}><span>2.1 How the Internet Works</span> <small>pg 15</small></li>
            <li className={styles.tocSub}><span>2.2 HTTP & HTTPS</span> <small>pg 17</small></li>
            <li className={styles.tocSub}><span>2.3 Web Browsers</span> <small>pg 19</small></li>
            <li className={styles.tocSub}><span>2.4 Domain & Hosting</span> <small>pg 21</small></li>
            <li className={styles.tocSub}><span>2.5 DNS</span> <small>pg 22</small></li>
            <li className={styles.tocSub}><span>2.6 Request & Response Cycle</span> <small>pg 24</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3: HTML5</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction to HTML</span> <small>pg 25</small></li>
            <li className={styles.tocSub}><span>3.2 HTML Document Structure</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>3.3 Headings & Paragraphs</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>3.4 Lists</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>3.5 Links</span> <small>pg 32</small></li>
            <li className={styles.tocSub}><span>3.6 Images</span> <small>pg 34</small></li>
            <li className={styles.tocSub}><span>3.7 Tables</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>3.8 Forms</span> <small>pg 38</small></li>
            <li className={styles.tocSub}><span>3.9 Semantic HTML</span> <small>pg 40</small></li>
            <li className={styles.tocSub}><span>3.10 Multimedia</span> <small>pg 42</small></li>
            <li className={styles.tocSub}><span>3.11 HTML Best Practices</span> <small>pg 44</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4: CSS3</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction to CSS</span> <small>pg 45</small></li>
            <li className={styles.tocSub}><span>4.2 Selectors</span> <small>pg 46</small></li>
            <li className={styles.tocSub}><span>4.3 Colors</span> <small>pg 48</small></li>
            <li className={styles.tocSub}><span>4.4 Backgrounds</span> <small>pg 50</small></li>
            <li className={styles.tocSub}><span>4.5 Typography</span> <small>pg 52</small></li>
            <li className={styles.tocSub}><span>4.6 Box Model</span> <small>pg 54</small></li>
            <li className={styles.tocSub}><span>4.7 Flexbox</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>4.8 CSS Grid</span> <small>pg 58</small></li>
            <li className={styles.tocSub}><span>4.9 Positioning</span> <small>pg 60</small></li>
            <li className={styles.tocSub}><span>4.10 Animations</span> <small>pg 62</small></li>
            <li className={styles.tocSub}><span>4.11 Media Queries</span> <small>pg 64</small></li>
            <li className={styles.tocSub}><span>4.12 Responsive Design</span> <small>pg 66</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 5: JavaScript</strong></li>
            <li className={styles.tocSub}><span>5.1 Introduction</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>5.2 Variables</span> <small>pg 70</small></li>
            <li className={styles.tocSub}><span>5.3 Data Types</span> <small>pg 72</small></li>
            <li className={styles.tocSub}><span>5.4 Operators</span> <small>pg 74</small></li>
            <li className={styles.tocSub}><span>5.5 Conditions</span> <small>pg 76</small></li>
            <li className={styles.tocSub}><span>5.6 Loops</span> <small>pg 78</small></li>
            <li className={styles.tocSub}><span>5.7 Functions</span> <small>pg 80</small></li>
            <li className={styles.tocSub}><span>5.8 Arrays</span> <small>pg 82</small></li>
            <li className={styles.tocSub}><span>5.9 Objects</span> <small>pg 84</small></li>
            <li className={styles.tocSub}><span>5.10 DOM Manipulation</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>5.11 Events</span> <small>pg 88</small></li>
            <li className={styles.tocSub}><span>5.12 ES6 Features</span> <small>pg 90</small></li>
            <li className={styles.tocSub}><span>5.13 Async JavaScript</span> <small>pg 92</small></li>
            <li className={styles.tocSub}><span>5.14 Fetch API</span> <small>pg 94</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 6: Git & GitHub</strong></li>
            <li className={styles.tocSub}><span>6.1 Version Control</span> <small>pg 95</small></li>
            <li className={styles.tocSub}><span>6.2 Git Installation</span> <small>pg 97</small></li>
            <li className={styles.tocSub}><span>6.3 Git Commands</span> <small>pg 99</small></li>
            <li className={styles.tocSub}><span>6.4 Branching</span> <small>pg 101</small></li>
            <li className={styles.tocSub}><span>6.5 Merge</span> <small>pg 103</small></li>
            <li className={styles.tocSub}><span>6.6 GitHub Repository</span> <small>pg 105</small></li>
            <li className={styles.tocSub}><span>6.7 Push & Pull</span> <small>pg 107</small></li>
            <li className={styles.tocSub}><span>6.8 Pull Request</span> <small>pg 109</small></li>

            <li className={styles.tocChapter}><strong>Chapter 7: React.js</strong></li>
            <li className={styles.tocSub}><span>7.1 Introduction</span> <small>pg 110</small></li>
            <li className={styles.tocSub}><span>7.2 React Environment</span> <small>pg 112</small></li>
            <li className={styles.tocSub}><span>7.3 JSX</span> <small>pg 114</small></li>
            <li className={styles.tocSub}><span>7.4 Components</span> <small>pg 116</small></li>
            <li className={styles.tocSub}><span>7.5 Props</span> <small>pg 118</small></li>
            <li className={styles.tocSub}><span>7.6 State</span> <small>pg 120</small></li>
            <li className={styles.tocSub}><span>7.7 Event Handling</span> <small>pg 122</small></li>
            <li className={styles.tocSub}><span>7.8 Hooks</span> <small>pg 124</small></li>
          </ul>
        </div>
      );

      // Page 6: Table of Contents - Part 6
      pages.push(
        <div className={styles.pageInner} key="toc6_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 7: React.js (Cont.)</strong></li>
            <li className={styles.tocSub}><span>7.9 useState</span> <small>pg 126</small></li>
            <li className={styles.tocSub}><span>7.10 useEffect</span> <small>pg 128</small></li>
            <li className={styles.tocSub}><span>7.11 React Router</span> <small>pg 130</small></li>
            <li className={styles.tocSub}><span>7.12 Forms</span> <small>pg 132</small></li>
            <li className={styles.tocSub}><span>7.13 API Integration</span> <small>pg 134</small></li>
            <li className={styles.tocSub}><span>7.14 Module CSS</span> <small>pg 136</small></li>
            <li className={styles.tocSub}><span>7.15 Context API</span> <small>pg 138</small></li>
            <li className={styles.tocSub}><span>7.16 Custom Hooks</span> <small>pg 140</small></li>

            <li className={styles.tocChapter}><strong>Chapter 8: Node.js</strong></li>
            <li className={styles.tocSub}><span>8.1 Introduction</span> <small>pg 145</small></li>
            <li className={styles.tocSub}><span>8.2 Installation</span> <small>pg 146</small></li>
            <li className={styles.tocSub}><span>8.3 Modules</span> <small>pg 148</small></li>
            <li className={styles.tocSub}><span>8.4 File System</span> <small>pg 150</small></li>
            <li className={styles.tocSub}><span>8.5 NPM</span> <small>pg 152</small></li>
            <li className={styles.tocSub}><span>8.6 Package.json</span> <small>pg 154</small></li>
            <li className={styles.tocSub}><span>8.7 Environment Variables</span> <small>pg 156</small></li>
          </ul>
        </div>
      );

      // Page 7: Table of Contents - Part 7
      pages.push(
        <div className={styles.pageInner} key="toc7_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 9: Express.js</strong></li>
            <li className={styles.tocSub}><span>9.1 Express Introduction</span> <small>pg 160</small></li>
            <li className={styles.tocSub}><span>9.2 Routing</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>9.3 Middleware</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>9.4 REST APIs</span> <small>pg 166</small></li>
            <li className={styles.tocSub}><span>9.5 Request & Response</span> <small>pg 168</small></li>
            <li className={styles.tocSub}><span>9.6 Error Handling</span> <small>pg 170</small></li>
            <li className={styles.tocSub}><span>9.7 MVC Architecture</span> <small>pg 172</small></li>

            <li className={styles.tocChapter}><strong>Chapter 10: MongoDB</strong></li>
            <li className={styles.tocSub}><span>10.1 Introduction</span> <small>pg 185</small></li>
            <li className={styles.tocSub}><span>10.2 Installation</span> <small>pg 187</small></li>
            <li className={styles.tocSub}><span>10.3 Collections</span> <small>pg 189</small></li>
            <li className={styles.tocSub}><span>10.4 Documents</span> <small>pg 191</small></li>
            <li className={styles.tocSub}><span>10.5 CRUD Operations</span> <small>pg 193</small></li>
            <li className={styles.tocSub}><span>10.6 Queries</span> <small>pg 195</small></li>
            <li className={styles.tocSub}><span>10.7 Aggregation</span> <small>pg 197</small></li>
            <li className={styles.tocSub}><span>10.8 Indexing</span> <small>pg 199</small></li>
          </ul>
        </div>
      );

      // Page 8: Table of Contents - Part 8
      pages.push(
        <div className={styles.pageInner} key="toc8_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 11: Mongoose</strong></li>
            <li className={styles.tocSub}><span>11.1 Introduction</span> <small>pg 205</small></li>
            <li className={styles.tocSub}><span>11.2 Schema</span> <small>pg 207</small></li>
            <li className={styles.tocSub}><span>11.3 Models</span> <small>pg 209</small></li>
            <li className={styles.tocSub}><span>11.4 Validation</span> <small>pg 211</small></li>
            <li className={styles.tocSub}><span>11.5 Relationships</span> <small>pg 213</small></li>
            <li className={styles.tocSub}><span>11.6 CRUD Operations</span> <small>pg 215</small></li>

            <li className={styles.tocChapter}><strong>Chapter 12: Authentication & Security</strong></li>
            <li className={styles.tocSub}><span>12.1 User Authentication</span> <small>pg 220</small></li>
            <li className={styles.tocSub}><span>12.2 JWT</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>12.3 bcrypt</span> <small>pg 224</small></li>
            <li className={styles.tocSub}><span>12.4 Login</span> <small>pg 226</small></li>
            <li className={styles.tocSub}><span>12.5 Registration</span> <small>pg 228</small></li>
            <li className={styles.tocSub}><span>12.6 Protected Routes</span> <small>pg 230</small></li>
            <li className={styles.tocSub}><span>12.7 Role-Based Access</span> <small>pg 232</small></li>
          </ul>
        </div>
      );

      // Page 9: Table of Contents - Part 9
      pages.push(
        <div className={styles.pageInner} key="toc9_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 13: REST API Development</strong></li>
            <li className={styles.tocSub}><span>13.1 API Design</span> <small>pg 245</small></li>
            <li className={styles.tocSub}><span>13.2 CRUD APIs</span> <small>pg 247</small></li>
            <li className={styles.tocSub}><span>13.3 Postman Testing</span> <small>pg 249</small></li>
            <li className={styles.tocSub}><span>13.4 Status Codes</span> <small>pg 251</small></li>
            <li className={styles.tocSub}><span>13.5 Error Handling</span> <small>pg 253</small></li>

            <li className={styles.tocChapter}><strong>Chapter 14: File Upload & Cloud Storage</strong></li>
            <li className={styles.tocSub}><span>14.1 Multer</span> <small>pg 260</small></li>
            <li className={styles.tocSub}><span>14.2 Cloudinary</span> <small>pg 262</small></li>
            <li className={styles.tocSub}><span>14.3 Image Upload</span> <small>pg 264</small></li>
            <li className={styles.tocSub}><span>14.4 File Validation</span> <small>pg 266</small></li>
          </ul>
        </div>
      );

      // Page 10: Table of Contents - Part 10
      pages.push(
        <div className={styles.pageInner} key="toc10_fs">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 15: Project Architecture</strong></li>
            <li className={styles.tocSub}><span>15.1 Folder Structure</span> <small>pg 275</small></li>
            <li className={styles.tocSub}><span>15.2 MVC Pattern</span> <small>pg 277</small></li>
            <li className={styles.tocSub}><span>15.3 Environment Variables</span> <small>pg 279</small></li>
            <li className={styles.tocSub}><span>15.4 Best Practices</span> <small>pg 281</small></li>

            <li className={styles.tocChapter}><strong>Chapter 16: Deployment</strong></li>
            <li className={styles.tocSub}><span>16.1 MongoDB Atlas</span> <small>pg 290</small></li>
            <li className={styles.tocSub}><span>16.2 Render</span> <small>pg 292</small></li>
            <li className={styles.tocSub}><span>16.3 Vercel</span> <small>pg 294</small></li>
            <li className={styles.tocSub}><span>16.4 Production Build</span> <small>pg 296</small></li>
            <li className={styles.tocSub}><span>16.5 Environment Configuration</span> <small>pg 298</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR MERN STACK BOOK (ID: 5)
    if (book.id === 5) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_mern">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1 (HTML)</strong></li>
            <li className={styles.tocSub}><span>1.1 Introduction</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>1.2 Structure of HTML</span> <small>pg 11</small></li>
            <li className={styles.tocSub}><span>1.3 Semantic Tags</span> <small>pg 12</small></li>
            <li className={styles.tocSub}><span>1.4 Text Formatting Tags</span> <small>pg 15</small></li>
            <li className={styles.tocSub}><span>1.5 Working with Hyperlinks</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.6 HTML Lists</span> <small>pg 17</small></li>
            <li className={styles.tocSub}><span>1.7 HTML Form Elements</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>1.8 HTML Tables</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>1.9 Images and Multimedia</span> <small>pg 22</small></li>
            <li className={styles.tocSub}><span>1.10 HTML Attributes</span> <small>pg 24</small></li>
            <li className={styles.tocSub}><span>1.11 Block vs Inline Elements</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>1.12 HTML Entities and Special Characters</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>1.13 Meta Tags</span> <small>pg 29</small></li>
            <li className={styles.tocSub}><span>1.14 Web Accessibility</span> <small>pg 31</small></li>
            <li className={styles.tocSub}><span>1.15 Iframes and Embedding External Content</span> <small>pg 32</small></li>

            <li className={styles.tocChapter}><strong>Chapter 2 (CSS)</strong></li>
            <li className={styles.tocSub}><span>2.1 CSS Introduction</span> <small>pg 43</small></li>
            <li className={styles.tocSub}><span>2.2 CSS Selectors</span> <small>pg 44</small></li>
            <li className={styles.tocSub}><span>2.3 Colors & Backgrounds</span> <small>pg 46</small></li>
            <li className={styles.tocSub}><span>2.4 Typography (Google Fonts, Line Height, etc.)</span> <small>pg 48</small></li>
            <li className={styles.tocSub}><span>2.5 CSS Units (px, rem, em, vh, vw)</span> <small>pg 51</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_mern">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 2 (CSS Cont.)</strong></li>
            <li className={styles.tocSub}><span>2.6 CSS Positions</span> <small>pg 54</small></li>
            <li className={styles.tocSub}><span>2.7 Display Property (Flex, Grid, etc.)</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>2.8 CSS Flexbox</span> <small>pg 59</small></li>
            <li className={styles.tocSub}><span>2.9 CSS Grid Layout</span> <small>pg 61</small></li>
            <li className={styles.tocSub}><span>2.10 Media Queries</span> <small>pg 64</small></li>
            <li className={styles.tocSub}><span>2.11 CSS Transitions and Transforms</span> <small>pg 66</small></li>
            <li className={styles.tocSub}><span>2.12 Keyframe Animation</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>2.13 CSS Variables</span> <small>pg 71</small></li>
            <li className={styles.tocSub}><span>2.14 Z-Index and Stacking Contexts</span> <small>pg 73</small></li>
            <li className={styles.tocSub}><span>2.15 Filter Effects</span> <small>pg 76</small></li>

            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5)</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction</span> <small>pg 79</small></li>
            <li className={styles.tocSub}><span>3.2 Bootstrap – 12 Column Grid System</span> <small>pg 81</small></li>
            <li className={styles.tocSub}><span>3.3 Bootstrap Containers</span> <small>pg 83</small></li>
            <li className={styles.tocSub}><span>3.4 Typography in Bootstrap</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>3.5 Buttons in Bootstrap</span> <small>pg 88</small></li>
            <li className={styles.tocSub}><span>3.6 Navbar and Responsive Toggle in Bootstrap</span> <small>pg 91</small></li>
            <li className={styles.tocSub}><span>3.7 Cards in Bootstrap</span> <small>pg 93</small></li>
            <li className={styles.tocSub}><span>3.8 Modals and Offcanvas in Bootstrap</span> <small>pg 96</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_mern">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3 (BOOTSTRAP 5 Cont.)</strong></li>
            <li className={styles.tocSub}><span>3.9 Forms in Bootstrap</span> <small>pg 98</small></li>
            <li className={styles.tocSub}><span>3.10 Tooltips and Popovers in Bootstrap</span> <small>pg 100</small></li>
            <li className={styles.tocSub}><span>3.11 Alerts and Badges in Bootstrap</span> <small>pg 102</small></li>
            <li className={styles.tocSub}><span>3.12 Carousel and Image Slides in Bootstrap</span> <small>pg 105</small></li>
            <li className={styles.tocSub}><span>3.13 Tables and List Groups in Bootstrap</span> <small>pg 107</small></li>
            <li className={styles.tocSub}><span>3.14 Colours and Backgrounds in Bootstrap</span> <small>pg 109</small></li>
            <li className={styles.tocSub}><span>3.15 Bootstrap Icons</span> <small>pg 111</small></li>
            <li className={styles.tocSub}><span>3.16 Z-Index in Bootstrap</span> <small>pg 113</small></li>
            <li className={styles.tocSub}><span>3.17 Breakpoints in Bootstrap</span> <small>pg 115</small></li>

            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT)</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction</span> <small>pg 119</small></li>
            <li className={styles.tocSub}><span>4.2 Variables</span> <small>pg 120</small></li>
            <li className={styles.tocSub}><span>4.3 Data Types</span> <small>pg 121</small></li>
            <li className={styles.tocSub}><span>4.4 Operators</span> <small>pg 122</small></li>
            <li className={styles.tocSub}><span>4.5 Conditional Statements</span> <small>pg 124</small></li>
            <li className={styles.tocSub}><span>4.6 Loops</span> <small>pg 125</small></li>
            <li className={styles.tocSub}><span>4.7 JS Functions</span> <small>pg 127</small></li>
            <li className={styles.tocSub}><span>4.8 Objects and Array Methods</span> <small>pg 128</small></li>
            <li className={styles.tocSub}><span>4.9 JS Display Objects and Constructors</span> <small>pg 130</small></li>
            <li className={styles.tocSub}><span>4.10 JS Events</span> <small>pg 132</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_mern">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4 (JAVASCRIPT Cont.)</strong></li>
            <li className={styles.tocSub}><span>4.11 JS String Methods</span> <small>pg 134</small></li>
            <li className={styles.tocSub}><span>4.12 Big Three Array Methods (find)</span> <small>pg 135</small></li>
            <li className={styles.tocSub}><span>4.13 DOM Manipulation</span> <small>pg 137</small></li>
            <li className={styles.tocSub}><span>4.14 Async / Await</span> <small>pg 139</small></li>
            <li className={styles.tocSub}><span>4.15 Fetch API</span> <small>pg 141</small></li>
            <li className={styles.tocSub}><span>4.16 Arrow Functions and Modern Syntax</span> <small>pg 143</small></li>
            <li className={styles.tocSub}><span>4.17 JSON Data Manipulation</span> <small>pg 146</small></li>
            <li className={styles.tocSub}><span>4.18 Debugging Techniques & Console</span> <small>pg 148</small></li>
            <li className={styles.tocSub}><span>4.19 AJAX in Javascript</span> <small>pg 151</small></li>
            <li className={styles.tocSub}><span>4.20 JSON in Javascript</span> <small>pg 157</small></li>

            <li className={styles.tocChapter}><strong>Chapter 5 (React Js)</strong></li>
            <li className={styles.tocSub}><span>5.1 Introduction to React</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>5.2 Virtual DOM</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.3 JSX Syntax and Rules</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>5.4 React Components</span> <small>pg 165</small></li>
            <li className={styles.tocSub}><span>5.5 Props and State</span> <small>pg 166</small></li>
            <li className={styles.tocSub}><span>5.6 React Events</span> <small>pg 168</small></li>
            <li className={styles.tocSub}><span>5.7 Conditional Rendering in React</span> <small>pg 170</small></li>
            <li className={styles.tocSub}><span>5.8 React Lists and Keys</span> <small>pg 172</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_mern">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 5 (React Js Cont.)</strong></li>
            <li className={styles.tocSub}><span>5.9 React Forms</span> <small>pg 173</small></li>
            <li className={styles.tocSub}><span>5.10 React Router</span> <small>pg 174</small></li>
            <li className={styles.tocSub}><span>5.11 React Hooks</span> <small>pg 176</small></li>
            <li className={styles.tocSub}><span>5.12 CSS modules In Reactjs</span> <small>pg 181</small></li>
            <li className={styles.tocSub}><span>5.13 Context API In React</span> <small>pg 182</small></li>
            <li className={styles.tocSub}><span>5.14 Basic npm commands</span> <small>pg 184</small></li>
            <li className={styles.tocSub}><span>5.15 Handling API Calls in React</span> <small>pg 187</small></li>
            <li className={styles.tocSub}><span>5.16 Debugging Techniques</span> <small>pg 190</small></li>

            <li className={styles.tocChapter}><strong>Chapter 6 (API)</strong></li>
            <li className={styles.tocSub}><span>6.1 Introduction to API</span> <small>pg 195</small></li>
            <li className={styles.tocSub}><span>6.2 HTTP Methods in APIs</span> <small>pg 195</small></li>
            <li className={styles.tocSub}><span>6.3 Common HTTP Status Codes</span> <small>pg 201</small></li>
            <li className={styles.tocSub}><span>6.4 API Authentication</span> <small>pg 201</small></li>
            <li className={styles.tocSub}><span>6.5 Headers and Payloads</span> <small>pg 206</small></li>
            <li className={styles.tocSub}><span>6.6 Getting API Response</span> <small>pg 207</small></li>
            <li className={styles.tocSub}><span>6.7 File uploading Via API</span> <small>pg 208</small></li>
            <li className={styles.tocSub}><span>6.8 Testing API In Frontend</span> <small>pg 209</small></li>
            <li className={styles.tocSub}><span>6.9 Payment gateway API</span> <small>pg 209</small></li>
            <li className={styles.tocSub}><span>6.10 Google Authentication</span> <small>pg 213</small></li>
            <li className={styles.tocSub}><span>6.11 Postman API Testing</span> <small>pg 214</small></li>
          </ul>
        </div>
      );

      // Page 6: Table of Contents - Part 6
      pages.push(
        <div className={styles.pageInner} key="toc6_mern">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 7 (VS Code Installation)</strong></li>
            <li className={styles.tocSub}><span>7.1. Introduction to VS Code</span> <small>pg 217</small></li>
            <li className={styles.tocSub}><span>7.2 Features of VS Code</span> <small>pg 218</small></li>
            <li className={styles.tocSub}><span>7.3 System Requirements</span> <small>pg 219</small></li>
            <li className={styles.tocSub}><span>7.4 Steps to Download VS Code</span> <small>pg 219</small></li>
            <li className={styles.tocSub}><span>7.5. Installing VS Code on Windows</span> <small>pg 221</small></li>
            <li className={styles.tocSub}><span>7.6. Installing on MacOS</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.7. Installing on Linux</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.8 VS Code Interface Overview</span> <small>pg 222</small></li>
            <li className={styles.tocSub}><span>7.9 Installing Useful Extensions</span> <small>pg 223</small></li>
            <li className={styles.tocSub}><span>7.10 React Router</span> <small>pg 224</small></li>
            <li className={styles.tocSub}><span>7.11 Creating Your First Project</span> <small>pg 225</small></li>

            <li className={styles.tocChapter}><strong>Chapter 8 (Node Js Installation)</strong></li>
            <li className={styles.tocSub}><span>8.1 Introduction to Nodejs</span> <small>pg 226</small></li>
            <li className={styles.tocSub}><span>8.2 Features of Nodejs</span> <small>pg 226</small></li>
            <li className={styles.tocSub}><span>8.3 System Requirements</span> <small>pg 227</small></li>
            <li className={styles.tocSub}><span>8.4 Downloading Node.js</span> <small>pg 227</small></li>
            <li className={styles.tocSub}><span>8.5 Installing Node.js on Windows</span> <small>pg 228</small></li>
            <li className={styles.tocSub}><span>8.6 Verifying the Installation</span> <small>pg 230</small></li>
            <li className={styles.tocSub}><span>8.7 Installing on macOS / Linux</span> <small>pg 231</small></li>
            <li className={styles.tocSub}><span>8.9 Creating First Node.js Program</span> <small>pg 231</small></li>
            <li className={styles.tocSub}><span>8.10 Installing Packages via NPM</span> <small>pg 232</small></li>
            <li className={styles.tocSub}><span>8.11 Advantages of Node.js</span> <small>pg 232</small></li>
            <li className={styles.tocSub}><span>8.12 Conclusion</span> <small>pg 233</small></li>

            <li className={styles.tocChapter}><strong>Chapter 9 (Git & GitHub)</strong></li>
            <li className={styles.tocSub}><span>9.1. Version Control Introduction</span> <small>pg 234</small></li>
            <li className={styles.tocSub}><span>9.2 Installing and Setting Up Git</span> <small>pg 237</small></li>
            <li className={styles.tocSub}><span>9.3 Git Basics</span> <small>pg 241</small></li>
            <li className={styles.tocSub}><span>9.4 Git Basic Commands</span> <small>pg 254</small></li>
            <li className={styles.tocSub}><span>9.5.Working with Git Files</span> <small>pg 258</small></li>
            <li className={styles.tocSub}><span>9.6 Branching in Git</span> <small>pg 262</small></li>
            <li className={styles.tocSub}><span>9.7. Merging and Conflict Resolution</span> <small>pg 266</small></li>
            <li className={styles.tocSub}><span>9.8 GitHub Basics</span> <small>pg 271</small></li>
            <li className={styles.tocSub}><span>9.9 Remote Repositories</span> <small>pg 278</small></li>
            <li className={styles.tocSub}><span>9.10 Collaboration with Github</span> <small>pg 282</small></li>
            <li className={styles.tocSub}><span>9.11 Advanced Git Concepts</span> <small>pg 289</small></li>
            <li className={styles.tocSub}><span>9.12 GitHub Features & Best Practices</span> <small>pg 293</small></li>
            <li className={styles.tocSub}><span>9.13 Real-World Projects</span> <small>pg 305</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR MEAN STACK BOOK (ID: 6)
    if (book.id === 6) {
      const pages = [];

      // Page 1: Chapters 1 & 2
      pages.push(
        <div className={styles.pageInner} key="toc1_mean">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1 (HTML)</strong></li>
            <li className={styles.tocSub}><span>1.1 Introduction</span> <small>pg 5</small></li>
            <li className={styles.tocSub}><span>1.2 Structure of HTML</span> <small>pg 6</small></li>
            <li className={styles.tocSub}><span>1.3 Semantic Tags</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>1.4 Text Formatting Tags</span> <small>pg 10</small></li>
            <li className={styles.tocSub}><span>1.5 Working with Hyperlinks</span> <small>pg 12</small></li>
            <li className={styles.tocSub}><span>1.6 HTML Lists</span> <small>pg 14</small></li>
            <li className={styles.tocSub}><span>1.7 HTML Form Elements</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.8 HTML Tables</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>1.9 Images and Multimedia</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>1.10 HTML Attributes</span> <small>pg 22</small></li>
            <li className={styles.tocSub}><span>1.11 Block vs Inline Elements</span> <small>pg 24</small></li>
            <li className={styles.tocSub}><span>1.12 HTML Entities & Special Characters</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>1.13 Meta Tags</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>1.14 Web Accessibility</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>1.15 Iframes & Embedding Content</span> <small>pg 32</small></li>
          </ul>
        </div>
      );

      // Page 2: Chapter 2 (CSS)
      pages.push(
        <div className={styles.pageInner} key="toc2_mean">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 2 (CSS)</strong></li>
            <li className={styles.tocSub}><span>2.1 CSS Introduction</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>2.2 CSS Selectors</span> <small>pg 38</small></li>
            <li className={styles.tocSub}><span>2.3 Colors & Backgrounds</span> <small>pg 40</small></li>
            <li className={styles.tocSub}><span>2.4 CSS Box Model</span> <small>pg 42</small></li>
            <li className={styles.tocSub}><span>2.5 Typography and Fonts</span> <small>pg 44</small></li>
            <li className={styles.tocSub}><span>2.6 CSS Units and Values</span> <small>pg 46</small></li>
            <li className={styles.tocSub}><span>2.7 Positioning</span> <small>pg 48</small></li>
            <li className={styles.tocSub}><span>2.8 Flexbox Layout</span> <small>pg 50</small></li>
            <li className={styles.tocSub}><span>2.9 CSS Grid Layout</span> <small>pg 52</small></li>
            <li className={styles.tocSub}><span>2.10 Pseudo-classes & Pseudo-elements</span> <small>pg 54</small></li>
            <li className={styles.tocSub}><span>2.11 CSS Transitions and Animations</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>2.12 Responsive Design & Media Queries</span> <small>pg 58</small></li>
            <li className={styles.tocSub}><span>2.13 CSS Variables</span> <small>pg 60</small></li>
            <li className={styles.tocSub}><span>2.14 CSS Specificity & Cascade</span> <small>pg 62</small></li>
            <li className={styles.tocSub}><span>2.15 CSS Frameworks Overview</span> <small>pg 64</small></li>
          </ul>
        </div>
      );

      // Page 3: Chapter 3 (JavaScript & TypeScript Essentials)
      pages.push(
        <div className={styles.pageInner} key="toc3_mean">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3 (JS & TS Essentials)</strong></li>
            <li className={styles.tocSub}><span>3.1 Modern JS Intro</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>3.2 Variables, Scope (let/const)</span> <small>pg 70</small></li>
            <li className={styles.tocSub}><span>3.3 Functions & Arrow Functions</span> <small>pg 72</small></li>
            <li className={styles.tocSub}><span>3.4 Arrays & Array Methods</span> <small>pg 74</small></li>
            <li className={styles.tocSub}><span>3.5 Objects & OOP JavaScript</span> <small>pg 76</small></li>
            <li className={styles.tocSub}><span>3.6 Destructuring & Spread/Rest</span> <small>pg 78</small></li>
            <li className={styles.tocSub}><span>3.7 Template Literals</span> <small>pg 80</small></li>
            <li className={styles.tocSub}><span>3.8 Promises & Async/Await</span> <small>pg 82</small></li>
            <li className={styles.tocSub}><span>3.9 Modules (Import/Export)</span> <small>pg 84</small></li>
            <li className={styles.tocSub}><span>3.10 Classes in JS</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>3.11 JSON Handling</span> <small>pg 88</small></li>
            <li className={styles.tocSub}><span>3.12 Error Handling</span> <small>pg 90</small></li>
            <li className={styles.tocSub}><span>3.13 Introduction to TS</span> <small>pg 92</small></li>
            <li className={styles.tocSub}><span>3.14 Types, Interfaces & Generics</span> <small>pg 94</small></li>
            <li className={styles.tocSub}><span>3.15 Setup Development Env</span> <small>pg 96</small></li>
          </ul>
        </div>
      );

      // Page 4: Chapter 4 & 5 (Node.js & Express.js)
      pages.push(
        <div className={styles.pageInner} key="toc4_mean">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4 (Node.js)</strong></li>
            <li className={styles.tocSub}><span>4.1 Intro to Node.js & Event Loop</span> <small>pg 102</small></li>
            <li className={styles.tocSub}><span>4.3 NPM & Installation</span> <small>pg 106</small></li>
            <li className={styles.tocSub}><span>4.4 Node.js Modules & File System</span> <small>pg 110</small></li>
            <li className={styles.tocSub}><span>4.9 Streams & Buffers</span> <small>pg 112</small></li>
            
            <li className={styles.tocChapter}><strong>Chapter 5 (Express.js)</strong></li>
            <li className={styles.tocSub}><span>5.1 Intro & App Setup</span> <small>pg 116</small></li>
            <li className={styles.tocSub}><span>5.3 Routing & Middleware</span> <small>pg 118</small></li>
            <li className={styles.tocSub}><span>5.6 Query & Route Parameters</span> <small>pg 120</small></li>
            <li className={styles.tocSub}><span>5.10 Body Parsing & Error Handling</span> <small>pg 122</small></li>
            <li className={styles.tocSub}><span>5.12 RESTful APIs with Express</span> <small>pg 124</small></li>
            <li className={styles.tocSub}><span>5.18 Hashing & JWT Authentication</span> <small>pg 126</small></li>
            <li className={styles.tocSub}><span>5.22 Protected Routes & Security</span> <small>pg 128</small></li>
          </ul>
        </div>
      );

      // Page 5: Chapter 6, 7 & 8 (MongoDB, REST APIs, Angular)
      pages.push(
        <div className={styles.pageInner} key="toc5_mean">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 6 (MongoDB)</strong></li>
            <li className={styles.tocSub}><span>6.1 MongoDB & CRUD operations</span> <small>pg 132</small></li>
            <li className={styles.tocSub}><span>6.7 Aggregations & Models</span> <small>pg 138</small></li>
            <li className={styles.tocSub}><span>6.11 Mongoose Schemas & ODM</span> <small>pg 140</small></li>
            
            <li className={styles.tocChapter}><strong>Chapter 7 (RESTful APIs with MEAN Backend)</strong></li>
            <li className={styles.tocSub}><span>7.1 connecting Express & Mongo</span> <small>pg 144</small></li>
            <li className={styles.tocSub}><span>7.4 Implementing CRUD APIs</span> <small>pg 146</small></li>
            <li className={styles.tocSub}><span>7.9 Swagger Documentation & Postman</span> <small>pg 148</small></li>

            <li className={styles.tocChapter}><strong>Chapter 8 (Angular)</strong></li>
            <li className={styles.tocSub}><span>8.1 Angular CLI & Components</span> <small>pg 152</small></li>
            <li className={styles.tocSub}><span>8.4 Data Binding & Directives</span> <small>pg 154</small></li>
            <li className={styles.tocSub}><span>8.7 DI, Services & Routing</span> <small>pg 156</small></li>
            <li className={styles.tocSub}><span>8.10 Forms & HttpClient API</span> <small>pg 158</small></li>
          </ul>
        </div>
      );

      // Page 6: Chapter 9 (Integrating the MEAN Stack)
      pages.push(
        <div className={styles.pageInner} key="toc6_mean">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 9 (Integrating MEAN Stack)</strong></li>
            <li className={styles.tocSub}><span>9.1 MEAN Architecture Overview</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>9.2 Connecting Angular to Express</span> <small>pg 164</small></li>
            <li className={styles.tocSub}><span>9.3 Environment & Proxy Config</span> <small>pg 166</small></li>
            <li className={styles.tocSub}><span>9.5 End-to-End JWT Auth Flow</span> <small>pg 168</small></li>
            <li className={styles.tocSub}><span>9.6 File Upload Integration</span> <small>pg 170</small></li>
            <li className={styles.tocSub}><span>9.7 Real-time with Socket.IO</span> <small>pg 172</small></li>
            <li className={styles.tocSub}><span>9.8 Building a CRUD App</span> <small>pg 174</small></li>
            <li className={styles.tocSub}><span>9.9 Error Handling Across Stack</span> <small>pg 176</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR PYTHON FULL STACK BOOK (ID: 7)
    if (book.id === 7) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_py">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 1 – HTML</strong></li>
            <li className={styles.tocSub}><span>1.1 Introduction</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.2 Structure of HTML</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>1.3 Semantic Tags</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>1.4 Text Formatting Tags</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>1.5 Hyperlinks</span> <small>pg 21</small></li>
            <li className={styles.tocSub}><span>1.6 Lists</span> <small>pg 23</small></li>
            <li className={styles.tocSub}><span>1.7 Form Elements</span> <small>pg 24</small></li>
            <li className={styles.tocSub}><span>1.8 Tables</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>1.9 Images and Multimedia</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>1.10 HTML Attributes</span> <small>pg 31</small></li>
            <li className={styles.tocSub}><span>1.11 Block vs Inline Elements</span> <small>pg 33</small></li>
            <li className={styles.tocSub}><span>1.12 Entities and Special Characters</span> <small>pg 35</small></li>
            <li className={styles.tocSub}><span>1.13 Meta Tags</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>1.14 Web Accessibility</span> <small>pg 38</small></li>
            <li className={styles.tocSub}><span>1.15 Iframes and Embedding Content</span> <small>pg 40</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 2 – CSS</strong></li>
            <li className={styles.tocSub}><span>2.1 Introduction</span> <small>pg 43</small></li>
            <li className={styles.tocSub}><span>2.2 Selectors</span> <small>pg 45</small></li>
            <li className={styles.tocSub}><span>2.3 Colors and Backgrounds</span> <small>pg 47</small></li>
            <li className={styles.tocSub}><span>2.4 Typography</span> <small>pg 49</small></li>
            <li className={styles.tocSub}><span>2.5 Units (px, rem, em, vh, vw)</span> <small>pg 52</small></li>
            <li className={styles.tocSub}><span>2.6 Positioning</span> <small>pg 55</small></li>
            <li className={styles.tocSub}><span>2.7 Display Property (Flex, Grid, etc.)</span> <small>pg 58</small></li>
            <li className={styles.tocSub}><span>2.8 Flexbox</span> <small>pg 61</small></li>
            <li className={styles.tocSub}><span>2.9 Grid Layout</span> <small>pg 64</small></li>
            <li className={styles.tocSub}><span>2.10 Media Queries</span> <small>pg 66</small></li>
            <li className={styles.tocSub}><span>2.11 Transitions and Transforms</span> <small>pg 69</small></li>
            <li className={styles.tocSub}><span>2.12 Keyframe Animation</span> <small>pg 71</small></li>
            <li className={styles.tocSub}><span>2.13 CSS Variables</span> <small>pg 74</small></li>
            <li className={styles.tocSub}><span>2.14 Z-Index and Stacking Context</span> <small>pg 76</small></li>
            <li className={styles.tocSub}><span>2.15 Filter Effects</span> <small>pg 79</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 3 – Tailwind CSS</strong></li>
            <li className={styles.tocSub}><span>3.1 Introduction</span> <small>pg 84</small></li>
            <li className={styles.tocSub}><span>3.2 Installation and Setup</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>3.3 Utility-First Fundamentals</span> <small>pg 89</small></li>
            <li className={styles.tocSub}><span>3.4 Typography Utilities</span> <small>pg 92</small></li>
            <li className={styles.tocSub}><span>3.5 Buttons and Interactive Elements</span> <small>pg 94</small></li>
            <li className={styles.tocSub}><span>3.6 Navbar and Responsive Toggle</span> <small>pg 97</small></li>
            <li className={styles.tocSub}><span>3.7 Cards and Containers</span> <small>pg 100</small></li>
            <li className={styles.tocSub}><span>3.8 Modals and Overlays</span> <small>pg 103</small></li>
            <li className={styles.tocSub}><span>3.9 Forms</span> <small>pg 105</small></li>
            <li className={styles.tocSub}><span>3.10 Tooltips and Popovers</span> <small>pg 108</small></li>
            <li className={styles.tocSub}><span>3.11 Alerts and Badges</span> <small>pg 110</small></li>
            <li className={styles.tocSub}><span>3.12 Carousel and Image Sliders</span> <small>pg 113</small></li>
            <li className={styles.tocSub}><span>3.13 Tables and List Groups</span> <small>pg 115</small></li>
            <li className={styles.tocSub}><span>3.14 Colors and Backgrounds</span> <small>pg 117</small></li>
            <li className={styles.tocSub}><span>3.15 Icons</span> <small>pg 119</small></li>
            <li className={styles.tocSub}><span>3.16 Z-Index and Layering</span> <small>pg 120</small></li>
            <li className={styles.tocSub}><span>3.17 Responsive Breakpoints</span> <small>pg 123</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 4 – JavaScript</strong></li>
            <li className={styles.tocSub}><span>4.1 Introduction</span> <small>pg 131</small></li>
            <li className={styles.tocSub}><span>4.2 Variables</span> <small>pg 132</small></li>
            <li className={styles.tocSub}><span>4.3 Data Types</span> <small>pg 133</small></li>
            <li className={styles.tocSub}><span>4.4 Operators</span> <small>pg 134</small></li>
            <li className={styles.tocSub}><span>4.5 Conditional Statements</span> <small>pg 136</small></li>
            <li className={styles.tocSub}><span>4.6 Loops</span> <small>pg 138</small></li>
            <li className={styles.tocSub}><span>4.7 Functions</span> <small>pg 139</small></li>
            <li className={styles.tocSub}><span>4.8 Objects and Array Methods</span> <small>pg 141</small></li>
            <li className={styles.tocSub}><span>4.9 Display Objects and Constructors</span> <small>pg 143</small></li>
            <li className={styles.tocSub}><span>4.10 Events</span> <small>pg 145</small></li>
            <li className={styles.tocSub}><span>4.11 String Methods</span> <small>pg 147</small></li>
            <li className={styles.tocSub}><span>4.12 Array Methods (find, map, filter)</span> <small>pg 148</small></li>
            <li className={styles.tocSub}><span>4.13 DOM Manipulation</span> <small>pg 150</small></li>
            <li className={styles.tocSub}><span>4.14 Async / Await</span> <small>pg 152</small></li>
            <li className={styles.tocSub}><span>4.15 Fetch API</span> <small>pg 154</small></li>
            <li className={styles.tocSub}><span>4.16 Arrow Functions and Modern Syntax</span> <small>pg 156</small></li>
            <li className={styles.tocSub}><span>4.17 JSON Data Manipulation</span> <small>pg 158</small></li>
            <li className={styles.tocSub}><span>4.18 Debugging & Console Methods</span> <small>pg 162</small></li>
            <li className={styles.tocSub}><span>4.19 AJAX</span> <small>pg 163</small></li>
            <li className={styles.tocSub}><span>4.20 JSON vs JS</span> <small>pg 171</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 5 – React JS</strong></li>
            <li className={styles.tocSub}><span>5.1 Introduction to React</span> <small>pg 177</small></li>
            <li className={styles.tocSub}><span>5.2 Virtual DOM</span> <small>pg 178</small></li>
            <li className={styles.tocSub}><span>5.3 JSX Syntax and Rules</span> <small>pg 179</small></li>
            <li className={styles.tocSub}><span>5.4 Components</span> <small>pg 180</small></li>
            <li className={styles.tocSub}><span>5.5 Props and State</span> <small>pg 182</small></li>
            <li className={styles.tocSub}><span>5.6 Events</span> <small>pg 184</small></li>
            <li className={styles.tocSub}><span>5.7 Conditional Rendering</span> <small>pg 185</small></li>
            <li className={styles.tocSub}><span>5.8 Lists and Keys</span> <small>pg 188</small></li>
            <li className={styles.tocSub}><span>5.9 Forms</span> <small>pg 189</small></li>
            <li className={styles.tocSub}><span>5.10 React Router</span> <small>pg 190</small></li>
            <li className={styles.tocSub}><span>5.11 Hooks</span> <small>pg 193</small></li>
            <li className={styles.tocSub}><span>5.12 CSS Modules</span> <small>pg 198</small></li>
            <li className={styles.tocSub}><span>5.13 Context API</span> <small>pg 200</small></li>
            <li className={styles.tocSub}><span>5.14 Basic npm Commands</span> <small>pg 202</small></li>
            <li className={styles.tocSub}><span>5.15 Handling API Calls</span> <small>pg 205</small></li>
            <li className={styles.tocSub}><span>5.16 Additional Concepts</span> <small>pg 208</small></li>
          </ul>
        </div>
      );

      // Page 6: Table of Contents - Part 6
      pages.push(
        <div className={styles.pageInner} key="toc6_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 6 – Python & FastAPI Basics</strong></li>
            <li className={styles.tocSub}><span>6.1 Why Python for Backend</span> <small>pg 213</small></li>
            <li className={styles.tocSub}><span>6.2 Variables, Data Types & Operators</span> <small>pg 215</small></li>
            <li className={styles.tocSub}><span>6.3 Control Flow: Loops & Conditionals</span> <small>pg 217</small></li>
            <li className={styles.tocSub}><span>6.4 Functions and Modules</span> <small>pg 219</small></li>
            <li className={styles.tocSub}><span>6.5 Object-Oriented Programming</span> <small>pg 221</small></li>
            <li className={styles.tocSub}><span>6.6 Files, Exceptions & Virtual Env</span> <small>pg 223</small></li>
            <li className={styles.tocSub}><span>6.7 Introduction to FastAPI</span> <small>pg 225</small></li>
            <li className={styles.tocSub}><span>6.8 Installing FastAPI & First App</span> <small>pg 227</small></li>
            <li className={styles.tocSub}><span>6.9 Path Operations, Path & Query Params</span> <small>pg 229</small></li>
            <li className={styles.tocSub}><span>6.10 Pydantic Models & Validation</span> <small>pg 231</small></li>
          </ul>
        </div>
      );

      // Page 7: Table of Contents - Part 7
      pages.push(
        <div className={styles.pageInner} key="toc7_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 7 – FastAPI for Backend</strong></li>
            <li className={styles.tocSub}><span>7.1 Structuring FastAPI Projects</span> <small>pg 236</small></li>
            <li className={styles.tocSub}><span>7.2 Request Body & Response Models</span> <small>pg 238</small></li>
            <li className={styles.tocSub}><span>7.3 Connecting PostgreSQL & SQLAlchemy</span> <small>pg 240</small></li>
            <li className={styles.tocSub}><span>7.4 Building CRUD APIs</span> <small>pg 243</small></li>
            <li className={styles.tocSub}><span>7.5 Dependency Injection</span> <small>pg 246</small></li>
            <li className={styles.tocSub}><span>7.6 Middleware & CORS Config</span> <small>pg 248</small></li>
            <li className={styles.tocSub}><span>7.7 Exception Handling & Custom Errors</span> <small>pg 250</small></li>
            <li className={styles.tocSub}><span>7.8 File Uploads & Background Tasks</span> <small>pg 252</small></li>
            <li className={styles.tocSub}><span>7.9 Swagger & OpenAPI Documentation</span> <small>pg 254</small></li>

            <li className={styles.tocChapter}><strong>Chapter 8 – Auth & Authorization</strong></li>
            <li className={styles.tocSub}><span>8.1 Authentication vs Authorization</span> <small>pg 259</small></li>
            <li className={styles.tocSub}><span>8.2 Hashing Passwords (Passlib/Bcrypt)</span> <small>pg 261</small></li>
            <li className={styles.tocSub}><span>8.3 JWT (JSON Web Tokens)</span> <small>pg 263</small></li>
            <li className={styles.tocSub}><span>8.4 Signup and Login APIs</span> <small>pg 265</small></li>
            <li className={styles.tocSub}><span>8.5 OAuth2 & Protected Routes</span> <small>pg 268</small></li>
            <li className={styles.tocSub}><span>8.6 Role-Based Access Control</span> <small>pg 270</small></li>
            <li className={styles.tocSub}><span>8.7 Refresh Tokens & Expiry</span> <small>pg 272</small></li>
            <li className={styles.tocSub}><span>8.8 Security Best Practices</span> <small>pg 274</small></li>
          </ul>
        </div>
      );

      // Page 8: Table of Contents - Part 8
      pages.push(
        <div className={styles.pageInner} key="toc8_py">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>Chapter 9 – Fullstack Integration</strong></li>
            <li className={styles.tocSub}><span>9.1 Overview of Fullstack Integration</span> <small>pg 279</small></li>
            <li className={styles.tocSub}><span>9.2 Setting Up PostgreSQL</span> <small>pg 281</small></li>
            <li className={styles.tocSub}><span>9.3 Designing the Database Schema</span> <small>pg 283</small></li>
            <li className={styles.tocSub}><span>9.4 End-to-End React, FastAPI & Postgres</span> <small>pg 285</small></li>
            <li className={styles.tocSub}><span>9.5 API Calls with Axios</span> <small>pg 287</small></li>
            <li className={styles.tocSub}><span>9.6 Handling CORS Issues</span> <small>pg 289</small></li>
            <li className={styles.tocSub}><span>9.7 Storing JWT in React</span> <small>pg 291</small></li>
            <li className={styles.tocSub}><span>9.8 Protected Routes & Auth Guards</span> <small>pg 293</small></li>
            <li className={styles.tocSub}><span>9.9 Environment Variables Setup</span> <small>pg 295</small></li>
            <li className={styles.tocSub}><span>9.10 Connecting File Uploads</span> <small>pg 297</small></li>
            <li className={styles.tocSub}><span>9.11 Error Handling Across Stack</span> <small>pg 299</small></li>
            <li className={styles.tocSub}><span>9.12 Deployment & Hosting</span> <small>pg 301</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // CUSTOM CONTENT FOR HR TRAINING BOOK (ID: 10)
    if (book.id === 10) {
      const pages = [];

      // Page 1: Table of Contents - Part 1
      pages.push(
        <div className={styles.pageInner} key="toc1_hr">
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>1. Introduction to Human Resources</strong></li>
            <li className={styles.tocSub}><span>Evolution of Human Resources</span> <small>pg 3</small></li>
            <li className={styles.tocSub}><span>Why HR?</span> <small>pg 4</small></li>
            <li className={styles.tocSub}><span>Importance of HRM</span> <small>pg 5</small></li>

            <li className={styles.tocChapter}><strong>2. Organization Structure & Behavior</strong></li>
            <li className={styles.tocSub}><span>Definitions of Org structure</span> <small>pg 7</small></li>
            <li className={styles.tocSub}><span>Types of Org Structure</span> <small>pg 8</small></li>
            <li className={styles.tocSub}><span>Definition of Org Behaviors</span> <small>pg 10</small></li>

            <li className={styles.tocChapter}><strong>3. Definition of Employee Life cycle (ELC)</strong></li>
            <li className={styles.tocSub}><span>Stages of ELC</span> <small>pg 12</small></li>
            <li className={styles.tocSub}><span>Trends in employee life cycle tools</span> <small>pg 14</small></li>

            <li className={styles.tocChapter}><strong>4. Recruitment management</strong></li>
            <li className={styles.tocSub}><span>Screening & Sourcing</span> <small>pg 16</small></li>
            <li className={styles.tocSub}><span>How to perform resume & phone Screens</span> <small>pg 18</small></li>
            <li className={styles.tocSub}><span>How to build job description</span> <small>pg 20</small></li>
            <li className={styles.tocSub}><span>Schedule interview</span> <small>pg 22</small></li>
          </ul>
        </div>
      );

      // Page 2: Table of Contents - Part 2
      pages.push(
        <div className={styles.pageInner} key="toc2_hr">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>5. Talent Acquisition</strong></li>
            <li className={styles.tocSub}><span>Talent Acquisition</span> <small>pg 24</small></li>
            <li className={styles.tocSub}><span>Value proposition</span> <small>pg 26</small></li>
            <li className={styles.tocSub}><span>Employer Branding</span> <small>pg 28</small></li>
            <li className={styles.tocSub}><span>Structure of an effective recruitment process</span> <small>pg 30</small></li>
            <li className={styles.tocSub}><span>Alignment recruitment with Organization success</span> <small>pg 32</small></li>
            <li className={styles.tocSub}><span>Job posting & analysis</span> <small>pg 34</small></li>
            <li className={styles.tocSub}><span>Applicant tracking system</span> <small>pg 36</small></li>
            <li className={styles.tocSub}><span>Into-Job portals (Naukri, LinkedIn)</span> <small>pg 38</small></li>
            <li className={styles.tocSub}><span>Recruitment Tracker</span> <small>pg 40</small></li>
          </ul>
        </div>
      );

      // Page 3: Table of Contents - Part 3
      pages.push(
        <div className={styles.pageInner} key="toc3_hr">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>6. Training & development</strong></li>
            <li className={styles.tocSub}><span>Introduction, Orientation & on boarding</span> <small>pg 42</small></li>
            <li className={styles.tocSub}><span>HR Manual</span> <small>pg 44</small></li>
            <li className={styles.tocSub}><span>Training need analysis</span> <small>pg 46</small></li>
            <li className={styles.tocSub}><span>Training calendar preparation</span> <small>pg 48</small></li>

            <li className={styles.tocChapter}><strong>7. Employee Engagement</strong></li>
            <li className={styles.tocSub}><span>Why is employee engagement important</span> <small>pg 50</small></li>
            <li className={styles.tocSub}><span>Motivation theories</span> <small>pg 52</small></li>

            <li className={styles.tocChapter}><strong>8. Reward management</strong></li>
            <li className={styles.tocSub}><span>Reward management</span> <small>pg 54</small></li>
            <li className={styles.tocSub}><span>Compensation & benefits</span> <small>pg 56</small></li>
            <li className={styles.tocSub}><span>Employee wellbeing</span> <small>pg 58</small></li>
          </ul>
        </div>
      );

      // Page 4: Table of Contents - Part 4
      pages.push(
        <div className={styles.pageInner} key="toc4_hr">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>9. Performance management System</strong></li>
            <li className={styles.tocSub}><span>Performance management System</span> <small>pg 60</small></li>
            <li className={styles.tocSub}><span>Performance management policy</span> <small>pg 62</small></li>
            <li className={styles.tocSub}><span>How to set goals for Employee: Annual Goal Setting procedure</span> <small>pg 64</small></li>
            <li className={styles.tocSub}><span>Performance Appraisal System</span> <small>pg 66</small></li>
            <li className={styles.tocSub}><span>Performance review & Appraisal forms (Manager & Employee)</span> <small>pg 68</small></li>
            <li className={styles.tocSub}><span>Competency Mapping</span> <small>pg 70</small></li>

            <li className={styles.tocChapter}><strong>10. Employment Law compliance & Payroll accounting</strong></li>
            <li className={styles.tocSub}><span>Employment Law compliance & Payroll accounting</span> <small>pg 72</small></li>
            <li className={styles.tocSub}><span>Employment contracts & termination</span> <small>pg 74</small></li>
            <li className={styles.tocSub}><span>Discrimination of equal employment opportunity</span> <small>pg 76</small></li>
            <li className={styles.tocSub}><span>Prevention of Sexual harassment (POSH Policy)</span> <small>pg 78</small></li>
            <li className={styles.tocSub}><span>How to calculate Salary using excel</span> <small>pg 80</small></li>
            <li className={styles.tocSub}><span>Payroll Software</span> <small>pg 82</small></li>
            <li className={styles.tocSub}><span>Income tax calculation (Form16)</span> <small>pg 84</small></li>
          </ul>
        </div>
      );

      // Page 5: Table of Contents - Part 5
      pages.push(
        <div className={styles.pageInner} key="toc5_hr">
          <h3 className={styles.tocTitle}>Table of Contents (Cont.)</h3>
          <div className={styles.tocDivider} style={{ background: book.color }} />
          <ul className={styles.tocList}>
            <li className={styles.tocChapter}><strong>11. Staff Management</strong></li>
            <li className={styles.tocSub}><span>Staff Management</span> <small>pg 86</small></li>
            <li className={styles.tocSub}><span>On boarding & induction</span> <small>pg 88</small></li>
            <li className={styles.tocSub}><span>Joining formalities</span> <small>pg 90</small></li>
            <li className={styles.tocSub}><span>Drafting provisional Offer Letter</span> <small>pg 92</small></li>
            <li className={styles.tocSub}><span>Exit formalities & survey</span> <small>pg 94</small></li>

            <li className={styles.tocChapter}><strong>12. Research methods & Analysis</strong></li>
            <li className={styles.tocSub}><span>Data collection & Analysis methods</span> <small>pg 96</small></li>
            <li className={styles.tocSub}><span>HR metrics: Data Driven Decision making</span> <small>pg 98</small></li>

            <li className={styles.tocChapter}><strong>13. Case Study</strong></li>
            <li className={styles.tocSub}><span>Applying HR concept to real time world scenarios</span> <small>pg 100</small></li>
            <li className={styles.tocSub}><span>Developing practical solutions & recommendations</span> <small>pg 102</small></li>

            <li className={styles.tocChapter}><strong>14. Highlights of the Advanced</strong></li>
            <li className={styles.tocSub}><span>Certified Human Resource Generalist (CHRG)</span> <small>pg 104</small></li>
            <li className={styles.tocSub}><span>Payroll Software</span> <small>pg 106</small></li>
            <li className={styles.tocSub}><span>Professional Resume building</span> <small>pg 108</small></li>
            <li className={styles.tocSub}><span>Professional LinkedIn profile writing</span> <small>pg 110</small></li>
          </ul>
        </div>
      );

      return pages;
    }

    // FALLBACK RETURN FOR OTHER BOOKS (PREVENTS CRASHES)
    const fallbackPages = [];
    fallbackPages.push(
      <div className={styles.pageInner} key="fallback_title">
        <h3 className={styles.tocTitle}>{book.title} Outline</h3>
        <div className={styles.tocDivider} style={{ background: book.color }} />
        <ul className={styles.tocList}>
          {book.chapters.map((ch, i) => (
            <li key={i} className={styles.tocChapter} style={{ margin: "12px 0" }}>
              <strong>{ch}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
    return fallbackPages;
  }, [book]);
  const handleNext = () => { if (currentPage < bookPages.length - 2) { setDirection(1); setCurrentPage(p => p + 2); } };
  const handlePrev = () => { if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 2); } };

  const openPreview = () => { setIsPreviewOpen(true); };
  const closePreview = () => setIsPreviewOpen(false);

  useEffect(() => {
    const handleMove = (e) => {
      const glow = document.getElementById('mouse-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!book) return (
    <div className={styles.notFound}>
      <h2>Book not found</h2>
      <Link href="/book" className={styles.backLink}>← Back to Library</Link>
    </div>
  );

  return (
    <div className={styles.pageWrapper} suppressHydrationWarning>
      <div className={styles.blob1} style={{ background: `${book.imgColor}25` }} />
      <div className={styles.blob2} style={{ background: `${book.color}18` }} />
      <div className={styles.mouseGlow} id="mouse-glow" />
      <Particles color={book.imgColor} count={20} />

      <div className={styles.container}>
        {/* NAV */}
        <nav className={styles.nav}>
          <motion.button onClick={() => router.back()} className={styles.backBtn} whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
            <ArrowLeft size={18} /><span>Back to Library</span>
          </motion.button>
        </nav>

        {/* HERO */}
        <section className={styles.hero}>
          <Book3D book={book} width={isMobile ? 180 : 300} height={isMobile ? 250 : 420} />
          <motion.div className={styles.heroInfo} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}>
            <span className={styles.categoryBadge} style={{ background: `${book.color}20`, color: book.color }}>{book.category}</span>
            <h1 className={styles.mainTitle}>{book.title}</h1>
            <h2 className={styles.mainSubtitle}>{book.subtitle}</h2>

            <p className={styles.description}>{book.desc}</p>
            <div className={styles.actionRow}>
              <motion.button className={styles.previewBtn} onClick={openPreview} whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
                <Eye size={18} /><span>Preview</span>
              </motion.button>
              <motion.button
                className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ''}`}
                onClick={() => setWishlisted(w => !w)}
                whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
              >
                <Heart size={18} fill={wishlisted ? '#e74c3c' : 'none'} color={wishlisted ? '#e74c3c' : '#8a6a4a'} />
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* STATS */}
        <section className={styles.statsGrid}>
          {[
            { icon: <BookOpen size={22} />, val: book.pages, lab: 'Pages' },
            { icon: <Layers size={22} />, val: book.Chapter, lab: 'Chapters' },
            { icon: <Globe size={22} />, val: 'English', lab: 'Language' },
            { icon: <Calendar size={22} />, val: '2026', lab: 'Published' },
          ].map((s, i) => (
            <motion.div key={i} className={styles.statCard}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.25, duration: 0.4, ease: "easeOut" }} whileHover={{ y: -5 }}>
              <div className={styles.statIcon} style={{ color: book.color }}>{s.icon}</div>
              <div className={styles.statVal}>{s.val}</div>
              <div className={styles.statLab}>{s.lab}</div>
            </motion.div>
          ))}
        </section>

        {/* QUOTE */}
        <section className={styles.quoteSection}>
          <motion.div className={styles.bigQuote}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}>
            <Quote size={40} className={styles.quoteIconLarge} style={{ color: book.color }} />
            <p className={styles.quoteText}>
              <Typewriter text={`"Every page turned is a step closer to mastery. ${book.title} is your companion in the journey of lifelong learning."`} />
            </p>
            <span className={styles.quoteAuthor}>— Softnova Academy</span>
          </motion.div>
        </section>



        {/* CHAPTERS */}
        <section className={styles.chaptersSection}>
          <div className={styles.sectionHeader}>
            <h3>Contents Index</h3><p>Master the curriculum step-by-step</p>
          </div>
          <div className={styles.chaptersGrid}>
            {book.chapters.map((ch, i) => (
              <motion.div key={i} className={styles.chapterCard}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02 + 0.05, 0.3), duration: 0.35, ease: "easeOut" }} whileHover={{ x: 8 }}>
                <div className={styles.chapterNum} style={{ background: `${book.color}18`, color: book.color }}>{i + 1}</div>
                <div className={styles.chapterTitle}>{ch}</div>

              </motion.div>
            ))}
          </div>
        </section>



        {/* RECOMMENDATIONS */}
        <section className={styles.recoSection}>
          <div className={styles.sectionHeader}>
            <h3>You Might Also Like</h3><p>Handpicked just for you</p>
          </div>
          <div className={styles.recoGrid}>
            {recommendations.map((rb, i) => (
              <motion.div key={rb.id} className={styles.recoCard}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 + 0.05, duration: 0.4, ease: "easeOut" }} whileHover={{ y: -5 }}
                onClick={() => router.push(`/book/${rb.id}`)}>
                <div className={styles.recoBookWrap}>
                  <div
                    className={styles.recoBook}
                    style={{
                      borderLeft: `8px solid ${rb.imgColor}`,
                      backgroundImage: `url(${rb.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!rb.coverImage && (
                      <>
                        <div className={styles.recoTitle}>{rb.title}</div>
                        <div className={styles.recoSub}>{rb.subtitle}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.recoInfo}>
                  <span className={styles.recoCat} style={{ color: rb.color }}>{rb.category}</span>
                  <div className={styles.recoName}>{rb.title}</div>
                  <div className={styles.recoAuthor}>{rb.author}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ══ 3D BOOK PREVIEW ══ */}
      <BookPreview3D
        book={book}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        bookPages={bookPages}
      />
    </div>
  );
}
