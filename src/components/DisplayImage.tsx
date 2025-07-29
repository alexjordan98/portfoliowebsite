import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface DisplayImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
}

export default function DisplayImage({ 
  src, 
  alt, 
  width = 300, 
  height = 300, 
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  onClick 
}: DisplayImageProps) {
  const imageClasses = `
    ${className}
    ${onClick ? 'cursor-pointer' : ''}
  `.trim();

  if (fill) {
    return (
      <div className={`relative ${imageClasses}`} onClick={onClick}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={imageClasses}
      style={{ objectFit }}
      onClick={onClick}
    />
  );
}