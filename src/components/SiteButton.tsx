import React from 'react';

interface SiteButtonProps {
  text: string;
  type: string;
}

export default function SiteButton({ text, type }: SiteButtonProps) {
  return (
    <button 
        className={type}
    >
        {text}
    </button>
  );
}
