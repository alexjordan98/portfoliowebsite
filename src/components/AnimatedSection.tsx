"use client"
import React from 'react';
import { useScrollAnimation, animationVariants } from '@/hooks/useScrollAnimation';

/**
 * Props interface for AnimatedSection component
 */
interface AnimatedSectionProps {
  /** Content to be animated */
  children: React.ReactNode;

  /** Animation variant to apply */
  animation?: keyof typeof animationVariants;

  /** Custom animation classes (overrides variant) */
  customAnimation?: {
    initial: string;
    animate: string;
    transition: string;
  };

  /** Animation delay in milliseconds */
  delay?: number;

  /** Animation duration in milliseconds */
  duration?: number;

  /** Intersection threshold (0-1) */
  threshold?: number;

  /** Whether animation triggers only once */
  triggerOnce?: boolean;

  /** Additional CSS classes to apply */
  className?: string;

  /** HTML element tag to use as wrapper */
  as?: keyof JSX.IntrinsicElements;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * AnimatedSection component for scroll-triggered animations
 *
 * Wraps content with smooth scroll-based entrance animations using IntersectionObserver.
 * Provides predefined animation variants or accepts custom animation classes.
 * Optimized for performance with proper cleanup and minimal re-renders.
 *
 * @example
 * ```tsx
 * // Basic fade-in animation
 * <AnimatedSection animation="fadeIn">
 *   <h1>This will fade in when scrolled into view</h1>
 * </AnimatedSection>
 *
 * // Fade up with custom delay
 * <AnimatedSection animation="fadeUp" delay={200}>
 *   <Card>This card will fade up after 200ms delay</Card>
 * </AnimatedSection>
 *
 * // Custom animation classes
 * <AnimatedSection
 *   customAnimation={{
 *     initial: 'opacity-0 scale-50',
 *     animate: 'opacity-100 scale-100',
 *     transition: 'transition-all duration-700 ease-bounce'
 *   }}
 * >
 *   <div>Custom animated content</div>
 * </AnimatedSection>
 * ```
 *
 * @param props - AnimatedSection component props
 * @returns JSX element with scroll-triggered animation applied
 */
export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  customAnimation,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  as: Element = 'div',
  style
}: AnimatedSectionProps) {
  const { ref, inView } = useScrollAnimation({
    threshold,
    delay,
    duration,
    triggerOnce
  });

  const animationClasses = customAnimation || animationVariants[animation];

  const appliedClasses = [
    animationClasses.transition,
    inView ? animationClasses.animate : animationClasses.initial,
    className
  ].filter(Boolean).join(' ');

  return (
    <Element
      ref={ref}
      className={appliedClasses}
      style={style}
    >
      {children}
    </Element>
  );
}