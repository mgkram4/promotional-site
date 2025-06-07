'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Features', href: '/#features' },
  { title: 'API Docs', href: '/api-docs' },
  { title: 'Sign Up', href: '/#sign-up' },
];

// Navigation Component
export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    scrolled: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    top: {
      backgroundColor: 'transparent',
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  };
  
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: 'easeInOut'
      },
    },
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        ease: 'easeInOut'
      },
    },
  };
  
  const menuItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        variants={navVariants}
        animate={scrolled || isMenuOpen ? 'scrolled' : 'top'}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Image src="/logo.png" alt="Perfect Pose Logo" width={80} height={26} />
          <ul className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <li key={item.title} className="relative group">
                <a
                  href={item.href}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </a>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </li>
            ))}
          </ul>
          
          <button onClick={toggleMenu} className="w-6 h-6 relative z-50 md:hidden">
            <motion.span
                className="absolute h-0.5 w-full bg-white"
                style={{ top: '25%' }}
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <motion.span
                className="absolute h-0.5 w-full bg-white"
                style={{ top: '50%' }}
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            />
            <motion.span
                className="absolute h-0.5 w-full bg-white"
                style={{ top: '75%' }}
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
        </button>

        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-black/95 pt-24 z-40 flex items-center justify-center"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul className="flex flex-col items-center gap-y-8">
              {navLinks.map((item) => (
                <motion.li key={item.title} variants={menuItemVariants}>
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-white text-3xl font-light hover:text-blue-400 transition-colors"
                  >
                    {item.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 