import React from 'react';

/**
 * EthicsInput props.
 */
interface EthicsInputProps {
  /** Input id. */
  id: string;
  /** Accessible name (the input has no visible label of its own). */
  ariaLabel: string;
  /** Current text. */
  value: string;
  /** Called with the new text. */
  onChange: (value: string) => void;
  /** `text` for names, `payoff` for a centered numeric cell. Defaults to `text`. */
  variant?: 'text' | 'payoff';
  /** Marks the value invalid and links the error message. */
  errorId?: string;
  /** Text color for payoff cells: the row or column player. */
  player?: 'row' | 'col';
  /** Longest allowed text. */
  maxLength?: number;
}

/**
 * Compact text input for the custom game editor (strategy names and payoff cells).
 *
 * The shared `TextField` is a full form field with a large heading label, which doesn't fit
 * inside a payoff grid, so the editor uses this smaller input.
 *
 * @param props - EthicsInput props
 * @returns A styled `<input>`
 */
export default function EthicsInput({
  id,
  ariaLabel,
  value,
  onChange,
  variant = 'text',
  errorId,
  player,
  maxLength,
}: EthicsInputProps) {
  const classes = [
    'ethics-input',
    `ethics-input--${variant}`,
    player ? `ethics-input--${player}` : '',
    errorId ? 'ethics-input--invalid' : '',
  ].filter(Boolean).join(' ');

  return (
    <input
      id={id}
      className={classes}
      type="text"
      inputMode={variant === 'payoff' ? 'decimal' : undefined}
      aria-label={ariaLabel}
      aria-invalid={errorId ? true : undefined}
      aria-describedby={errorId}
      value={value}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
