import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ title, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[var(--bg-primary)] p-6 rounded-2xl shadow-lg border border-[var(--bg-secondary)] hover:shadow-xl transition-shadow"
  >
    <h3 className="text-xl font-semibold mb-6 text-[var(--text-primary)] border-b pb-2">{title}</h3>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <div key={skill.name} className="flex flex-col items-center justify-center p-3 hover:bg-[var(--bg-secondary)] rounded-xl transition-colors cursor-default">
          <skill.icon className={`text-5xl mb-3 ${skill.color} drop-shadow-sm`} />
          <span className="text-sm font-medium text-[var(--text-secondary)]">{skill.name}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = ({ data }) => {
  const categories = [
    { title: "Frontend", data: data.frontend },
    { title: "Backend", data: data.backend },
    { title: "Database", data: data.database },
    { title: "Tools", data: data.tools }
  ];

  return (
    <section id="skills" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <SkillCard key={cat.title} title={cat.title} skills={cat.data} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
