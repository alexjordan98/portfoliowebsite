import React from 'react';

interface TitleProps {
  text: string;
  fontSize: number;
  color: string;
}

export default function Title({ text, fontSize, color }: TitleProps) {
  return (
    <h1
      className="title"
      style={{
        fontSize: `${fontSize}px`,
        color,
      }}
    >
      {text}
    </h1>
  );
}
