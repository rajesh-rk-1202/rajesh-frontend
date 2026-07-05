'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Server,
  Database,
  Cloud,
  TestTube,
  Lightbulb,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    color: 'from-purple-500 to-purple-700',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    icon: Code2,
    color: 'from-violet-500 to-purple-600',
    skills: [
      'React.js',
      'Next.js',
      'Redux',
      'React Native',
      'React Router',
      'React Query',
      'Context API',
      'Material UI',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-purple-600 to-pink-600',
    skills: ['FastAPI', 'Django', 'Flask', 'REST APIs'],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'from-pink-500 to-purple-600',
    skills: ['PostgreSQL', 'SQL'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-purple-500 to-indigo-600',
    skills: ['AWS EC2', 'AWS Amplify', 'Docker', 'Git', 'GitHub'],
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'from-violet-600 to-purple-500',
    skills: ['Jest', 'React Testing Library', 'Pytest', 'MSW', 'TDD'],
  },
  {
    title: 'Concepts',
    icon: Lightbulb,
    color: 'from-purple-400 to-pink-500',
    skills: ['Microfrontend Architecture', 'Async Programming', 'DSA'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" className="py-14 lg:py-20 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-purple-700 -bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-3">
            What I work with
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl">
            Technologies and tools I use to build robust, scalable applications.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/40 transition-all duration-300 group"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {category.title}
                  </h3>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400 dark:text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
