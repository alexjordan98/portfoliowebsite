import React from 'react';

/**
 * RestaurantFlowSVG component props interface
 */
interface RestaurantFlowSVGProps {
  /** Optional CSS class name for styling */
  className?: string;

  /** Optional width override */
  width?: number;

  /** Optional height override */
  height?: number;
}

export default function RestaurantFlowSVG({
  className = 'restaurantflow-svg',
  width = 500,
  height = 180
}: RestaurantFlowSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Menu (Frontend) */}
      <rect x="20" y="50" width="90" height="60" rx="8" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2"/>
      <text x="40" y="85" fontFamily="sans-serif" fontSize="14" fill="#1E3A8A">Menu</text>
      <text x="28" y="105" fontFamily="sans-serif" fontSize="12" fill="#1E3A8A">(Frontend)</text>

      {/* Arrow to Kitchen */}
      <line x1="110" y1="80" x2="150" y2="80" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Kitchen (Backend) */}
      <rect x="150" y="50" width="100" height="60" rx="8" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2"/>
      <text x="165" y="85" fontFamily="sans-serif" fontSize="14" fill="#065F46">Kitchen</text>
      <text x="162" y="105" fontFamily="sans-serif" fontSize="12" fill="#065F46">(Backend)</text>

      {/* Arrow to Pantry */}
      <line x1="250" y1="80" x2="300" y2="80" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Pantry (Database) */}
      <rect x="300" y="50" width="100" height="60" rx="8" fill="#FDE68A" stroke="#CA8A04" strokeWidth="2"/>
      <text x="320" y="85" fontFamily="sans-serif" fontSize="14" fill="#78350F">Pantry</text>
      <text x="310" y="105" fontFamily="sans-serif" fontSize="12" fill="#78350F">(Database)</text>

      {/* Arrow to Building */}
      <line x1="400" y1="80" x2="450" y2="80" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Building (AWS) */}
      <rect x="450" y="50" width="100" height="60" rx="8" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2"/>
      <text x="465" y="85" fontFamily="sans-serif" fontSize="14" fill="#312E81">Building</text>
      <text x="470" y="105" fontFamily="sans-serif" fontSize="12" fill="#312E81">(AWS)</text>

      {/* Arrowhead definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
        </marker>
      </defs>
    </svg>
  );
}
