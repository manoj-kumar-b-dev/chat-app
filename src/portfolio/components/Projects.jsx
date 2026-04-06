import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = ({ data }) => {
  return (
    <section id="projects" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[var(--bg-primary)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors">
                    <FiGithub size={24} />
                  </a>
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors">
                    <FiExternalLink size={24} />
                  </a>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--accent)] text-xs font-semibold rounded-full border border-[var(--accent)]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
