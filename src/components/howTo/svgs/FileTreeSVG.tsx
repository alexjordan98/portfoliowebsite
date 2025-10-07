import React from 'react';

/**
 * FileTreeSVG component props interface
 */
interface FileTreeSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function FileTreeSVG({
  className = 'filetree-svg',
  width = 350,
  height = 560
}: FileTreeSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 350 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
        </marker>
      </defs>

      <rect x="10" y="10" width="330" height="540" rx="8" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />

      <g transform="translate(30, 40)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="14" fill="#111827">app/</text>
      </g>

      <g transform="translate(60, 70)">
        <rect x="0" y="0" width="18" height="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#EFF6FF" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#1E3A8A">page.tsx</text>
      </g>

      <g transform="translate(60, 100)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="13" fill="#111827">resume/</text>
      </g>
      <g transform="translate(90, 130)">
        <rect x="0" y="0" width="18" height="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#EFF6FF" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#1E3A8A">page.tsx</text>
      </g>
      <g transform="translate(30, 170)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="14" fill="#111827">components/</text>
      </g>
      <g transform="translate(60, 200)">
        <rect x="0" y="0" width="18" height="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#EFF6FF" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#1E3A8A">Card.tsx</text>
      </g>
      <g transform="translate(60, 230)">
        <rect x="0" y="0" width="18" height="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#EFF6FF" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#1E3A8A">Navbar.tsx</text>
      </g>
      <g transform="translate(60, 260)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="13" fill="#111827">resume/</text>
      </g>
      <g transform="translate(90, 290)">
        <rect x="0" y="0" width="18" height="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#EFF6FF" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#1E3A8A">ResumeTabs.tsx</text>
      </g>
      <g transform="translate(30, 330)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="14" fill="#111827">styles/</text>
      </g>
      <g transform="translate(60, 360)">
        <rect x="0" y="0" width="18" height="22" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#FFF1F2" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#9D174D">globals.scss</text>
      </g>
      <g transform="translate(60, 390)">
        <rect x="0" y="0" width="18" height="22" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#FFF1F2" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#9D174D">_card.scss</text>
      </g>
      <g transform="translate(30, 430)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="14" fill="#111827">backend/</text>
      </g>
      <g transform="translate(60, 460)">
        <rect x="0" y="0" width="28" height="18" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        <text x="40" y="13" fontFamily="monospace" fontSize="13" fill="#111827">controllers/</text>
      </g>
      <g transform="translate(90, 490)">
        <rect x="0" y="0" width="18" height="22" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
        <polygon points="18,0 18,8 10,0" fill="#F0FDF4" />
        <text x="30" y="15" fontFamily="monospace" fontSize="13" fill="#166534">SkillController.java</text>
      </g>
    </svg>
  );
}
