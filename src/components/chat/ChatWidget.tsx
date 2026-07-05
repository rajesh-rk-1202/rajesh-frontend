'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type MessageRole = 'user' | 'bot';

interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

type ChatMode = 'ai' | 'live';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'bot',
  text: "Hi! 👋 I'm Rajesh's portfolio assistant. Ask me anything about his skills, projects, or experience — or switch to **Live Chat** to leave a direct message!",
  timestamp: new Date(),
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('ai');
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveForm, setLiveForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [liveSent, setLiveSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendAIMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let data;
      try {
        ({ data } = await axios.post(
          `${API_URL}/api/chat/ai`,
          {
            message: userMsg.text,
          },
          { timeout: 8000 },
        ));
      } catch (err) {
        const isTimeoutOrNetwork =
          axios.isAxiosError(err) &&
          (err.code === 'ECONNABORTED' || !err.response);
        if (!isTimeoutOrNetwork) throw err;
        ({ data } = await axios.post(
          `${API_URL}/api/chat/ai`,
          {
            message: userMsg.text,
          },
          { timeout: 20000 },
        ));
      }
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "Sorry, I'm having trouble connecting right now (the server may be waking up). Please try again in a few seconds or use the Contact form!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sendLiveMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveForm.name || !liveForm.email || !liveForm.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      try {
        await axios.post(`${API_URL}/api/chat/live`, liveForm, {
          timeout: 8000,
        });
      } catch (err) {
        const isTimeoutOrNetwork =
          axios.isAxiosError(err) &&
          (err.code === 'ECONNABORTED' || !err.response);
        if (!isTimeoutOrNetwork) throw err;
        toast('Server is waking up, please wait a moment…', { icon: '⏳' });
        await axios.post(`${API_URL}/api/chat/live`, liveForm, {
          timeout: 20000,
        });
      }
      setLiveSent(true);
      toast.success('Message sent to Rajesh!');
    } catch {
      toast.error('Failed to send. Please try the Contact form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-xl hover:shadow-purple-500/40 flex items-center justify-center transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { repeat: Infinity, duration: 2.5, delay: 3 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-dark-900 animate-pulse" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[560px] flex flex-col glass rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Portfolio Assistant
                  </p>
                  <p className="text-purple-200 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Mode tabs */}
            <div className="flex border-b border-purple-500/20 bg-white/5">
              <button
                onClick={() => setMode('ai')}
                className={cn(
                  'flex-1 py-2 text-xs font-semibold transition-colors',
                  mode === 'ai'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-purple-400',
                )}
              >
                🤖 AI Chat
              </button>
              <button
                onClick={() => setMode('live')}
                className={cn(
                  'flex-1 py-2 text-xs font-semibold transition-colors',
                  mode === 'live'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-purple-400',
                )}
              >
                💬 Leave Message
              </button>
            </div>

            {/* AI Chat body */}
            {mode === 'ai' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide min-h-[260px] max-h-[340px]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex items-end gap-2',
                        msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                      )}
                    >
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                          msg.role === 'user'
                            ? 'bg-purple-600'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500',
                        )}
                      >
                        {msg.role === 'user' ? (
                          <User size={12} className="text-white" />
                        ) : (
                          <Bot size={12} className="text-white" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed',
                          msg.role === 'user'
                            ? 'bg-purple-600 text-white rounded-br-sm'
                            : 'bg-white/10 dark:bg-white/5 border border-purple-500/20 text-gray-800 dark:text-gray-200 rounded-bl-sm',
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-white/10 border border-purple-500/20">
                        <Loader2
                          size={14}
                          className="animate-spin text-purple-400"
                        />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-purple-500/20 flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendAIMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/10 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={sendAIMessage}
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Send size={15} />
                  </motion.button>
                </div>
              </>
            )}

            {/* Live message body */}
            {mode === 'live' && (
              <div className="flex-1 overflow-y-auto p-4">
                {liveSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center gap-3"
                  >
                    <span className="text-4xl">✅</span>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Message delivered!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rajesh will get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setLiveSent(false);
                        setLiveForm({ name: '', email: '', message: '' });
                      }}
                      className="mt-1 px-4 py-2 bg-purple-600 text-white text-sm rounded-xl"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={sendLiveMessage} className="space-y-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Leave a message and Rajesh will reply to your email.
                    </p>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={liveForm.name}
                      onChange={(e) =>
                        setLiveForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <input
                      type="email"
                      placeholder="Your email *"
                      value={liveForm.email}
                      onChange={(e) =>
                        setLiveForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <textarea
                      placeholder="Your message *"
                      rows={4}
                      value={liveForm.message}
                      onChange={(e) =>
                        setLiveForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 border border-purple-500/20 focus:border-purple-500 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      {loading ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
