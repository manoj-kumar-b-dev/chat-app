import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = ({ data }) => {
  return (
    <section id="home" className="min-h-screen py-20 flex items-center bg-[var(--bg-primary)] pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <span className="text-[var(--accent)] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Welcome to my world
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] leading-tight mb-6">
            Hi, I'm <span className="text-[var(--accent)]">{data.name}</span>
            <br />
            a <span className="underline decoration-[var(--accent)] decoration-4 underline-offset-8">{data.title}</span>.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto md:mx-0">
            {data.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="px-8 py-3 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all font-semibold shadow-lg shadow-[var(--accent)]/30 cursor-pointer text-center"
            >
              View Projects
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="px-8 py-3 rounded-full border-2 border-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all font-semibold cursor-pointer text-center bg-[var(--bg-secondary)] dark:bg-transparent"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[var(--bg-secondary)] shadow-2xl">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
