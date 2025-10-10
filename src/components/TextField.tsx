import React from 'react';

/**
 * TextField component props interface
 */
interface TextFieldProps {
  /** HTML id attribute */
  id?: string;

  /** Additional CSS classes */
  className?: string;

  /** Label text for the input field */
  label: string;

  /** Name attribute for the input */
  name: string;

  /** Placeholder text */
  placeholder?: string;

  /** Current value of the input */
  value: string;

  /** Change handler */
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /** Field variant - small for single-line, large for textarea */
  variant?: 'small' | 'large';

  /** Whether the field is required */
  required?: boolean;

  /** Whether the field is disabled */
  disabled?: boolean;

  /** Error message to display */
  error?: string;

  /** Input type for small variant */
  type?: 'text' | 'email' | 'tel' | 'url';
}

/**
 * TextField component for form inputs
 *
 * @example
 * ```tsx
 * <TextField
 *   label="Name"
 *   name="name"
 *   value={formData.name}
 *   onChange={handleChange}
 *   variant="small"
 *   required
 * />
 *
 * <TextField
 *   label="Message"
 *   name="message"
 *   value={formData.message}
 *   onChange={handleChange}
 *   variant="large"
 *   required
 * />
 * ```
 *
 * @param props - TextField component props
 * @returns JSX element representing a form input field
 */
export default function TextField({
  id,
  className = '',
  label,
  name,
  placeholder,
  value,
  onChange,
  variant = 'small',
  required = false,
  disabled = false,
  error,
  type = 'text',
}: TextFieldProps) {
  const fieldClasses = [
    'text-field',
    `text-field-${variant}`,
    error ? 'text-field-error' : '',
    disabled ? 'text-field-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'text-field-input',
    `text-field-input-${variant}`
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClasses}>
      <label htmlFor={id || name} className="text-field-label">
        {label}
        {required && <span className="text-field-required" aria-label="required">*</span>}
      </label>

      {variant === 'small' ? (
        <input
          id={id || name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          rows={6}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <span id={`${name}-error`} className="text-field-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}