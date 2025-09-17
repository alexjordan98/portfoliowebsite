import React from 'react';

/**
 * Card component props interface
 * Provides flexible card container with multiple styling variants
 */
interface CardProps {
    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes to apply to the card */
    className?: string;

    /** Main content of the card */
    children: React.ReactNode;

    /** Card size variant - affects padding and max-width */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /** Card style variant - affects background and styling */
    variant?: 'default' | 'inModal' | 'openModal' | 'list' ;

    /** Where the things inside the card like the tiltle and body will be aligned */
    childAlignment?: 'child-left' | 'child-right' | 'child-center';

    /** Where the card itself will be aligned in its surrounding component */
    selfAlignment?: 'self-left' | 'self-right' | 'self-center';

    /** Whether the children in the card will be side by side or on top of each other  */
    childLayoutt?: 'horizontal' | 'vertical';

    /** Click handler for the entire card */
    onClick?: () => void;
}

/**
 * Card component for containing and styling content blocks
 *
 * Compatible with styles/components/_cards.scss classes:
 * - .card (base styles)
 * - .card-sm, .card-lg, .card-xl (size variants)
 *
 *
 * @example
 * ```tsx
 * // Card
 * <Card size="lg" variant="default">
 *   Content
 * </Card>
 * ```
 *
 * @param props - Card component props
 * @returns JSX element representing a styled card container
 */
export default function Card({
    id,
    className = '',
    children,
    size = 'md',
    variant = 'default',
    childAlignment ='child-center',
    selfAlignment = 'self-center',
    childLayoutt = 'vertical',
    onClick,
}: CardProps) {
    const cardClasses = [
        'card',
        `card-${size}`,
        variant !== 'default' ? `card-${variant}` : '',
        `card-${childAlignment}`,
        `card-${selfAlignment}`,
        childLayoutt !== 'vertical' ? `card-${childLayoutt}` : '',
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
            id={id}
        >
            {children}
        </div>
    );
}