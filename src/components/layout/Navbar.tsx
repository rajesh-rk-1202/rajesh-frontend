'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const wasMobileOpen = mobileOpen;
    setMobileOpen(false);

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // If the mobile menu is open, let its collapse animation finish first.
    // Triggering scrollIntoView while the menu is still animating causes
    // some mobile browsers to cancel the smooth-scroll mid-way.
    if (wasMobileOpen) {
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md',
        scrolled &&
          'shadow-lg shadow-purple-500/5 dark:shadow-purple-500/10 border-b border-purple-500/10',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center purple-glow group-hover:purple-glow-lg transition-all duration-300">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg block">
              <span className="gradient-text">Rajesh</span>
              <span className="text-gray-700 dark:text-gray-200">.dev</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group',
                  activeSection === link.href.replace('#', '')
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-purple-500 rounded-full transition-all duration-300',
                    activeSection === link.href.replace('#', '')
                      ? 'w-4/5'
                      : 'w-0 group-hover:w-4/5',
                  )}
                />
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('#contact')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
            >
              Hire Me
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center glass text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200',
                    activeSection === link.href.replace('#', '')
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-purple-500/10 hover:text-purple-500',
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
