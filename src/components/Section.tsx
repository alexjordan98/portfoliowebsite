import React from 'react';

/**
 * Section component props interface
 * Provides consistent vertical spacing and semantic sectioning for page content
 */
interface SectionProps {
  /** Content of the section */
  children: React.ReactNode;

  /** Additional CSS classes to apply to the section */
  className?: string;

  /** Section padding size variant */
  spacing?: 'sm' | 'md' | 'lg';

  /** Background variant for the section */
  background?: 'default' | 'alt' | 'card' | 'primary' | 'accent';

  /** Whether to apply a Container wrapper inside the section */
  contained?: boolean;

  /** Container size when contained=true */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** HTML id attribute */
  id?: string;

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** Accessibility labelledby reference */
  'aria-labelledby'?: string;
}

/**
 * Section component for semantic page sections with consistent spacing
 *
 * Compatible with styles/base/_layout.scss classes:
 * - .section (base section with standard vertical padding)
 * - .section-sm (smaller vertical padding)
 * - .section-lg (larger vertical padding)
 *
 * Also works with background color utilities from styles/utilities/_colors.scss:
 * - .bg-primary, .bg-secondary, .bg-card, etc.
 *
 * Can optionally wrap content in a Container component for consistent max-width.
 *
 * @example
 * ```tsx
 * // Basic section with default spacing
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 *
 * // Section with contained content and custom background
 * <Section contained background="alt" spacing="lg">
 *   <h2>Contained Section</h2>
 *   <p>This content will be contained within max-width</p>
 * </Section>
 *
 * // Section with custom container size and accessibility
 * <Section
 *   contained
 *   containerSize="sm"
 *   aria-label="Feature highlights section"
 * >
 *   <div>Focused content area</div>
 * </Section>
 * ```
 *
 * @param props - Section component props
 * @returns JSX element representing a semantic section with consistent spacing
 */
export default function Section({
  children,
  className = '',
  spacing = 'md',
  background = 'default',
  contained = false,
  containerSize = 'md',
  style,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SectionProps) {
  const Container = React.lazy(() => import('./Container'));

  const sectionClasses = [
    spacing === 'md' ? 'section' : `section-${spacing}`,
    background !== 'default' ? `bg-${background}` : '',
    className
  ].filter(Boolean).join(' ');

  const content = contained ? (
    <React.Suspense fallback={<div>{children}</div>}>
      <Container size={containerSize}>
        {children}
      </Container>
    </React.Suspense>
  ) : children;

  return (
    <section
      className={sectionClasses}
      style={style}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {content}
    </section>
  );
}