import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="https://linkedin.com/in/alexander-jordan-23b4a7162" target="_blank" rel="noopener noreferrer" className="footer-link">
          LinkedIn
        </Link>
        <Link href="https://github.com/alexjordan98" target="_blank" rel="noopener noreferrer" className="footer-link">
          GitHub
        </Link>
      </div>
      <div className="footer-copyright">
        © 2025 JordanTheSoftwareDeveloper.com
      </div>
    </footer>
  );
}