"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Course', path: '/course' },
  { name: 'Internship', path: '/intership' },
  { name: 'Book', path: '/book' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact Us', path: '/contact-us' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Stop Lenis smooth scroll when mobile menu is open
      if (window.__lenis) window.__lenis.stop();
    } else {
      // Resume Lenis smooth scroll when mobile menu is closed
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      if (window.__lenis) window.__lenis.start();
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isOpen ? styles.navOpen : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.logoDot}></div>
            </div>
            <div className={styles.logoText}>
              SOFTNOVA<span>ACADEMY</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  data-active={isActive ? 'true' : 'false'}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className={styles.navActions}>
            <Link href="/enroll" className={styles.ctaButton}>
              Join Now
            </Link>
           
            {/* Mobile Toggle */}
            <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Menu" suppressHydrationWarning>
              <div className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
          return (
            <Link
              key={link.name}
              href={link.path}
              aria-current={isActive ? 'page' : undefined}
              data-active={isActive ? 'true' : 'false'}
              className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveNavLink : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
