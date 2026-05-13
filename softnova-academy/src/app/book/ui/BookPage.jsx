"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Heart, Bookmark, Share2, Download, Search, Settings, Play } from 'lucide-react';
import styles from './BookPage.module.css';

const BOOKS = [
   { id: 1, title: 'Web Design', subtitle: 'Fundamentals', author: 'James Carter', rating: 5, voters: '1.9M', desc: 'Master the art of creating visually stunning and user-friendly websites.', imgColor: '#00cec9', hue: 150, color: '#00cec9', pages: 420, time: '6.5h', progress: 65, category: 'Design', chapters: ['1. Layout Basics', '2. Typography', '3. Color Theory', '4. UX Research'] },
   { id: 2, title: 'UI/UX', subtitle: 'Masterclass', author: 'Emily Watson', rating: 4, voters: '856K', desc: 'Deep dive into user research, wireframing, and interactive prototyping.', imgColor: '#ff7c30', hue: 0, color: '#ff9f43', pages: 350, time: '5.2h', progress: 20, category: 'Interface', chapters: ['1. Discovery', '2. Wireframing', '3. Visual Design', '4. Handoff'] },
   { id: 3, title: 'Advanced React', subtitle: 'Patterns', author: 'Sarah Jenkins', rating: 5, voters: '2.1M', desc: 'Take your React skills to the professional level.', imgColor: '#6c5ce7', hue: 200, color: '#0984e3', pages: 580, time: '9.7h', progress: 45, category: 'Development', chapters: ['1. Hooks Deep Dive', '2. Context API', '3. Performance', '4. Testing'] },
   { id: 4, title: 'Full Stack', subtitle: 'Roadmap', author: 'David Miller', rating: 5, voters: '1.2M', desc: 'The ultimate guide to becoming a full stack developer.', imgColor: '#e84393', hue: 300, color: '#e84393', pages: 290, time: '4.1h', progress: 85, category: 'Career', chapters: ['1. Node.js', '2. Express', '3. Databases', '4. Deployment'] },
   { id: 5, title: 'Digital Marketing', subtitle: 'Learning', author: 'Alan Turing', rating: 5, voters: '3.4M', desc: 'Introduction to neural networks and modern AI.', imgColor: '#10ac84', hue: 80, color: '#10ac84', pages: 620, time: '12h', progress: 12, category: 'AI/ML', chapters: ['1. Regression', '2. Classification', '3. Neural Nets', '4. NLP'] },
];

const BookCard = ({ book }) => (
   <div className={styles.card} suppressHydrationWarning>
      <div className={styles.coverWrapper}>
         <div className={styles.coverInner} style={{ borderTop: `10px solid ${book.imgColor}` }}>
            <div className={styles.coverTitle}>{book.title}</div>
            <div style={{ fontSize: '0.7rem', color: '#b2bec3' }}>SOFTNOVA ACADEMY</div>
            <div style={{ width: '100%', height: '100px', background: `${book.imgColor}22`, borderRadius: '5px', marginTop: '10px' }}></div>
         </div>
      </div>
      <div className={styles.infoSide}>
         <div className={styles.categoryBadge} style={{ background: `${book.color}22`, color: book.color }}>{book.category}</div>
         <div className={styles.author} suppressHydrationWarning>by {book.author}</div>
         <h2 className={styles.title} suppressHydrationWarning>{book.title}</h2>
         <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
               <span key={i} style={{ color: i < book.rating ? '#ffb800' : '#dcdde1' }}>★</span>
            ))}
            <span className={styles.stats}>{book.voters} voters</span>
         </div>
         <p className={styles.description} suppressHydrationWarning>{book.desc}</p>
         <button className={styles.seeBookBtn} suppressHydrationWarning>See The Book</button>
      </div>
   </div>
);

