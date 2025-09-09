import React from 'react';

/**
 * Paragraph component props interface
 * Enhanced with typography variants and better text control
 */
interface ParagraphProps {
  /** The text content of the paragraph */
  text: string;

  /** Font size in pixels (for backward compatibility) */
  fontSize?: number;

  /** Text color (CSS color value) */
  color?: string;

  /** Whether to show text shadow (default: true for backward compatibility) */
  shadow?: boolean;

  /** Typography size variant */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

  /** Typography variant for different contexts */
  variant?: 'default' | 'lead' | 'body' | 'caption' | 'muted' | 'inverse';

  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Font weight */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

  /** Line height for better readability */
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';

  /** Maximum width constraint for optimal readability */
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'prose';

  /** Margin bottom spacing */
  marginBottom?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Additional CSS classes */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** HTML id attribute */
  id?: string;

  /** Whether text should be selectable (default: true) */
  selectable?: boolean;

  /** Semantic HTML element to use */
  as?: 'p' | 'span' | 'div' | 'blockquote' | 'figcaption';

  /** Click handler for interactive paragraphs */
  onClick?: () => void;

  /** Whether to truncate text with ellipsis */
  truncate?: boolean;

  /** Number of lines to clamp (for multi-line truncation) */
  clamp?: number;
}

/**
 * Enhanced Paragraph component with improved typography and semantic options
 *
 * Provides flexible text rendering with semantic meaning while maintaining backward compatibility
 * with existing fontSize prop. Supports various typography variants and responsive text sizing.
 *
 * Compatible with styles/base/_typography.scss classes and maintains existing .paragraph class.
 *
 * @example
 * ```tsx
 * // Backward compatible usage
 * <Paragraph text="Some text" fontSize={18} color="#333" />
 *
 * // New enhanced usage
 * <Paragraph
 *   text="Lead paragraph with better readability"
 *   variant="lead"
 *   size="lg"
 *   maxWidth="prose"
 *   lineHeight="relaxed"
 * />
 *
 * // Semantic usage
 * <Paragraph
 *   text="Caption text below an image"
 *   as="figcaption"
 *   variant="caption"
 *   size="sm"
 *   align="center"
 * />
 *
 * // Interactive paragraph
 * <Paragraph
 *   text="Clickable description"
 *   onClick={handleClick}
 *   variant="body"
 *   truncate
 * />
 * ```
 *
 * @param props - Paragraph component props
 * @returns JSX element representing styled text content
 */
export default function Paragraph({
  text,
  fontSize,
  color = "#000000",
  shadow = false,
  size = 'base',
  variant = 'default',
  align = 'center',
  weight = 'normal',
  lineHeight = 'relaxed',
  maxWidth = 'md',
  marginBottom = 'md',
  className = '',
  style = {},
  id,
  selectable = true,
  as: Element = 'p',
  onClick,
  truncate = false,
  clamp
}: ParagraphProps) {
  const paragraphClasses = [
    'paragraph',
    size !== 'base' ? `text-${size}` : '',
    variant !== 'default' ? `text-${variant}` : '',
    align !== 'center' ? `text-${align}` : '',
    weight !== 'normal' ? `font-${weight}` : '',
    lineHeight !== 'relaxed' ? `leading-${lineHeight}` : '',
    maxWidth !== 'md' && maxWidth !== 'none' ? `max-w-${maxWidth}` : '',
    marginBottom !== 'md' && marginBottom !== 'none' ? `mb-${marginBottom}` : '',
    truncate ? 'truncate' : '',
    clamp ? `line-clamp-${clamp}` : '',
    !selectable ? 'select-none' : '',
    onClick ? 'cursor-pointer hover-opacity-80' : '',
    className
  ].filter(Boolean).join(' ');

  const paragraphStyles: React.CSSProperties = {
    color,
    textShadow: shadow ? '2px 2px #aaa' : 'none',
    userSelect: selectable ? 'text' : 'none',
    ...(fontSize && { fontSize: `${fontSize}px` }),
    ...(maxWidth === 'prose' && { maxWidth: '65ch' }),
    ...(maxWidth === 'md' && !fontSize && { maxWidth: '600px' }),
    ...style
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Element
      className={paragraphClasses}
      style={paragraphStyles}
      id={id}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {text}
    </Element>
  );
}