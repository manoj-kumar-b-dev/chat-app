import React from 'react';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-8">About Me</h2>
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto mb-10 rounded-full" />
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-justify md:text-center shadow-sm p-6 bg-white dark:bg-[#0f172a] rounded-2xl">
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
