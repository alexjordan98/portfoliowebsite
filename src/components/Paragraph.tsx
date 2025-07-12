import React from 'react';

interface ParagraphProps {
  text: string;
  fontSize: number;
  color: string;
}

export default function Paragraph({ text, fontSize, color }: ParagraphProps) {
  return (
    <p
      className="paragraph"
      style={{
        fontSize: `${fontSize}px`,
        color,
      }}
    >
      {text}
    </p>
  );
}
