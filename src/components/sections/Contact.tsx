"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contact`, form);
      setSent(true);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-purple-600 bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
      <div className="blob w-64 h-64 bg-pink-500 top-0 left-0 -translate-x-1/4 -translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-3">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl">
            Have a project in mind or want to collaborate? I&apos;d love to hear from
            you.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 border border-purple-500/20 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Let&apos;s work together
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:jenarajeshkumar768@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Mail size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-500 transition-colors break-all">
                      jenarajeshkumar768@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <MapPin size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-purple-500/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Available for new opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 md:p-8 border border-purple-500/20">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <CheckCircle size={56} className="text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Name <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Email <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Message <span className="text-purple-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
