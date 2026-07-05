'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Code2, Heart } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SocialLink {
  id: string | number;
  platform: string;
  url: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  const fallbackSocials: SocialLink[] = [
    {
      id: 1,
      platform: 'github',
      url: 'https://github.com/rajesh-rk-1202',
      icon: 'github',
    },
    {
      id: 2,
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/rajesh-kumar-jena-96817b190/',
      icon: 'linkedin',
    },
    {
      id: 3,
      platform: 'email',
      url: 'mailto:jenarajeshkumar768@gmail.com',
      icon: 'email',
    },
  ];

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const q = query(collection(db, 'socials'), orderBy('order'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SocialLink, 'id'>),
        }));
        setSocials(data.length ? data : fallbackSocials);
      } catch {
        // Firestore unreachable — use known links so the UI never breaks
        setSocials(fallbackSocials);
      }
    };
    fetchSocials();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/10 py-12 overflow-hidden">
      <div className="blob w-64 h-64 bg-purple-700 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Rajesh</span>
                <span className="text-gray-700 dark:text-gray-200">.dev</span>
              </span>
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Full Stack Developer building scalable, user-focused applications
              with passion.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socials.map((social) => {
                const Icon = iconMap[social.icon] || Mail;
                return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 border border-transparent hover:border-purple-500/30 transition-all duration-200"
                    aria-label={social.platform}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-purple-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} Rajesh Kumar Jena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
