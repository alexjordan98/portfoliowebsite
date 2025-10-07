import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Paragraph component props interface
 * Enhanced with typography variants and better text control
 */
interface ParagraphProps {
  /** HTML id attribute */
  id?: string;

  /** Additional CSS classes */
  className?: string;

  /** The text content of the paragraph */
  text: string;

  /** Typography size variant */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

  /** Typography variant for different contexts */
  variant?: 'default' | 'card' | 'modal' | 'caption';

  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Whether to show text shadow (default: true for backward compatibility) */
  shadow?: boolean;

  /** Whether text should be selectable (default: true) */
  selectable?: boolean;

  /** Whether to truncate text with ellipsis */
  truncate?: boolean;

  /** Number of lines to clamp (for multi-line truncation) */
  clamp?: number;

  /** Click handler for interactive paragraphs */
  onClick?: () => void;
}

/**
 * Enhanced Paragraph component with improved typography and semantic options
 *
 *
 * @example
 * ```tsx
 * <Paragraph
 *   text="Lead paragraph with better readability"
 *   variant="default"
 *   size="lg"
 * />
 *
 * // Semantic usage
 * <Paragraph
 *   text="Caption text below an image"
 *   variant="caption"
 *   size="sm"
 *   align="center"
 * />
 *
 * // Interactive paragraph
 * <Paragraph
 *   text="Clickable description"
 *   onClick={handleClick}
 *   variant="defult"
 *   truncate
 * />
 * ```
 *
 * @param props - Paragraph component props
 * @returns JSX element representing styled text content
 */
export default function Paragraph({
  id,
  className = '',
  text,
  size = 'base',
  variant = 'default',
  align = 'center',
  shadow = false,
  selectable = true,
  truncate = false,
  clamp,
  onClick
}: ParagraphProps) {
  const paragraphClasses = [
    'paragraph',
    size !== 'base' ? `text-${size}` : '',
    variant !== 'default' ? `text-${variant}` : '',
    `text-${align}`,
    shadow  ? `text-shadow` : '',
    !selectable ? 'select-none' : '',
    truncate ? 'truncate' : '',
    clamp ? `line-clamp-${clamp}` : '',
    onClick ? 'cursor-pointer hover-opacity-80' : '',
    className
  ].filter(Boolean).join(' ');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={paragraphClasses}
      id={id}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}