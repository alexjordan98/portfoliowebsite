import React from 'react';

/**
 * Color options for the skill bubble
 */
export type BubbleColor = 'clear' | 'lavender' | 'green' | 'pink';

/**
 * Position of the shine arc on the bubble
 */
export type ArcPosition = 'top-left' | 'top-right';

/**
 * Props for the SkillsBubble component
 */
export interface SkillsBubbleProps {
    /**
     * Unique identifier for the bubble
     */
    id: string;

    /**
     * Additional CSS class names
     */
    className?: string;

    /**
     * The skill text to display in the bubble
     */
    skill: string;


    /**
     * Diameter of the bubble in pixels (100-300)
     */
    size?: number;

    /**
     * Color theme of the bubble
     */
    color?: BubbleColor;

    /**
     * Position of the shine arc (default: 'top-left')
     */
    arcPosition?: ArcPosition;

    /**
     * Horizontal position as a percentage (0-100)
     */
    xPosition?: number;

    /**
     * Vertical starting position as a percentage (0-50)
     */
    yPosition?: number;

    /**
     * If true, size, color, and arcPosition will be randomly generated
     */
    randomized?: boolean;

}

/**
 * Generates a random diameter between 100 and 300 pixels
 *
 * @returns A random size value between 100 and 300
 */
export const getRandomSize = (): number => {
    return Math.floor(Math.random() * (300 - 100 + 1)) + 100;
};

/**
 * Generates a random bubble color from the available options
 *
 * @returns A random BubbleColor value
 */
export const getRandomColor = (): BubbleColor => {
    const colors: BubbleColor[] = ['clear', 'lavender', 'green', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Generates a random arc position (top-left or top-right)
 *
 * @returns A random ArcPosition value
 */
export const getRandomArcPosition = (): ArcPosition => {
    const positions: ArcPosition[] = ['top-left', 'top-right'];
    return positions[Math.floor(Math.random() * positions.length)];
};

/**
 * Generates a random horizontal position between 5% and 95%
 *
 * @returns A random percentage value for left positioning
 */
export const getRandomXPosition = (): number => {
    return Math.floor(Math.random() * (95 - 5 + 1)) + 5;
};

/**
 * Generates a random starting Y position in the top 50% of the screen
 *
 * @returns A random percentage value for top positioning (0-50)
 */
export const getRandomYPosition = (): number => {
    return Math.floor(Math.random() * 51);
};

/**
 * A floating bubble component that displays a skill with a glossy, translucent appearance
 *
 * @example
 * ```tsx
 * const { size, color, arcPosition } = getRandomBubbleProps();
 * <SkillsBubble
 *   id="skill-1"
 *   skill="React"
 *   size={size}
 *   color={color}
 *   arcPosition={arcPosition}
 * />
 * ```
 */
export const SkillsBubble: React.FC<SkillsBubbleProps> = (props) => {
    let {
        id,
        className = '',
        skill,
        size,
        color,
        arcPosition,
        xPosition,
        yPosition,
        randomized = false
    } = props;

    size = randomized ? getRandomSize() : props.size;
    color = randomized ? getRandomColor() : props.color;
    arcPosition = randomized ? getRandomArcPosition() : (props.arcPosition ?? 'top-left');
    xPosition = randomized ? getRandomXPosition() : (props.xPosition ?? 50);
    yPosition = randomized ? getRandomYPosition() : (props.yPosition ?? 0);

    return (
        <div
            id={id}
            className={`skills-bubble skills-bubble--${color} skills-bubble--arc-${arcPosition} ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${xPosition}%`,
                top: `${yPosition}%`,
                '--bubble-size': `${size}px`,
                '--start-y': `${yPosition}vh`
            } as React.CSSProperties & { '--bubble-size': string; '--start-y': string }}
        >
            <div className="skills-bubble__arc"></div>
            <span className="skills-bubble__text">{skill}</span>
        </div>
    );
};