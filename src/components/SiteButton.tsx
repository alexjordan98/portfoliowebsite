import React from 'react';

/**
 * SiteButton component props interface
 * Provides consistent button styling throughout the project
 */
interface SiteButtonProps {
  /** HTML id attribute */
  id?: string;

  /** Additional CSS classes */
  className?: string;

  /** Button text content */
  text: string;

  /** Where the button leads */
  destination?: string;

  /** Modern button variant with warm professional styling */
  variant?: 'default' | 'card' | 'modal-opener' | 'link';

  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';

  /** Button size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Disabled state */
  disabled?: boolean;

  /** Loading state with spinner */
  loading?: boolean;

  /** Icon to display before text */
  iconBefore?: React.ReactNode;

  /** Icon to display after text */
  iconAfter?: React.ReactNode;

  /** Click handler */
  onClick?: () => void;
}

/**
 * SiteButton component to provide consistent buttons throughout the project
 *
 * @example
 * ```tsx
 * // Basic button
 * <SiteButton text="Click Me" onClick={handleClick} />
 *
 * // Loading state
 * <SiteButton
 *   text="Saving..."
 *   variant="default"
 *   loading={isLoading}
 *   disabled={isLoading}
 * />
 *
 * // Link button
 * <SiteButton
 *   text="Visit Site"
 *   variant="link"
 *   destination="https://example.com"
 *   iconAfter={<ExternalLinkIcon />}
 * />
 *
 * // Modal opener (renders as small circle with +)
 * <SiteButton
 *   text="Open Modal"
 *   variant="modal-opener"
 *   onClick={openModal}
 * />
 * ```
 *
 * @param props - SiteButton component props
 * @returns TSX element representing a styled button or link
 */
export default function SiteButton({
  id,
  className = '',
  text,
  destination,
  variant = 'default',
  type = 'button',
  size = 'md',
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter,
  onClick,
}: SiteButtonProps) {
  if (variant === 'modal-opener') {
    return (
      <button
        className={[
          'site-button',
          'button-modal-opener',
          disabled ? 'button-disabled' : '',
          className
        ].filter(Boolean).join(' ')}
        id={id}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={text}
      >
        <span className="modal-opener-icon">+</span>
      </button>
    );
  }

  const buttonClasses = [
    'site-button',
    `button-${size}`,
    variant !== 'default' ? `button-${variant}` : '',
    disabled ? 'button-disabled' : '',
    loading ? 'button-loading' : '',
    className
  ].filter(Boolean).join(' ');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  if (destination) {
    const isExternal = destination.startsWith('http') || destination.startsWith('//');

    return (
      <a
        href={destination}
        className={buttonClasses}
        id={id}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
      >
        {iconBefore && <span className="button-icon-before">{iconBefore}</span>}
        {loading ? (
          <span className="button-spinner" aria-label="Loading">
            <span className="spinner"></span>
          </span>
        ) : (
          text
        )}
        {iconAfter && <span className="button-icon-after">{iconAfter}</span>}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      id={id}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      type={type}
    >
      {iconBefore && <span className="button-icon-before">{iconBefore}</span>}
      {loading ? (
        <span className="button-spinner" aria-label="Loading">
          <span className="spinner"></span>
        </span>
      ) : (
        text
      )}
      {iconAfter && <span className="button-icon-after">{iconAfter}</span>}
    </button>
  );
}