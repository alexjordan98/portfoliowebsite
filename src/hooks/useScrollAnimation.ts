"use client"
import { useEffect, useRef, useState } from 'react';

/**
 * Configuration options for scroll-triggered animations
 */
interface ScrollAnimationOptions {
  /** Threshold for when animation triggers (0-1, where 0.1 = 10% visible) */
  threshold?: number;

  /** Root margin for intersection observer (e.g., '0px 0px -100px 0px') */
  rootMargin?: string;

  /** Animation delay in milliseconds */
  delay?: number;

  /** Animation duration in milliseconds */
  duration?: number;

  /** Whether animation should trigger only once */
  triggerOnce?: boolean;

  /** Animation easing function */
  easing?: string;
}

/**
 * Return type for the scroll animation hook
 */
interface ScrollAnimationResult {
  /** Ref to attach to the element to be animated */
  ref: React.RefObject<HTMLElement | null>;

  /** Whether the element is currently in view and should be animated */
  inView: boolean;

  /** Whether the animation has been triggered */
  hasTriggered: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 *
 * Provides smooth, performant scroll-based animations with configurable options.
 * Uses IntersectionObserver API for optimal performance and battery life.
 *
 * @param options - Configuration options for the scroll animation
 * @returns Object containing ref, inView state, and trigger state
 *
 * @example
 * ```tsx
 * const { ref, inView } = useScrollAnimation({
 *   threshold: 0.2,
 *   delay: 100,
 *   triggerOnce: true
 * });
 *
 * return (
 *   <div
 *     ref={ref}
 *     className={`transition-all duration-500 ${
 *       inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
 *     }`}
 *   >
 *     Content to animate
 *   </div>
 * );
 * ```
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}): ScrollAnimationResult {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 500,
    triggerOnce = true,
    easing = 'ease-out'
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting && !hasTriggered) {
          if (delay > 0) {
            setTimeout(() => {
              setInView(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setInView(true);
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !isIntersecting) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay, triggerOnce, hasTriggered]);

  return {
    ref,
    inView,
    hasTriggered
  };
}

/**
 * Predefined animation variants for common scroll effects
 */
export const animationVariants = {
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-500 ease-out'
  },

  fadeUp: {
    initial: 'opacity-0 translate-y-8',
    animate: 'opacity-100 translate-y-0',
    transition: 'transition-all duration-500 ease-out'
  },

  fadeDown: {
    initial: 'opacity-0 -translate-y-8',
    animate: 'opacity-100 translate-y-0',
    transition: 'transition-all duration-500 ease-out'
  },

  fadeLeft: {
    initial: 'opacity-0 translate-x-8',
    animate: 'opacity-100 translate-x-0',
    transition: 'transition-all duration-500 ease-out'
  },

  fadeRight: {
    initial: 'opacity-0 -translate-x-8',
    animate: 'opacity-100 translate-x-0',
    transition: 'transition-all duration-500 ease-out'
  },

  scaleIn: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
    transition: 'transition-all duration-500 ease-out'
  }
} as const;