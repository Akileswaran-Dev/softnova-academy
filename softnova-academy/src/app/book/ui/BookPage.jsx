"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Search,
  LayoutGrid,
  Palette,
  Smartphone,
  Code,
  Monitor,
  Layers,
  Lightbulb,
  FileText,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import styles from './BookPage.module.css';
import { BOOKS } from '../data/books';

const CATEGORIES = [
  { id: 'All', name: 'All Resources', icon: <LayoutGrid size={18} /> },
  { id: 'Design', name: 'Design', icon: <Palette size={18} /> },
  { id: 'UI/UX', name: 'UI/UX', icon: <Smartphone size={18} /> },
  { id: 'Development', name: 'Development', icon: <Code size={18} /> },
  { id: 'Front-end', name: 'Front-end', icon: <Monitor size={18} /> },
  { id: 'Full Stack', name: 'Full Stack', icon: <Layers size={18} /> }
];

const getBookLevel = (bookId) => {
  if ([1, 9, 10].includes(bookId)) return 'Beginner';
  if ([2, 3, 8].includes(bookId)) return 'Intermediate';
  return 'Advanced';
};

const getDisplayTitle = (book) => {
  if (book.title === 'Web Design') return 'Web Design For Beginners';
  if (book.title === 'UI/UX') return 'UI/UX Design';
  if (book.title === 'Front-end') return 'Front-end Development';
  if (book.title === 'Full Stack') return 'Full Stack Development';
  return `${book.title} ${book.subtitle}`;
};

const matchesCategory = (book, selectedCategory) => {
  if (selectedCategory === 'All') return true;
  const categoryLower = selectedCategory.toLowerCase();
  const titleLower = book.title.toLowerCase();
  const bookCategoryLower = book.category.toLowerCase();

  if (categoryLower === 'design') {
    return bookCategoryLower === 'design' || titleLower.includes('design');
  }
  if (categoryLower === 'ui/ux') {
    return titleLower.includes('ui') || titleLower.includes('ux');
  }
  if (categoryLower === 'development') {
    return bookCategoryLower === 'development' || titleLower.includes('front-end') || titleLower.includes('stack') || titleLower.includes('python');
  }
  if (categoryLower === 'front-end') {
    return titleLower.includes('front-end') || titleLower.includes('mern') || titleLower.includes('mean');
  }
  if (categoryLower === 'full-stack' || categoryLower === 'full stack') {
    return titleLower.includes('full stack') || titleLower.includes('mern') || titleLower.includes('mean') || titleLower.includes('python');
  }
  return bookCategoryLower === categoryLower;
};

