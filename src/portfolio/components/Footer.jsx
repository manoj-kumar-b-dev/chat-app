import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-[var(--bg-primary)] border-t border-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <p className="text-[var(--text-secondary)] text-sm mb-2 font-medium">
          Built with React & Tailwind CSS
        </p>
        <p className="text-[var(--text-secondary)]/70 text-xs">
          © {new Date().getFullYear()} All rights reserved. Let's build something amazing together.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
