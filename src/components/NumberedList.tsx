import React from 'react';
import Title from './Title';

/**
 * Props for configuring the title of the numbered list
 */
interface TitleProps {
    /** HTML id attribute for the title */
    id?: string;

    /** Additional CSS classes for the title */
    className?: string;

    /** Semantic heading level for the title */
    level?: 1 | 2 | 3 | 4 | 5 | 6;

    /** Typography variant for the title */
    variant?: 'default' | 'card';

    /** Text alignment for the title */
    align?: 'left' | 'center' | 'right';

    /** Whether to show text shadow on the title */
    shadow?: boolean;
}

/**
 * Interface for list items with optional sub-items
 */
interface ListItem {
    /** Main text content of the list item */
    text: string;

    /** Optional array of sub-items */
    subItems?: string[];
}

/**
 * NumberedList component props interface
 * Enhanced with Paragraph component props for consistent styling
 */
interface NumberedListProps {
    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes */
    className?: string;

    /** Title text for the numbered list */
    title?: string;

    /** Configuration props for the title styling */
    titleProps?: TitleProps;

    /** Array of list items (strings or objects with sub-items) */
    items: (string | ListItem)[];

    /** Starting number for the list */
    startNumber?: number;

    //** type of list, ie disc (bullets), circle (hollow circle), decimal for ints,
    // lower alpha for letters etc and none */
    listIndexType?: string;

    /** Typography size variant for list items */
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

    /** Typography variant for different contexts */
    variant?: 'default' | 'card' | 'modal' | 'caption';

    /** Text alignment for list items */
    align?: 'left' | 'center' | 'right' | 'justify';

    /** Whether to show text shadow on list items */
    shadow?: boolean;

    /** Whether text should be selectable */
    selectable?: boolean;

    //** whether the list has its own title */
    hasTitle?: boolean;

    /** Click handler for interactive list */
    onClick?: () => void;
}

/**
 * NumberedList component for displaying ordered lists with optional sub-items
 *
 * Provides a structured way to display numbered content with consistent typography
 * and styling. Supports nested sub-items and customizable title styling.
 *
 * Compatible with existing typography classes from styles/base/_typography.scss
 *
 * @example
 * ```tsx
 * // Basic numbered list
 * <NumberedList
 *   title="Steps to Success"
 *   items={["First step", "Second step", "Third step"]}
 * />
 *
 * // List with sub-items and custom styling
 * <NumberedList
 *   title="Project Requirements"
 *   titleProps={{ level: 2, variant: "card" }}
 *   items={[
 *     "Frontend Development",
 *     {
 *       text: "Backend Development",
 *       subItems: ["API Design", "Database Setup"]
 *     }
 *   ]}
 *   size="lg"
 *   align="left"
 * />
 *
 * // Interactive list with custom styling
 * <NumberedList
 *   title="Clickable List"
 *   items={["Item 1", "Item 2"]}
 *   variant="card"
 *   shadow={true}
 *   onClick={handleListClick}
 * />
 * ```
 *
 * @param props - NumberedList component props
 * @returns JSX element representing a styled numbered list with title
 */
export default function NumberedList({
    id,
    className = '',
    title,
    titleProps = {},
    items,
    startNumber = 1,
    listIndexType = 'disc',
    size = 'base',
    variant = 'default',
    align = 'left',
    shadow = false,
    selectable = true,
    hasTitle = true,
    onClick

}: NumberedListProps) {
    const listClasses = [
        size !== 'base' ? `text-${size}` : '',
        variant !== 'default' ? `text-${variant}` : '',
        align !== 'left' ? `text-${align}` : '',
        shadow ? 'text-shadow' : '',
        !selectable ? 'select-none' : '',
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
            id={id}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
        >
            {hasTitle &&
                <div className="numbered-list-titles">
                    <Title
                        text={title || ""}
                        level={titleProps.level || 3}
                        variant={titleProps.variant || 'default'}
                        align={titleProps.align || 'left'}
                        shadow={titleProps.shadow || false}
                        id={titleProps.id}
                        className={titleProps.className}
                    />
                </div>
            }
            <ol
                className={"numbered-list-indices " + listClasses}
                style={{ listStyleType: listIndexType}}
                start={startNumber}
            >
                {items.map((item, index) => (
                    <li
                        className="numbered-list-item"
                        key={index}
                    >
                        {typeof item === 'string' ? item : item.text}
                        {typeof item === 'object' && item.subItems && (
                            <ol
                                className={"numbered-list-indices " + listClasses}
                                style={{ listStyleType: 'lower-alpha' }}
                                type="a"
                            >
                                {item.subItems.map((subItem, subIndex) => (
                                    <li
                                        className="numbered-list-item sub-items"
                                        key={subIndex}
                                    >
                                        {subItem}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}