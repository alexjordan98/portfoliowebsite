import React from 'react';

/**
 * Container component props interface
 * Provides flexible container wrapper with multiple sizing and alignment options
 */
interface ContainerProps {
    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes to apply to the container */
    className?: string;

    /** Main content of the container */
    children: React.ReactNode;

    /** Container size variant - affects max-width and padding */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /** Where the content inside the container will be aligned */
    childAlignment?: 'child-left' | 'child-right' | 'child-center';

    /** Where the container itself will be aligned in its surrounding component */
    selfAlignment?: 'self-left' | 'self-right' | 'self-center';

    /** Whether the children in the container will be side by side or on top of each other */
    childLayout?: 'horizontal' | 'vertical';

    /** Click handler for the entire container */
    onClick?: () => void;
}

/**
 * Container component for wrapping and constraining content width
 *
 *
 * @example
 * ```tsx
 * // Basic container
 * <Container size="lg" childAlignment="child-center">
 *   Content
 * </Container>
 * ```
 *
 * @param props - Container component props
 * @returns JSX element representing a styled container wrapper
 */
export default function Container({
    id,
    className = '',
    children,
    size = 'md',
    childAlignment = 'child-center',
    selfAlignment = 'self-center',
    childLayout = 'vertical',
    onClick,
}: ContainerProps) {
    const containerClasses = [
        'container',
        `container-${size}`,
        childAlignment !== 'child-center' ? `container-${childAlignment}` : '',
        selfAlignment !== 'self-center' ? `container-${selfAlignment}` : '',
        childLayout !== 'vertical' ? `container-${childLayout}` : '',
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
            className={containerClasses}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            id={id}
        >
            {children}
        </div>
    );
}