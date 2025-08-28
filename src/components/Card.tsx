import React from 'react';

/**
 * Card component props interface
 * Provides flexible card container with multiple styling variants
 */
interface CardProps {
    /** Main content of the card */
    children: React.ReactNode;

    /** Additional CSS classes to apply to the card */
    className?: string;

    /** Card size variant - affects padding and max-width */
    size?: 'sm' | 'md' | 'lg' | 'full';

    /** Card style variant - affects background and styling */
    variant?: 'default' | 'primary' | 'accent' | 'outline' | 'glass';

    /** Whether card should have hover effects */
    hoverable?: boolean;

    /** Click handler for the entire card */
    onClick?: () => void;

    /** Additional inline styles */
    style?: React.CSSProperties;

    /** HTML id attribute */
    id?: string;

    /** Accessibility role */
    role?: string;

    /** Tab index for keyboard navigation */
    tabIndex?: number;
}

/**
 * Card component for containing and styling content blocks
 *
 * Compatible with styles/components/_cards.scss classes:
 * - .card (base styles)
 * - .card-sm, .card-lg, .card-full (size variants)
 * - .card-primary, .card-accent, .card-outline, .card-glass (style variants)
 *
 * Use with existing SCSS classes for card content areas:
 * - .card-header (for headers with titles)
 * - .card-body (for main content)
 * - .card-footer (for actions/metadata)
 * - .card-title, .card-subtitle (for typography)
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <div className="card-header">
 *     <h3 className="card-title">Card Title</h3>
 *   </div>
 *   <div className="card-body">
 *     <p>Card content goes here</p>
 *   </div>
 * </Card>
 *
 * // Card with variants
 * <Card size="lg" variant="primary" hoverable onClick={handleClick}>
 *   Content
 * </Card>
 * ```
 *
 * @param props - Card component props
 * @returns JSX element representing a styled card container
 */
export default function Card({
    children,
    className = '',
    size = 'md',
    variant = 'default',
    hoverable = true,
    onClick,
    style,
    id,
    role,
    tabIndex
}: CardProps) {
    const cardClasses = [
        'card',
        size !== 'md' ? `card-${size}` : '',
        variant !== 'default' ? `card-${variant}` : '',
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
        <div
            className={cardClasses}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            style={style}
            id={id}
            role={role || (onClick ? 'button' : undefined)}
            tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
        >
            {children}
        </div>
    );
}