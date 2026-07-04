"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Layers, ShoppingCart, Globe } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Plannr",
    description:
      "A production-ready project management platform inspired by Azure Boards. Enables teams to create and manage projects, user stories, work items, and tasks with seamless assignment workflows. Features a role-based access system for secure, efficient management across teams.",
    tags: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Role-Based Access"],
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    github: "https://github.com",
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: "Food Ordering App",
    description:
      "An online food ordering platform with a shopping cart, real-time order tracking, and geolocation-based services. Built a robust FastAPI backend for user authentication, order management, and instant data access via REST APIs.",
    tags: ["React.js", "Redux", "FastAPI", "PostgreSQL", "Geolocation", "REST APIs"],
    icon: ShoppingCart,
    color: "from-pink-500 to-purple-600",
    github: "https://github.com",
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: "Worldwise",
    description:
      "An interactive travel logging platform that lets users document and organise trip histories across multiple locations. Integrated GPS functionality for precise location tracking, detailed travel maps, and journey analytics.",
    tags: ["React.js", "GPS API", "Context API", "Maps", "Analytics"],
    icon: Globe,
    color: "from-violet-500 to-pink-500",
    github: "https://github.com",
    live: null,
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-purple-600 top-0 right-0 translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-3">
            Things I&apos;ve built
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl">
            A selection of real-world projects I&apos;ve designed and built from scratch.
          </p>
        </div>

        {/* Project cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl border border-purple-500/10 hover:border-purple-500/40 overflow-hidden group transition-all duration-300 flex flex-col"
              >
                {/* Card top banner */}
                <div
                  className={`h-2 bg-gradient-to-r ${project.color}`}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Featured badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    {project.featured && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-purple-500/10">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 glass border border-purple-500/30 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300"
          >
            <Github size={18} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
