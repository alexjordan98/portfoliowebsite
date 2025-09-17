import React from 'react';
import Container from './Container';

/**
 * Section component props interface
 * Provides flexible section wrapper with spacing, background, and container options
 */
interface SectionProps {
    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes to apply to the section */
    className?: string;

    /** Main content of the section */
    children: React.ReactNode;

    /** Section padding size variant */
    spacing?: 'sm' | 'md' | 'lg';

    /** Background variant for the section */
    background?: 'default' | 'card';

    /** Whether to apply a Container wrapper inside the section */
    contained?: boolean;

    /** Container size when contained=true */
    containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /** Where the content inside the section will be aligned */
    childAlignment?: 'child-left' | 'child-right' | 'child-center';

    /** Where the section itself will be aligned in its surrounding component */
    selfAlignment?: 'self-left' | 'self-right' | 'self-center';

    /** Whether the children in the section will be side by side or on top of each other */
    childLayout?: 'horizontal' | 'vertical';

    /** Click handler for the entire section */
    onClick?: () => void;
}

/**
 * Section component for creating page sections with optional container wrapping
 *
 * Compatible with styles/components/_section.scss classes:
 * - .section (base styles)
 * - .section-sm, .section-lg (spacing variants)
 * - .section-bg-default, .section-bg-card (background variants)
 *
 * @example
 * ```tsx
 * // Basic section with container
 * <Section spacing="lg" background="card" contained containerSize="md">
 *   Content
 * </Section>
 *
 * // Section without container
 * <Section spacing="md" childAlignment="child-left">
 *   Content
 * </Section>
 * ```
 *
 * @param props - Section component props
 * @returns JSX element representing a styled section wrapper
 */
export default function Section({
    id,
    className = '',
    children,
    spacing = 'md',
    background = 'default',
    contained = false,
    containerSize = 'md',
    childAlignment = 'child-center',
    selfAlignment = 'self-center',
    childLayout = 'vertical',
    onClick,
}: SectionProps) {
    const sectionClasses = [
        'section',
        `section-${spacing}`,
        background !== 'default' ? `section-bg-${background}` : '',
        childAlignment !== 'child-center' ? `section-${childAlignment}` : '',
        selfAlignment !== 'self-center' ? `section-${selfAlignment}` : '',
        childLayout !== 'vertical' ? `section-${childLayout}` : '',
        onClick ? 'cursor-pointer' : '',
        className
    ].filter(Boolean).join(' ');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick();
        }
    };

    const content = contained ? (
        <Container
            size={containerSize}
            childAlignment={childAlignment}
            childLayout={childLayout}
        >
            {children}
        </Container>
    ) : (
        children
    );

    return (
        <section
            className={sectionClasses}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            id={id}
        >
            {content}
        </section>
    );
}