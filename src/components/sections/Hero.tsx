'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const TITLES = [
  'Full Stack Developer',
  'React & Next.js Expert',
  'Python & FastAPI Builder',
  'Problem Solver',
];

function useTypingAnimation(titles: string[], speed = 80, pause = 1800) {
  const [state, setState] = useState({
    displayed: '',
    titleIdx: 0,
    charIdx: 0,
    deleting: false,
  });

  useEffect(() => {
    const { titleIdx, charIdx, deleting } = state;
    const current = titles[titleIdx];

    const timeout = setTimeout(
      () => {
        if (!deleting && charIdx < current.length) {
          setState((s) => ({
            ...s,
            charIdx: s.charIdx + 1,
            displayed: current.slice(0, s.charIdx + 1),
          }));
        } else if (!deleting && charIdx === current.length) {
          setState((s) => ({ ...s, deleting: true }));
        } else if (deleting && charIdx > 0) {
          setState((s) => ({
            ...s,
            charIdx: s.charIdx - 1,
            displayed: current.slice(0, s.charIdx - 1),
          }));
        } else if (deleting && charIdx === 0) {
          setState((s) => ({
            ...s,
            deleting: false,
            titleIdx: (s.titleIdx + 1) % titles.length,
          }));
        }
      },
      !deleting && charIdx === current.length
        ? pause
        : deleting
          ? speed / 2
          : speed,
    );

    return () => clearTimeout(timeout);
  }, [state, titles, speed, pause]);

  return state.displayed;
}

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const typedText = useTypingAnimation(TITLES);
  const [socials, setSocials] = useState<SocialLink[]>(fallbackSocials);
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

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
        setSocials(fallbackSocials);
      }
    };
    fetchSocials();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-0 py-20 lg:min-h-screen lg:py-0 flex items-center justify-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-purple-600 top-1/4 -left-24 animate-float" />
      <div
        className="blob w-80 h-80 bg-purple-400 bottom-1/4 -right-20"
        style={{
          animationDelay: '2s',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="blob w-64 h-64 bg-pink-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          animationDelay: '4s',
          animation: 'float 10s ease-in-out infinite',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-purple-400 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-purple-500 font-mono text-base md:text-lg tracking-widest uppercase">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="gradient-text-full">Rajesh</span>
              <br />
              <span className="text-gray-900 dark:text-white">Kumar Jena</span>
            </h1>
          </motion.div>

          {/* Typing animation */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 h-10"
          >
            <span className="gradient-text">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Passionate about building scalable, user-focused applications that
            solve real-world problems. I transform ideas into impactful digital
            products.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 purple-glow"
            >
              View My Work
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass border border-purple-500/40 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={18} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex gap-3">
            {socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail;
              return (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 glass rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:border-purple-500/50 border border-transparent transition-all duration-200"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
