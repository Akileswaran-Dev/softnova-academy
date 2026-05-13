"use client";

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  User,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { BOOKS } from '../data/books';
import styles from './BookDetails.module.css';

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id);

  const book = useMemo(() => {
    return BOOKS.find(b => b.id === bookId);
  }, [bookId]);

  if (!book) {
    return (
      <div className={styles.notFound}>
        <h2>Book not found</h2>
        <Link href="/book" className={styles.backLink}>Back to Library</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Dynamic Background */}
      <div className={styles.ambientBg}></div>

      <div className={styles.container}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={24} />
            <span>Back to Library</span>
          </button>
        </nav>

        <main className={styles.mainContent}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.bookShowcase}>
              <motion.div 
                className={styles.bookContainer}
                initial={{ rotateY: -30, rotateX: 5, x: -50, opacity: 0 }}
                animate={{ rotateY: 0, rotateX: 0, x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={styles.book3D}>
                  <div className={styles.bookCover} style={{ borderLeft: `12px solid ${book.imgColor}` }}>
                    <div className={styles.coverTitle}>{book.title}</div>
                    <div className={styles.coverSubtitle}>{book.subtitle}</div>
                    <div className={styles.coverBrand}>SOFTNOVA ACADEMY</div>
                  </div>
                  <div className={styles.bookSpine} style={{ background: book.imgColor }}></div>
                  <div className={styles.bookPages}></div>
                </div>
                <div className={styles.bookShadow}></div>
              </motion.div>
            </div>

            <div className={styles.bookDetails}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className={styles.categoryBadge} style={{ background: `${book.color}22`, color: book.color }}>
                  {book.category}
                </span>
                <h1 className={styles.mainTitle}>{book.title}</h1>
                <h2 className={styles.subtitle}>{book.subtitle}</h2>
                

                <div className={styles.ratingStats}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < book.rating ? "#ffb800" : "transparent"} color={i < book.rating ? "#ffb800" : "#ccc"} />
                    ))}
                  </div>
                  <span className={styles.voters}>{book.voters} Ratings</span>
                </div>

                <p className={styles.description}>{book.desc}</p>

                <div className={styles.actionButtons}>
                  <button className={styles.primaryBtn}>
                    <Play size={20} fill="currentColor" />
                    <span>Start Reading</span>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <Download size={20} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Insights Grid */}
          <section className={styles.insightsGrid}>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}><BookOpen size={24} /></div>
              <div className={styles.insightInfo}>
                <span className={styles.insightVal}>{book.pages}</span>
                <span className={styles.insightLab}>Total Pages</span>
              </div>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}><Layers size={24} /></div>
              <div className={styles.insightInfo}>
                <span className={styles.insightVal}>{book.Chapter}</span>
                <span className={styles.insightLab}>Chapters</span>
              </div>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}><Clock size={24} /></div>
              <div className={styles.insightInfo}>
                <span className={styles.insightVal}>Self-Paced</span>
                <span className={styles.insightLab}>Duration</span>
              </div>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}><CheckCircle2 size={24} /></div>
              <div className={styles.insightInfo}>
                <span className={styles.insightVal}>Premium</span>
                <span className={styles.insightLab}>Certificate</span>
              </div>
            </div>
          </section>

          {/* Chapters List */}
          <section className={styles.chaptersSection}>
            <div className={styles.sectionHeader}>
              <h3>Contents Index</h3>
              <p>Master the curriculum step-by-step</p>
            </div>
            <div className={styles.chaptersGrid}>
              {book.chapters.map((chapter, i) => (
                <motion.div 
                  key={i} 
                  className={styles.chapterCard}
                  whileHover={{ x: 10 }}
                >
                  <div className={styles.chapterNum} style={{ background: `${book.color}11`, color: book.color }}>
                    {i + 1}
                  </div>
                  <div className={styles.chapterTitle}>{chapter}</div>
                  <div className={styles.chapterAction}>
                    <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
