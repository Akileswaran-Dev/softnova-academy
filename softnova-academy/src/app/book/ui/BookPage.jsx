"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Heart, Bookmark, Share2, Download, Search, Settings, Play } from 'lucide-react';
import styles from './BookPage.module.css';

const BOOKS = [
  { id: 1, title: 'Web Design', subtitle: 'Fundamentals', author: 'James Carter', rating: 5, voters: '1,987,765', desc: 'Master the art of creating visually stunning and user-friendly websites.', imgColor: '#00cec9', hue: 150, color: '#00cec9' },
  { id: 2, title: 'UI/UX', subtitle: 'Masterclass', author: 'Emily Watson', rating: 4, voters: '856,120', desc: 'Deep dive into user research, wireframing, and interactive prototyping.', imgColor: '#ff7c30', hue: 0, color: '#ff9f43' },
  { id: 3, title: 'Advanced React', subtitle: 'Patterns', author: 'Sarah Jenkins', rating: 5, voters: '2,110,400', desc: 'Take your React skills to the professional level.', imgColor: '#6c5ce7', hue: 200, color: '#0984e3' },
  { id: 4, title: 'Full Stack', subtitle: 'Roadmap', author: 'David Miller', rating: 5, voters: '1,200,890', desc: 'The ultimate guide to becoming a full stack developer.', imgColor: '#e84393', hue: 300, color: '#e84393' },
  { id: 5, title: 'Machine', subtitle: 'Learning', author: 'Alan Turing', rating: 5, voters: '3,450,100', desc: 'Introduction to neural networks and modern AI.', imgColor: '#10ac84', hue: 80, color: '#10ac84' },
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
      setActiveIndex((current) => (current + 1) % BOOKS.length);
    }, 4500); // 4.5 seconds auto-cycle
    return () => clearInterval(interval);
  }, []);

  const activeItem = BOOKS[activeIndex];

  return (
    <div className={styles.section}>
      
      {/* NEW GLASSMORPHISM HERO */}
      <div className={styles.heroGlassContainer}>
         <div className={styles.ambientBackground} style={{ background: `radial-gradient(circle at 30% 70%, ${activeItem.color}88, transparent 50%)` }}></div>
         
         <div className={styles.glassCard}>
            
            {/* Top Left Icons */}
            <div className={styles.topLeftIcons}>
               <div className={styles.iconCircle}><BookOpen size={16} /></div>
               <div className={styles.iconCircleSmall}><Search size={14} /></div>
            </div>

            {/* Left Content */}
            <div className={styles.leftContent}>
               <AnimatePresence mode="wait">
                  <motion.div 
                     key={activeIndex}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.4 }}
                  >
                     <h1 className={styles.mainTitle}>
                        {activeItem.title} <br/> 
                        <span className={styles.subtitle}>{activeItem.subtitle}</span>
                     </h1>
                  </motion.div>
               </AnimatePresence>
               <button className={styles.actionBtn} style={{ backgroundColor: activeItem.color }}>
                  Read Book <ArrowRight size={18} style={{ marginLeft: '5px' }}/>
               </button>
            </div>

            {/* Center 3D Showcase (Orbital Carousel) */}
            <div className={styles.centerShowcase}>
               <div className={styles.milkSplash}></div>
               
               <LayoutGroup>
                  {/* The Orbiting Ring */}
                  <motion.div 
                    className={styles.orbitContainer}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                     {BOOKS.map((book, idx) => {
                        if (idx === activeIndex) return null;

                        // Calculate orbit index (0 to 3)
                        let orbitIdx = idx;
                        if (idx > activeIndex) orbitIdx = idx - 1;

                        const angle = (orbitIdx * 90); // 360 / 4 = 90 degrees
                        const radius = 170; // Distance from center

                        return (
                           <div 
                              key={`orbit-wrapper-${book.id}`}
                              className={styles.orbitItemWrapper}
                              style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                           >
                              {/* Counter-rotate to stay upright */}
                              <motion.div
                                 animate={{ rotate: -360 }}
                                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                 className={styles.counterRotate}
                              >
                                 <motion.img 
                                    layoutId={`book-img-${book.id}`}
                                    src="/3d_book_icon_transparent.png" 
                                    className={styles.orbitBookImage}
                                    onClick={() => setActiveIndex(idx)}
                                    whileHover={{ scale: 1.15 }}
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
                        src="/3d_book_icon_transparent.png" 
                        className={styles.centerBookImage}
                        style={{ filter: `hue-rotate(${activeItem.hue}deg) contrast(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.4))` }}
                     />
                  </div>
               </LayoutGroup>
               
               {/* Floating Orbs (mimicking fruits) */}
               <motion.div className={styles.floatingOrb1} animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ background: activeItem.color }}></motion.div>
               <motion.div className={styles.floatingOrb2} animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ background: activeItem.color }}></motion.div>
               <motion.div className={styles.floatingOrb3} animate={{ y: [0, -10, 0], x: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} style={{ background: activeItem.color }}></motion.div>
            </div>

            {/* Right Icon Grid */}
            <div className={styles.rightIconGrid}>
               <div className={styles.iconBtn}><Heart size={20} /></div>
               <div className={styles.iconBtn}><Star size={20} /></div>
               <div className={styles.iconBtnActive} style={{ color: activeItem.color }}><Bookmark size={20} /></div>
               <div className={styles.iconBtn}><Share2 size={20} /></div>
               <div className={styles.iconBtn}><Download size={20} /></div>
               <div className={styles.iconBtn}><Settings size={20} /></div>
               <div className={styles.iconBtn}><BookOpen size={20} /></div>
               <div className={styles.iconBtn}><Search size={20} /></div>
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