const BookPage = () => {
   const [activeIndex, setActiveIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         // setActiveIndex((current) => (current + 1) % BOOKS.length);
      }, 8000); // Slower cycle for reading content
      return () => clearInterval(interval);
   }, []);

   const activeItem = BOOKS[activeIndex];

   return (
      <div className={styles.section}>

         {/* NEW GLASSMORPHISM HERO */}
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
                     <motion.div
                        className={styles.orbitContainer}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                     >
                        {BOOKS.map((book, idx) => {
                           if (idx === activeIndex) return null;

                           let orbitIdx = idx;
                           if (idx > activeIndex) orbitIdx = idx - 1;

                           const angle = (orbitIdx * 90); 
                           const radius = 180; 

                           return (
                              <div
                                 key={`orbit-wrapper-${book.id}`}
                                 className={styles.orbitItemWrapper}
                                 style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                              >
                                 <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    className={styles.counterRotate}
                                 >
                                    <motion.img
                                       layoutId={`book-img-${book.id}`}
                                       src="/3d_book_icon_transparent.webp"
                                       className={styles.orbitBookImage}
                                       onClick={() => setActiveIndex(idx)}
                                       whileHover={{ scale: 1.2 }}
                                       style={{
                                          filter: `hue-rotate(${book.hue}deg) contrast(1.1) drop-shadow(0 10px 15px rgba(0,0,0,0.2))`,
                                          cursor: 'pointer'
                                       }}
                                    />
                                 </motion.div>
                              </div>
                           );
                        })}
                     </motion.div>

                     {/* Center Book Slot */}
                     <div className={styles.centerSlot}>
                        <motion.img
                           key={`center-book-${activeItem.id}`}
                           layoutId={`book-img-${activeItem.id}`}
                           src="/3d_book_icon_transparent.webp"
                           className={styles.centerBookImage}
                           style={{ filter: `hue-rotate(${activeItem.hue}deg) contrast(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.4))` }}
                        />
                     </div>
                  </LayoutGroup>

                  {/* Floating Orbs */}
                  <motion.div className={styles.floatingOrb1} animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ background: activeItem.color }}></motion.div>
                  <motion.div className={styles.floatingOrb2} animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ background: activeItem.color }}></motion.div>
               </div>

               {/* RIGHT PANEL: BOOK CONTENTS (NEW FUNCTIONAL AREA) */}
               <div className={styles.rightInsightsPanel}>
                  <div className={styles.panelHeader}>
                     <h3>Book Index</h3>
                     <div className={styles.liveBadge}>CHAPTERS</div>
                  </div>

                  <div className={styles.insightSection}>
                     <div className={styles.progressCircleContainer}>
                        <svg className={styles.progressSvg} viewBox="0 0 100 100">
                           <circle className={styles.progressBg} cx="50" cy="50" r="45" />
                           <motion.circle 
                              className={styles.progressFill} 
                              cx="50" cy="50" r="45" 
                              initial={{ strokeDashoffset: 283 }}
                              animate={{ strokeDashoffset: 283 - (283 * activeItem.progress) / 100 }}
                              style={{ stroke: activeItem.color }}
                           />
                        </svg>
                        <div className={styles.progressText}>
                           <span className={styles.progressPercent}>{activeItem.progress}%</span>
                           <span className={styles.progressLabel}>Read</span>
                        </div>
                     </div>
                  </div>

                  <div className={styles.statsGrid}>
                     <div className={styles.statBox}>
                        <span className={styles.statVal}>{activeItem.pages}</span>
                        <span className={styles.statLab}>Pages</span>
                     </div>
                     <div className={styles.statBox}>
                        <span className={styles.statVal}>{activeItem.time}</span>
                        <span className={styles.statLab}>Time</span>
                     </div>
                  </div>

                  <div className={styles.chaptersSection}>
                     <h4 className={styles.chaptersTitle}>Contents Index</h4>
                     <div className={styles.chaptersList}>
                        {activeItem.chapters.map((chapter, i) => (
                           <div key={i} className={styles.chapterItem}>
                              <div className={styles.chapterDot} style={{ background: i === 0 ? activeItem.color : 'rgba(255,255,255,0.2)' }}></div>
                              <span>{chapter}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <button className={styles.readMoreBtn} style={{ color: activeItem.color, border: `1px solid ${activeItem.color}44` }}>
                     View Full Outline
                  </button>
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

         {/* COLLECTION GRID */}
         <div className={styles.container} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
            <h2 className={styles.collectionTitle} suppressHydrationWarning>Library Collection</h2>
            <div className={styles.grid}>
               {BOOKS.map((book) => (
                  <BookCard key={book.id} book={book} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default BookPage;
