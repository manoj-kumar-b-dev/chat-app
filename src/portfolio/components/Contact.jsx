import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder submission logic
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[var(--bg-primary)] rounded-3xl p-8 md:p-12 shadow-xl border border-[var(--bg-secondary)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Let's talk about everything!</h3>
              <p className="text-[var(--text-secondary)] text-lg">Don't like forms? Send me an email.</p>
            </div>
            
            <div className="space-y-6">
              <a href={`mailto:${data.email}`} className="flex items-center space-x-4 p-4 rounded-2xl bg-[var(--bg-secondary)] hover:bg-[var(--accent)]/10 transition-colors group">
                <div className="p-3 bg-white dark:bg-[#0f172a] rounded-full group-hover:text-[var(--accent)] transition-colors">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)]">Email</h4>
                  <span className="text-[var(--text-secondary)]">{data.email}</span>
                </div>
              </a>
              
              <div className="flex items-center space-x-4 pb-4 border-b border-[var(--bg-secondary)]">
                <a href={data.github} target="_blank" rel="noreferrer" className="p-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:text-white hover:bg-[var(--accent)] rounded-full transition-all shadow-md">
                  <FiGithub size={24} />
                </a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:text-white hover:bg-[#0a66c2] rounded-full transition-all shadow-md">
                  <FiLinkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-[var(--bg-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--text-secondary)]/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-[var(--bg-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--text-secondary)]/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-[var(--bg-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--text-secondary)]/50 resize-none"
                  placeholder="How can I help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-[var(--accent)] text-white px-6 py-4 rounded-xl font-bold hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-[var(--accent)]/30"
              >
                <span>Send Message</span>
                <FiSend />
              </button>
              {status && <p className="text-center font-medium mt-4 text-[var(--accent)]">{status}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
