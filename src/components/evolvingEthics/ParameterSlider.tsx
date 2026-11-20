import React from 'react';

/**
 * ParameterSlider props.
 */
interface ParameterSliderProps {
  /** Input id, also used to link the label. */
  id: string;
  /** Label text. */
  label: string;
  /** Current value. */
  value: number;
  /** Smallest value. */
  min: number;
  /** Largest value. */
  max: number;
  /** Step between values. */
  step: number;
  /** Called with the new numeric value. */
  onChange: (value: number) => void;
  /** Formatted value shown at the right of the label. Omit to hide the readout. */
  valueLabel?: string;
  /** One line of helper text under the slider. */
  helper?: string;
  /** `setting` uses the bold label; `scrub` uses the small muted label. Defaults to `setting`. */
  variant?: 'setting' | 'scrub';
}

/**
 * Labeled range slider with an optional value readout and helper line.
 *
 * @example
 * ```tsx
 * <ParameterSlider id="delta" label="Forgetting (δ)" value={0.01} min={0} max={0.1} step={0.005}
 *   valueLabel="0.010" helper="How fast old habits fade." onChange={setDelta} />
 * ```
 *
 * @param props - ParameterSlider props
 * @returns The label, slider and helper text
 */
export default function ParameterSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  valueLabel,
  helper,
  variant = 'setting',
}: ParameterSliderProps) {
  const helperId = helper ? `${id}-help` : undefined;
  return (
    <div className="ethics-slider">
      <div className="ethics-slider__head">
        <label htmlFor={id} className={`ethics-slider__label ethics-slider__label--${variant}`}>
          {label}
        </label>
        {valueLabel !== undefined && <span className="ethics-slider__value">{valueLabel}</span>}
      </div>
      <input
        id={id}
        className="ethics-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-describedby={helperId}
        aria-valuetext={valueLabel}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {helper && (
        <p id={helperId} className="ethics-slider__helper">
          {helper}
        </p>
      )}
    </div>
  );
}
