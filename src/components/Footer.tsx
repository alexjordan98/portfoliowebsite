import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link
          href={process.env.NEXT_PUBLIC_LINKEDIN as string}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB as string}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </Link>
      </div>
      <div className="footer-copyright">
        © 2025 JordanTheSoftwareDeveloper.com
      </div>
    </footer>
  );
}