import React from 'react';

/**
 * SiteButton component props interface
 * Enhanced with modern button patterns and warm professional styling
 */
interface SiteButtonProps {
  /** Button text content */
  text: string;

  /** Button type/variant */
  type?: 'primary-button' | 'secondary-button';

  /** Modern button variant with warm professional styling */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';

  /** Button size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Button width variant */
  width?: 'auto' | 'full' | 'fit';

  /** Click handler */
  onClick?: () => void;

  /** Disabled state */
  disabled?: boolean;

  /** Loading state with spinner */
  loading?: boolean;

  /** Icon to display before text */
  iconBefore?: React.ReactNode;

  /** Icon to display after text */
  iconAfter?: React.ReactNode;

  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';

  /** Additional CSS classes */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** HTML id attribute */
  id?: string;

  /** Accessibility label */
  'aria-label'?: string;

  /** Accessibility described-by */
  'aria-describedby'?: string;

  /** Tab index for keyboard navigation */
  tabIndex?: number;

  /** Whether button should auto-focus on mount */
  autoFocus?: boolean;

  /** External link URL (renders as anchor tag) */
  href?: string;

  /** Target for external links */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /** Relationship for external links */
  rel?: string;
}

/**
 * Enhanced SiteButton component with warm professional styling and modern patterns
 *
 * Provides flexible button styling with semantic meaning while maintaining backward compatibility
 * with existing type prop. Supports various button states, sizes, and interaction patterns.
 *
 * Compatible with styles/components/_buttons.scss classes and maintains existing button classes.
 *
 * @example
 * ```tsx
 * // Backward compatible usage
 * <SiteButton text="Click Me" type="primary-button" />
 *
 * // Modern enhanced usage
 * <SiteButton
 *   text="Get Started"
 *   variant="primary"
 *   size="lg"
 *   iconAfter={<ArrowIcon />}
 *   onClick={handleClick}
 * />
 *
 * // Loading state
 * <SiteButton
 *   text="Saving..."
 *   variant="primary"
 *   loading={isLoading}
 *   disabled={isLoading}
 * />
 *
 * // Link button
 * <SiteButton
 *   text="Visit Site"
 *   variant="outline"
 *   href="https://example.com"
 *   target="_blank"
 *   iconAfter={<ExternalLinkIcon />}
 * />
 *
 * // Ghost button with icon
 * <SiteButton
 *   text="Settings"
 *   variant="ghost"
 *   size="sm"
 *   iconBefore={<SettingsIcon />}
 * />
 * ```
 *
 * @param props - SiteButton component props
 * @returns JSX element representing a styled button or link
 */
export default function SiteButton({
  text,
  type,
  variant = 'primary',
  size = 'md',
  width = 'auto',
  onClick,
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter,
  htmlType = 'button',
  className = '',
  style = {},
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  tabIndex,
  autoFocus = false,
  href,
  target,
  rel = target === '_blank' ? 'noopener noreferrer' : undefined
}: SiteButtonProps) {
  const resolvedVariant = type === 'primary-button' ? 'primary' :
    type === 'secondary-button' ? 'secondary' :
      variant;

  const buttonClasses = [
    type || `${resolvedVariant}-button`,
    size !== 'md' ? `button-${size}` : '',
    width === 'full' ? 'button-full' : '',
    width === 'fit' ? 'button-fit' : '',
    disabled ? 'button-disabled' : '',
    loading ? 'button-loading' : '',
    'transition-all duration-200 ease-in-out',
    className
  ].filter(Boolean).join(' ');

  const isInteractionDisabled = disabled || loading;

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && iconBefore && <span className="mr-2">{iconBefore}</span>}
      <span>{text}</span>
      {!loading && iconAfter && <span className="ml-2">{iconAfter}</span>}
    </>
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isInteractionDisabled && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        style={style}
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={tabIndex}
        onClick={!isInteractionDisabled ? onClick : undefined}
        onKeyDown={handleKeyDown}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      className={buttonClasses}
      style={style}
      id={id}
      disabled={isInteractionDisabled}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
    >
      {buttonContent}
    </button>
  );
}