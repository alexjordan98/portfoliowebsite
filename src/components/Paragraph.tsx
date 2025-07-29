import React from 'react';

interface ParagraphProps {
  text: string;
  fontSize: number;
  color?: string;
  hasShadow?: boolean
}

export default function Paragraph({ text, fontSize, color = "#000000", hasShadow = true}: ParagraphProps) {
  return (
    <p
      className="paragraph"
      style={{
        fontSize: `${fontSize}px`,
        color,
        textShadow: hasShadow ? '2px 2px #aaa' : 'none'
      }}
    >
      {text}
    </p>
  );
}
