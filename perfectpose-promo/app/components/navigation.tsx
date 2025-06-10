'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const navLinks = [
  { title: 'Features', href: '#features' },
  { title: 'API', href: '#api-usage' },
  { title: 'Docs', href: '/api-docs' },
];

// Navigation Component
export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getHref = (href: string) => {
    if (href.startsWith('#')) {
        return isHomePage ? href : `/${href}`;
    }
    return href;
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-4"
        initial={false}
        animate={{ 
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl  mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image src="/logo.png" alt="Perfect Pose Logo" width={32} height={32} />
            <span className="text-lg sm:text-xl font-semibold text-white truncate">Perfect Pose</span>
          </Link>
          
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={getHref(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
             <Link href={getHref('#sign-up')} className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg">
                Get Started
              </Link>
          </div>
          
          <button onClick={toggleMenu} className="md:hidden z-50 text-white flex-shrink-0">
             {/* Hamburger Icon Logic Here */}
             <div className="w-6 h-6 flex flex-col justify-around">
                <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center gap-y-6 text-2xl">
              {navLinks.map((item) => (
                <li key={item.title}>
                  <Link href={getHref(item.href)} onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={getHref('#sign-up')} onClick={toggleMenu} className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300">
                    Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 