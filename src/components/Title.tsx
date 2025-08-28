import React from 'react';

/**
 * Title component props interface
 * Enhanced with hierarchy support and semantic HTML options
 */
interface TitleProps {
  /** The text content of the title */
  text: string;

  /** Font size in pixels (for backward compatibility) */
  fontSize?: number;

  /** Text color (CSS color value) */
  color?: string;

  /** Semantic heading level - determines HTML tag and styling hierarchy */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /** Visual size variant (can differ from semantic level) */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

  /** Typography variant for different contexts */
  variant?: 'default' | 'display' | 'hero' | 'section' | 'card' | 'subtle';

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** Whether to show text shadow (default: true for backward compatibility) */
  shadow?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** HTML id attribute */
  id?: string;

  /** Click handler for interactive titles */
  onClick?: () => void;

  /** Font weight override */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

  /** Line height override */
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
}

/**
 * Enhanced Title component with semantic HTML and hierarchy support
 *
 * Provides flexible typography with semantic meaning while maintaining backward compatibility
 * with existing fontSize prop. Uses semantic HTML heading tags (h1-h6) based on level prop.
 *
 * Compatible with styles/base/_typography.scss classes and maintains existing .title class.
 *
 * @example
 * ```tsx
 * // Backward compatible usage
 * <Title text="Page Title" fontSize={48} color="#000000" />
 *
 * // New semantic usage
 * <Title text="Main Heading" level={1} variant="hero" />
 * <Title text="Section Title" level={2} size="3xl" variant="section" />
 * <Title text="Card Title" level={3} variant="card" className="card-title" />
 *
 * // Mixed usage for specific needs
 * <Title
 *   text="Custom Title"
 *   level={2}
 *   size="2xl"
 *   variant="display"
 *   align="center"
 *   weight="semibold"
 * />
 * ```
 *
 * @param props - Title component props
 * @returns JSX element representing a semantic heading with proper typography
 */
export default function Title({
  text,
  fontSize,
  color = "#000000",
  level = 1,
  size,
  variant = 'default',
  align = 'center',
  shadow = true,
  className = '',
  style = {},
  id,
  onClick,
  weight,
  lineHeight
}: TitleProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const titleClasses = [
    'title',
    size ? `text-${size}` : '',
    variant !== 'default' ? `title-${variant}` : '',
    align !== 'center' ? `text-${align}` : '',
    weight ? `font-${weight}` : '',
    lineHeight ? `leading-${lineHeight}` : '',
    onClick ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');

  const titleStyles: React.CSSProperties = {
    color,
    textShadow: shadow ? '2px 2px #aaa' : 'none',
    ...(fontSize && { fontSize: `${fontSize}px` }),
    ...style
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <HeadingTag
      className={titleClasses}
      style={titleStyles}
      id={id}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {text}
    </HeadingTag>
  );
}