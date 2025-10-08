import React from 'react';

/**
 * Title component props interface
 * Enhanced with hierarchy support and semantic HTML options
 */
interface TitleProps {
  /** HTML id attribute */
  id?: string;

  /** Additional CSS classes */
  className?: string;

  /** The text content of the title */
  text: string;

  /** Semantic heading level - determines HTML tag and styling hierarchy */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /** Typography variant for different contexts */
  variant?: 'default' | 'card';

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  //* underlined
  underlined?: boolean;

  /** Whether to show text shadow */
  shadow?: boolean;

  /** Click handler for interactive titles */
  onClick?: () => void;
}

/**
 * Enhanced Title component with semantic HTML and hierarchy support
 *
 *
 * @example
 * ```tsx

 * // examples
 * <Title text="Main Heading" level={1} variant="default" />
 *
 * <Title
 *   text="Custom Title"
 *   level={2}
 *   variant="default"
 *   align="center"
 * />
 * ```
 *
 * @param props - Title component props
 * @returns TSX element representing a semantic heading with proper typography
 */
export default function Title({
  id,
  className = '',
  text,
  level = 1,
  variant = 'default',
  align = 'center',
  underlined= false,
  shadow = false,
  onClick,
}: TitleProps) {
  const HeadingTag = `h${level}` as React.ElementType;;

  const titleClasses = [
    'title',
    variant !== 'default' ? `title-${variant}` : '',
    `title-${align}`,
    underlined ? `title-underlined` : '',
    shadow ? `title-shadow` : '',
    onClick ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');


  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <HeadingTag
      className={titleClasses}
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