import React from 'react';

/**
 * WorkingSVG component props interface
 */
interface WorkingSVGProps {
  /** Optional CSS class name for styling */
  className?: string;

  /** Optional width override */
  width?: number;

  /** Optional height override */
  height?: number;
}


export default function WorkingSVG({
  className = 'working-svg',
  width = 300,
  height = 400
}: WorkingSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="50" y="200" width="200" height="120" rx="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
      <rect x="60" y="210" width="180" height="100" rx="4" fill="#1F2937"/>
      <rect x="70" y="220" width="160" height="80" rx="2" fill="#3B82F6"/>

      <circle cx="150" cy="150" r="40" fill="#F3F4F6"/>
      <circle cx="150" cy="140" r="25" fill="#FDE68A"/>
      <circle cx="140" cy="135" r="3" fill="#374151"/>
      <circle cx="160" cy="135" r="3" fill="#374151"/>
      <path d="M 135 145 Q 150 155 165 145" stroke="#374151" strokeWidth="2" fill="none"/>

      <rect x="110" y="180" width="80" height="60" rx="8" fill="#6366F1"/>

      <rect x="90" y="190" width="30" height="80" rx="15" fill="#F3F4F6"/>
      <rect x="180" y="190" width="30" height="80" rx="15" fill="#F3F4F6"/>

      <circle cx="120" cy="350" r="20" fill="#374151"/>
      <circle cx="180" cy="350" r="20" fill="#374151"/>

      <rect x="40" y="320" width="220" height="15" rx="7" fill="#D1D5DB"/>
    </svg>
  );
}