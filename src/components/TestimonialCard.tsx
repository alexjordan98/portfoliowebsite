import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export default function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div className="card">
      "{quote}"<br />
      – {name}, {title}
    </div>
  );
}