import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full" />
        </div>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--accent)] before:to-transparent">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--accent)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-lg border border-[var(--bg-secondary)] group-hover:border-[var(--accent)] transition-colors">
                <div className="flex flex-col mb-1">
                  <span className="text-[var(--accent)] drop-shadow-sm font-semibold text-sm mb-1">{item.duration}</span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{item.role}</h3>
                  <span className="text-[var(--text-secondary)] font-medium text-sm">{item.company}</span>
                </div>
                <p className="text-[var(--text-secondary)] mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
