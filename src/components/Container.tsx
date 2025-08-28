import React from 'react';

/**
 * Container component props interface
 * Provides consistent max-width and centering for page content
 */
interface ContainerProps {
  /** Content to be contained and centered */
  children: React.ReactNode;

  /** Additional CSS classes to apply to the container */
  className?: string;

  /** Container size variant - affects max-width */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** HTML id attribute */
  id?: string;

  /** HTML element tag to use (div, main, section, etc.) */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Container component for consistent page layout and content centering
 *
 * Compatible with styles/base/_layout.scss classes:
 * - .container (base container with max-width 1200px)
 * - .container-sm (max-width 800px)
 * - .container-lg (max-width 1400px)
 * - .container-full (full width, no max-width)
 * - .container-responsive (responsive container with smart padding)
 *
 * Provides consistent horizontal padding and centers content within max-width boundaries.
 * Works with the responsive utilities for different screen sizes.
 *
 * @example
 * ```tsx
 * // Default container (1200px max-width)
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * // Small container for focused content
 * <Container size="sm">
 *   <article>Blog post content</article>
 * </Container>
 *
 * // Full width container
 * <Container size="full" as="section">
 *   <div>Full width section</div>
 * </Container>
 *
 * // Responsive container with smart padding
 * <Container className="container-responsive">
 *   <div>Responsive content</div>
 * </Container>
 * ```
 *
 * @param props - Container component props
 * @returns JSX element representing a content container
 */
export default function Container({
  children,
  className = '',
  size = 'md',
  style,
  id,
  as: Element = 'div'
}: ContainerProps) {
  const containerClasses = [
    size === 'md' ? 'container' : `container-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Element
      className={containerClasses}
      style={style}
      id={id}
    >
      {children}
    </Element>
  );
}