const BookPage = () => {
  // Hero Carousel State
  const HERO_BOOKS = BOOKS.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_BOOKS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setActiveIndex((i) => (i - 1 + HERO_BOOKS.length) % HERO_BOOKS.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % HERO_BOOKS.length);

  const activeItem = HERO_BOOKS[activeIndex];

  // Dashboard state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on category and search term
  const filteredBooks = BOOKS.filter((book) => {
    const matchesCat = matchesCategory(book, selectedCategory);
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.subtitle && book.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className={styles.section} suppressHydrationWarning>

      {/* 3D THEATER HERO CAROUSEL */}
      <div className={styles.theaterContainer}>
        {/* Soft background ambient light */}
        <div className={styles.ambientGlow} style={{ background: `radial-gradient(circle, ${activeItem.color}33 0%, transparent 70%)` }} />

        {/* Header Text Section */}
        <div className={styles.theaterHeader}>
          <span className={styles.theaterBadge} style={{ color: activeItem.color, borderColor: `${activeItem.color}33`, background: `${activeItem.color}11` }}>
            SOFTNOVA LIBRARY
          </span>
          <h1 className={styles.theaterTitle}>
            Explore Our Library, <br />
            <span className={styles.gradientTitle} style={{ color: activeItem.color }}>Supercharge Your Skills</span>
          </h1>
          <p className={styles.theaterSubtitle}>
            All-in-one resource center to learn, design, and master modern technologies — faster and smarter.
          </p>
        </div>

        {/* Curved Cover Shelf */}
        <div className={styles.carouselNav}>
          {/* Prev Button */}
          <button
            className={`${styles.carouselBtn} ${styles.prevBtn}`}
            onClick={goPrev}
            style={{ '--active-color': activeItem.color }}
            aria-label="Previous book"
          >
            <ChevronLeft size={22} />
          </button>

          <div className={styles.curveShelfWrapper}>
            <div className={styles.curveShelf}>
              {HERO_BOOKS.map((book, idx) => {
                const isCenter = idx === activeIndex;
                let diff = idx - activeIndex;
                if (diff < -2) diff += 5;
                else if (diff > 2) diff -= 5;

                let rotateY = 0, translateX = 0, translateZ = 0, scale = 1;
                let zIndex = 10 - Math.abs(diff);
                let opacity = 1;

                if (diff === 0) {
                  rotateY = 0; translateX = 0; translateZ = 80; scale = 1.15;
                } else if (diff < 0) {
                  rotateY = 25 + (diff + 1) * -5;
                  translateX = diff * 175 - 15;
                  translateZ = 80 - Math.abs(diff) * 40;
                  scale = 0.95 + diff * 0.05;
                  opacity = 0.9 + diff * 0.2;
                } else {
                  rotateY = -25 + (diff - 1) * 5;
                  translateX = diff * 175 + 15;
                  translateZ = 80 - Math.abs(diff) * 40;
                  scale = 0.95 - diff * 0.05;
                  opacity = 0.9 - diff * 0.2;
                }

                return (
                  <motion.div
                    key={book.id}
                    className={`${styles.shelfCard} ${isCenter ? styles.shelfCardActive : ''}`}
                    animate={{ x: translateX, z: translateZ, rotateY, scale, opacity }}
                    whileHover={{ y: -12, scale: isCenter ? 1.20 : scale * 1.08, z: translateZ + 15 }}
                    transition={{ type: "spring", stiffness: 150, damping: 22 }}
                    style={{ zIndex, transformStyle: 'preserve-3d' }}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div
                      className={styles.shelfCardCover}
                      style={{
                        borderColor: isCenter ? book.color : 'rgba(255,255,255,0.08)',
                        boxShadow: isCenter ? `0 20px 40px ${book.color}25` : '0 10px 20px rgba(0,0,0,0.15)'
                      }}
                    >
                      <div
                        className={styles.shelfCardImage}
                        style={{
                          backgroundImage: `url(${book.coverImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderLeft: `6px solid ${book.color}`
                        }}
                      >
                        {!book.coverImage && (
                          <div className={styles.fallbackShelfText}>
                            <h4>{book.title}</h4>
                            <p>{book.subtitle}</p>
                          </div>
                        )}
                        <div className={styles.shelfCardOverlay} />
                        <div className={styles.shelfCardBrand}>SOFTNOVA</div>
                      </div>
                    </div>
                    {isCenter && (
                      <motion.div
                        className={styles.glowLight}
                        layoutId="activeGlow"
                        style={{ backgroundColor: book.color }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            className={`${styles.carouselBtn} ${styles.nextBtn}`}
            onClick={goNext}
            style={{ '--active-color': activeItem.color }}
            aria-label="Next book"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className={styles.carouselDots}>
          {HERO_BOOKS.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to book ${idx + 1}`}
              style={idx === activeIndex ? { backgroundColor: activeItem.color } : {}}
            />
          ))}
        </div>

        {/* Dynamic Column Insights Section (Below Shelf) */}
        <div className={styles.insightsRow}>

          {/* Column 1: Book Info */}
          <div className={styles.insightCol}>
            <div className={styles.colBadge} style={{ color: activeItem.color, background: `${activeItem.color}15` }}>
              {activeItem.category}
            </div>
            <h2 className={styles.colBookTitle}>{activeItem.title} {activeItem.subtitle}</h2>
            <p className={styles.colBookDesc}>{activeItem.desc}</p>
          </div>

          {/* Column 2: Stats & Rating */}
          <div className={styles.insightCol}>
            <h3 className={styles.colHeading}>Resource Overview</h3>
            <div className={styles.shelfStatsGrid}>
              <div className={styles.shelfStatBox}>
                <span className={styles.shelfStatVal}>{activeItem.pages}</span>
                <span className={styles.shelfStatLab}>Pages</span>
              </div>
              <div className={styles.shelfStatBox}>
                <span className={styles.shelfStatVal}>{activeItem.Chapter}</span>
                <span className={styles.shelfStatLab}>Chapters</span>
              </div>
            </div>

            <div className={styles.ratingRow}>
              <div className={styles.starsWrapper}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < activeItem.rating ? activeItem.color : 'none'}
                    color={i < activeItem.rating ? activeItem.color : '#cbd5e1'}
                  />
                ))}
              </div>
              <span className={styles.votersText}>{activeItem.voters} Readers</span>
            </div>
          </div>

          {/* Column 3: Syllabus Preview */}
          <div className={styles.insightCol}>
            <h3 className={styles.colHeading}>Syllabus Preview</h3>
            <div className={styles.previewList}>
              {activeItem.chapters.slice(0, 3).map((chapter, i) => (
                <div key={i} className={styles.previewItem}>
                  <span className={styles.previewItemDot} style={{ background: activeItem.color }} />
                  <span className={styles.previewItemText}>{chapter}</span>
                </div>
              ))}
            </div>

            <Link href={`/book/${activeItem.id}`} className={styles.outlineLink}>
              <button
                className={styles.outlineBtn}
                style={{
                  backgroundColor: activeItem.color,
                  boxShadow: `0 8px 20px ${activeItem.color}33`
                }}
              >
                <span>View Full Outline</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>

        </div>

      </div>

      {/* DASHBOARD CONTENT GRID */}
      <div className={styles.dashboardContainer}>

        {/* LEFT SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.brandSection}>
            <div className={styles.brandIconWrapper}>
              <BookOpen size={24} className={styles.brandIcon} />
            </div>
            <h1 className={styles.sidebarTitle}>Library Collection</h1>
          </div>

          <p className={styles.sidebarSubtitle}>
            Handpicked resources to help you learn, design, and build amazing products.
          </p>

          {/* CATEGORIES NAVIGATION */}
          <nav className={styles.navMenu}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.navItem} ${selectedCategory === cat.id ? styles.navItemActive : ''}`}
              >
                <span className={styles.navItemIcon}>{cat.icon}</span>
                <span className={styles.navItemText}>{cat.name}</span>
                {selectedCategory === cat.id && <span className={styles.activeIndicator} />}
              </button>
            ))}
          </nav>

          {/* SIDEBAR PROMO CARD */}
          <div className={styles.promoCard}>
            <div className={styles.promoIconWrapper}>
              <Lightbulb size={20} className={styles.promoIcon} />
            </div>
            <h3 className={styles.promoTitle}>Keep learning, keep growing.</h3>
            <p className={styles.promoText}>Every book is a step forward.</p>
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className={styles.mainContent}>
          {/* SEARCH ROW */}
          <div className={styles.searchRow}>
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search books, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* BOOKS LIST */}
          <div className={styles.booksList}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className={styles.bookListItem}>
                  {/* Left Side: Book Cover Link */}
                  <Link href={`/book/${book.id}`} className={styles.bookCoverLink}>
                    <div className={styles.bookCoverWrapper}>
                      <div
                        className={styles.bookCoverInner}
                        style={{
                          borderTop: `8px solid ${book.imgColor}`,
                          backgroundImage: `url(${book.coverImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {!book.coverImage && <div className={styles.bookCoverTitle}>{book.title}</div>}
                        <div className={styles.bookCoverBrandOverlay}>SOFTNOVA ACADEMY</div>
                      </div>
                    </div>
                  </Link>

                  {/* Right Side: Book Info */}
                  <div className={styles.bookInfoSide}>
                    <span
                      className={styles.bookCategoryBadge}
                      style={{ color: book.color }}
                    >
                      {book.category.toUpperCase()}
                    </span>
                    <h2 className={styles.bookTitle}>{getDisplayTitle(book)}</h2>
                    <p className={styles.bookDescription}>{book.desc}</p>

                    <div className={styles.bookMetaRow}>
                      <div className={styles.bookMetaItem}>
                        <BookOpen size={16} />
                        <span>{getBookLevel(book.id)}</span>
                      </div>
                      <span className={styles.metaDivider}>|</span>
                      <div className={styles.bookMetaItem}>
                        <FileText size={16} />
                        <span>{book.pages} Pages</span>
                      </div>

                      <Link
                        href={`/book/${book.id}`}
                        className={styles.bookLearnMoreLink}
                        style={{ color: book.color }}
                      >
                        <span>Learn More</span> <ArrowRight size={16} className={styles.arrowIcon} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No books found</h3>
                <p>Try searching with another keyword or selecting a different category.</p>
              </div>
            )}
          </div>
        </main>

      </div>

      {/* FOOTER QUOTE */}
      <footer className={styles.footerQuoteSection}>
        <p className={styles.footerQuote}>
          “The best way to predict the future is to create it.”
        </p>
        <span className={styles.footerQuoteAuthor}>— Peter Drucker</span>
      </footer>
    </div>
  );
};

export default BookPage;
