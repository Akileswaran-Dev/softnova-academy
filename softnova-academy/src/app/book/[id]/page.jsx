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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-150, 150], [14, -14]), { stiffness: 200, damping: 30 });
  const rY = useSpring(useTransform(mx, [-150, 150], [-14, 14]), { stiffness: 200, damping: 30 });

  const onMove = useCallback((e) => {
    if (!animate3D) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [animate3D, mx, my]);
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div ref={ref} className={`${styles.bookWrap} ${className || ''}`}
      onMouseMove={onMove} onMouseLeave={onLeave} style={{ height: height + 60 }}>
      <motion.div
        className={styles.book3D}
        style={{ width, height, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, rotateY: -35, y: 30 }}
        animate={floating
          ? { opacity: 1, rotateY: 0, y: [0, -16, 0] }
          : { opacity: 1, rotateY: 0, y: 0 }}
        transition={floating
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
        animate={floating ? { opacity: [0.25, 0.45, 0.25], scaleX: [1, 1.08, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {floating && (
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
        <div className={styles.pageInner} key="toc2_fs">
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
        <div className={styles.pageInner} key="toc3_fs">
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
        <div className={styles.pageInner} key="toc4_fs">
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
        <div className={styles.pageInner} key="toc5_fs">
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
        <div className={styles.pageInner} key="toc6_fs">
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

    // CUSTOM CONTENT FOR HR TRAINING BOOK (ID: 6)
    if (book.id === 6) {
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

      // Page 6: Summary / End
      pages.push(
        <div className={styles.pageInner} key="end_hr">
          <div className={styles.endSection}>
            <div className={styles.endLogo}>SN</div>
            <h2 className={styles.endTitle}>Next Steps</h2>
            <p className={styles.endText}>Ready to start your journey? Join Softnova Academy and unlock the full potential of this course.</p>
            <div className={styles.endDivider} style={{ background: book.color }} />
            <div className={styles.endPage}>~ END OF PREVIEW ~</div>
          </div>
        </div>
      );

      return pages;
    }
    //   <div className={styles.pageInner}>
    //     <div className={styles.pageImgWrap}>
    //       <img src={book.coverImage} alt={book.title} className={styles.pageImg} />
    //     </div>
    //     <h2 className={styles.bookMainTitle}>{book.title}</h2>
    //     <p className={styles.bookMainSub}>{book.subtitle}</p>
    //     <div className={styles.brandTag}>SOFTNOVA ACADEMY EDITION</div>
    //   </div>
    // );

    // DEFAULT FALLBACK CONTENT
    const pages = [];

    // Page 1: Cover Page


    // Page 2: Table of Contents
    pages.push(
      <div className={styles.pageInner}>
        <h3 className={styles.tocTitle}>Table of Contents</h3>
        <div className={styles.tocDivider} style={{ background: book.color }} />
        <ul className={styles.tocList}>
          <li><span>01. Introduction</span> <small>pg 03</small></li>
          {book.chapters?.slice(0, 5).map((ch, i) => (
            <li key={i}><span>{i + 2 < 10 ? `0${i + 2}` : i + 2}. {ch}</span> <small>pg {i * 10 + 15}</small></li>
          ))}
        </ul>
      </div>
    );

    // Page 3: Introduction
    // pages.push(
    //   <div className={styles.pageInner}>
    //     <h3 className={styles.contentHeading}>Introduction</h3>
    //     <p className={styles.contentText}>{book.desc}</p>
    //     <div className={styles.quoteBlock}>
    //       <Quote size={16} />
    //       <p>"The best way to predict the future is to create it."</p>
    //     </div>
    //     <p className={styles.contentText}>This masterclass is designed to take you from foundational concepts to professional mastery in <em>{book.category}</em>.</p>
    //   </div>
    // );

    // Page 4: Visual Concept
    pages.push(
      <div className={styles.pageInner}>
        <div className={styles.pageImgWrapSmall}>
          <img src={book.coverImage} alt="Illustration" className={styles.pageImg} />
        </div>
        <h4 className={styles.contentSubheading}>Visual Mastery</h4>
        <p className={styles.contentText}>Modern design is not just about how it looks, but how it works. In this chapter, we explore the intersection of aesthetics and functionality.</p>
        <ul className={styles.topicList}>
          <li>Grid Systems & Proportions</li>
          <li>Color Psychology in {book.category}</li>
          <li>Typography Hierarchies</li>
        </ul>
      </div>
    );

    // Page 5: Deep Dive
    // pages.push(
    //   <div className={styles.pageInner}>
    //     <h3 className={styles.contentHeading}>Core Principles</h3>
    //     <p className={styles.contentText}>Success in <strong>{book.title}</strong> requires a deep understanding of core mechanics. We break down complex systems into digestible modules.</p>
    //     <h4 className={styles.contentSubheading}>Technical Standards</h4>
    //     <p className={styles.contentText}>We follow industry-standard best practices used by top companies worldwide, ensuring your skills are immediately applicable.</p>
    //   </div>
    // );

    // Page 6: Summary / End
    pages.push(
      <div className={styles.pageInner}>
        <div className={styles.endSection}>
          <div className={styles.endLogo}>SN</div>
          <h2 className={styles.endTitle}>Next Steps</h2>
          <p className={styles.endText}>Ready to start your journey? Join Softnova Academy and unlock the full potential of this course.</p>
          <div className={styles.endDivider} style={{ background: book.color }} />
          <div className={styles.endPage}>~ END OF PREVIEW ~</div>
        </div>
      </div>
    );

    return pages;
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
    <div className={styles.pageWrapper}>
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
          <Book3D book={book} />
          <motion.div className={styles.heroInfo} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
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
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }} whileHover={{ y: -5 }}>
              <div className={styles.statIcon} style={{ color: book.color }}>{s.icon}</div>
              <div className={styles.statVal}>{s.val}</div>
              <div className={styles.statLab}>{s.lab}</div>
            </motion.div>
          ))}
        </section>

        {/* QUOTE */}
        <section className={styles.quoteSection}>
          <motion.div className={styles.bigQuote}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
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
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 + 0.6 }} whileHover={{ x: 8 }}>
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
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.02 }}
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
