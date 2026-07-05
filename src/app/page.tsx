import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* <ChatWidget /> */}
    </div>
  );
}
