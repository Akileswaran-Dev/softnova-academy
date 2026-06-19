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
  Star
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % BOOKS.length);
    }, 8000); // Slower cycle for reading content
    return () => clearInterval(interval);
  }, []);

  const activeItem = BOOKS[activeIndex];

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
      
      {/* GLASSMORPHISM HERO CAROUSEL */}
      <div className={styles.heroGlassContainer}>
        <div className={styles.ambientBackground} style={{ background: `radial-gradient(circle at 30% 70%, ${activeItem.color}88, transparent 50%)` }}></div>

        <div className={styles.glassCard}>

          {/* Left Content */}
          <div className={styles.leftContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className={styles.mainTitle}>
                  {activeItem.title} <br />
                  <span className={styles.subtitle}>{activeItem.subtitle}</span>
                </h1>
                <p className={styles.heroDesc}>{activeItem.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center 3D Showcase (Orbital Carousel) */}
          <div className={styles.centerShowcase}>
            <div className={styles.milkSplash}></div>

            <LayoutGroup>
              {/* The Orbiting Ring */}
              <div className={styles.orbitContainer}>
                {BOOKS.map((book, idx) => {
                  if (idx === activeIndex) return null;

                  let orbitIdx = idx;
                  if (idx > activeIndex) orbitIdx = idx - 1;

                  const totalOrbiting = BOOKS.length - 1;
                  const angle = totalOrbiting > 0 ? (orbitIdx * (360 / totalOrbiting)) : 0;
                  const radius = 180; 

                  return (
                    <div
                      key={`orbit-wrapper-${book.id}`}
                      className={styles.orbitItemWrapper}
                      style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                    >
                      <div className={styles.counterRotate}>
                        <motion.img
                          layoutId={`book-img-${book.id}`}
                          src={book.coverImage || "/3d_book_icon_transparent.webp"}
                          className={styles.orbitBookImage}
                          onClick={() => setActiveIndex(idx)}
                          whileHover={{ scale: 1.2 }}
                          style={{
                            filter: `drop-shadow(0 10px 15px rgba(0,0,0,0.2))`,
                            cursor: 'pointer'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Book Slot */}
              <div className={styles.centerSlot}>
                <motion.img
                  key={`center-book-${activeItem.id}`}
                  layoutId={`book-img-${activeItem.id}`}
                  src={activeItem.coverImage || "/3d_book_icon_transparent.webp"}
                  className={styles.centerBookImage}
                  style={{ filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.4))` }}
                />
              </div>
            </LayoutGroup>

            {/* Floating Orbs */}
            <div className={styles.floatingOrb1} style={{ background: activeItem.color }}></div>
            <div className={styles.floatingOrb2} style={{ background: activeItem.color }}></div>
          </div>

          {/* RIGHT PANEL: BOOK CONTENTS */}
          <div className={styles.rightInsightsPanel}>
            <div className={styles.panelHeader}>
              <h3>Book Index</h3>
              <div className={styles.liveBadge}>CHAPTERS</div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statVal}>{activeItem.pages}</span>
                <span className={styles.statLab}>Pages</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statVal}>{activeItem.Chapter}</span>
                <span className={styles.statLab}>Chapters</span>
              </div>
            </div>

            <div className={styles.chaptersSection}>
              <h4 className={styles.chaptersTitle}>Contents Index</h4>
              <div className={styles.chaptersList}>
                {activeItem.chapters.slice(0, 6).map((chapter, i) => (
                  <div key={i} className={styles.chapterItem}>
                    <div className={styles.chapterDot} style={{ background: i === 0 ? activeItem.color : 'rgba(255,255,255,0.2)' }}></div>
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href={`/book/${activeItem.id}`}>
              <button className={styles.readMoreBtn} style={{ color: activeItem.color, border: `1px solid ${activeItem.color}44` }}>
                View Full Outline
              </button>
            </Link>
          </div>

          {/* Bottom List */}
          <div className={styles.bottomList}>
            {BOOKS.map((book, idx) => (
              <div
                key={book.id}
                className={idx === activeIndex ? styles.bottomItemActive : styles.bottomItem}
                onClick={() => setActiveIndex(idx)}
              >
                <div className={styles.bottomIcon} style={{ color: idx === activeIndex ? book.color : 'rgba(255,255,255,0.5)' }}>
                  <BookOpen size={20} />
                </div>
                <span className={styles.bottomTitleText}>{book.title}</span>
                <span className={styles.bottomSubtitleText}>{book.subtitle}</span>
                <div className={styles.dots}>
                  <span style={{ background: idx === activeIndex ? book.color : 'rgba(255,255,255,0.2)' }}></span>
                  <span style={{ background: idx === activeIndex ? book.color : 'rgba(255,255,255,0.2)' }}></span>
                </div>
              </div>
            ))}
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
