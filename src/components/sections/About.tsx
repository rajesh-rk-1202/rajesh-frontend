'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Briefcase, GraduationCap, Coffee } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '4+', icon: Briefcase },
  { label: 'Projects Built', value: '10+', icon: GraduationCap },
  { label: 'Technologies', value: '20+', icon: Coffee },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="py-14 lg:py-20 relative overflow-hidden">
      {/* Background blob */}
      <div className="blob w-72 h-72 bg-purple-600 top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-3">
              Get to know me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Avatar / Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center gap-10 lg:mx-auto"
            >
              <div className="relative">
                {/* Decorative glow ring */}
                <div className="absolute -inset-4 rounded-4xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent blur-2xl -z-10" />

                {/* Avatar */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-1.5 purple-glow-lg">
                  <div className="w-full h-full rounded-[1.35rem] overflow-hidden">
                    <Image
                      src="/profile.png"
                      alt="Rajesh Kumar Jena"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* Floating badge - top right */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 z-20 bg-white dark:bg-dark-800 rounded-2xl px-4 py-2.5 border border-purple-500/30 shadow-xl"
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Open to Work
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 w-64 md:w-80">
                {stats.map(({ label, value, icon: Icon }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.06, y: -4 }}
                    className="glass rounded-2xl p-4 text-center border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex flex-col items-center justify-start min-h-27.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                      <Icon size={18} className="text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold gradient-text">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I&apos;m{' '}
                  <span className="text-purple-500 font-semibold">
                    Rajesh Kumar Jena
                  </span>
                  , a Full Stack Developer passionate about building scalable,
                  user-focused applications that solve real-world problems.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  With experience across frontend and backend technologies, I
                  enjoy transforming ideas into impactful digital products.
                  I&apos;m passionate about continuous learning, software
                  architecture, and building innovative digital solutions that
                  deliver real-world impact.
                </p>
              </div>

              {/* Info items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-purple-400" />
                  </div>
                  <span>India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={16} className="text-purple-400" />
                  </div>
                  <span>Full Stack Developer</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Let&apos;s Talk
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById('projects')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-6 py-3 glass border border-purple-500/30 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-purple-500 transition-all duration-300"
                >
                  My Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
