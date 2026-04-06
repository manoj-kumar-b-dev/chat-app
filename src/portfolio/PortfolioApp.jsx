import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from './data/portfolioData';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]"
  >
    <div className="flex space-x-2">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-4 h-4 rounded-full bg-[var(--accent)]"
        />
      ))}
    </div>
  </motion.div>
);

const PortfolioApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Demo preloader length
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      
      {!loading && (
        <div className="min-h-screen font-sans selection:bg-[var(--accent)] selection:text-white overflow-x-hidden">
          <Navbar heroName={portfolioData.hero.name} />
          
          <main>
            <Hero data={portfolioData.hero} />
            <About data={portfolioData.about} />
            <Skills data={portfolioData.skills} />
            <Projects data={portfolioData.projects} />
            <Experience data={portfolioData.experience} />
            <Contact data={portfolioData.contact} />
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
};

export default PortfolioApp;
