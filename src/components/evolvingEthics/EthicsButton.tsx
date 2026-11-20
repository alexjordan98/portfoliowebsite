import React from 'react';

/**
 * Visual style of an {@link EthicsButton}.
 * - `primary`: solid teal pill
 * - `outline`: teal outline on transparent
 * - `soft`: pale teal outline on the card color
 * - `tab`: segment of the game picker; filled when pressed
 */
export type EthicsButtonVariant = 'primary' | 'outline' | 'soft' | 'tab';

/**
 * EthicsButton props.
 */
interface EthicsButtonProps {
  /** Button text. */
  children: React.ReactNode;
  /** Visual style. Defaults to `primary`. */
  variant?: EthicsButtonVariant;
  /** `lg` is the 48px hero size; `md` is the 44px control size. Defaults to `md`. */
  size?: 'md' | 'lg';
  /** When set, renders an in-page or site link instead of a button. */
  href?: string;
  /** Click handler for button rendering. */
  onClick?: () => void;
  /** Toggle state; renders `aria-pressed` (used by the game picker). */
  pressed?: boolean;
  /** Gives the play button a fixed minimum width so its label can change without layout shift. */
  wide?: boolean;
}

/**
 * Pill-shaped button or link used throughout the Evolving Ethics page.
 *
 * The site's `SiteButton` has a different shape and hover motion, so this page uses its own
 * pill instead of restyling the shared one.
 *
 * @example
 * ```tsx
 * <EthicsButton href="#sim" size="lg">Try the simulator</EthicsButton>
 * <EthicsButton variant="tab" pressed={isOn} onClick={select}>Stag Hunt</EthicsButton>
 * ```
 *
 * @param props - EthicsButton props
 * @returns A styled `<a>` or `<button>`
 */
export default function EthicsButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  pressed,
  wide = false,
}: EthicsButtonProps) {
  const classes = [
    'ethics-button',
    `ethics-button--${variant}`,
    `ethics-button--${size}`,
    wide ? 'ethics-button--wide' : '',
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-pressed={pressed}>
      {children}
    </button>
  );
}
