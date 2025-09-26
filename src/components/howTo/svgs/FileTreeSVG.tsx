import React from 'react';

/**
 * FileTreeSVG component props interface
 */
interface FileTreeSVGProps {
  /** Optional CSS class name for styling */
  className?: string;

  /** Optional width override */
  width?: number;

  /** Optional height override */
  height?: number;
}

export default function FileTreeSVG({
  className = 'filetree-svg',
  width = 300,
  height = 400
}: FileTreeSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background panel */}
      <rect x="20" y="20" width="260" height="360" rx="8" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />

      {/* app/ */}
      <text x="40" y="60" fontFamily="monospace" fontSize="14" fill="#111827" fontWeight="bold">app/</text>
      <text x="60" y="80" fontFamily="monospace" fontSize="13" fill="#374151">page.tsx</text>
      <text x="60" y="100" fontFamily="monospace" fontSize="13" fill="#374151">resume/</text>
      <text x="80" y="120" fontFamily="monospace" fontSize="13" fill="#4B5563">page.tsx</text>

      {/* components/ */}
      <text x="40" y="150" fontFamily="monospace" fontSize="14" fill="#111827" fontWeight="bold">components/</text>
      <text x="60" y="170" fontFamily="monospace" fontSize="13" fill="#374151">Card.tsx</text>
      <text x="60" y="190" fontFamily="monospace" fontSize="13" fill="#374151">Navbar.tsx</text>
      <text x="60" y="210" fontFamily="monospace" fontSize="13" fill="#374151">resume/</text>
      <text x="80" y="230" fontFamily="monospace" fontSize="13" fill="#4B5563">ResumeTabs.tsx</text>

      {/* styles/ */}
      <text x="40" y="260" fontFamily="monospace" fontSize="14" fill="#111827" fontWeight="bold">styles/</text>
      <text x="60" y="280" fontFamily="monospace" fontSize="13" fill="#374151">globals.scss</text>
      <text x="60" y="300" fontFamily="monospace" fontSize="13" fill="#374151">_card.scss</text>

      {/* backend/ */}
      <text x="40" y="330" fontFamily="monospace" fontSize="14" fill="#111827" fontWeight="bold">backend/</text>
      <text x="60" y="350" fontFamily="monospace" fontSize="13" fill="#374151">controllers/</text>
      <text x="80" y="370" fontFamily="monospace" fontSize="13" fill="#4B5563">SkillController.java</text>
    </svg>
  );
}
