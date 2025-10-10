"use client"
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Title from '@/components/Title';
import TextField from '@/components/TextField';
import SiteButton from '@/components/SiteButton';

/**
 * Form data interface
 */
interface FormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Form errors interface
 */
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * ContactForm component for user contact submissions
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 *
 * @returns JSX element representing the contact form
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  /**
   * Validates the form data
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!recaptchaToken) {
      newErrors.message = newErrors.message || 'Please complete the reCAPTCHA verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles input field changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_FORM_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <Title
          text="Get In Contact With Me"
          level={1}
          align="center"
          underlined={true}
          shadow={true}
        />
        <Title
          text="If you'd like to discuss business or job opportunities with me, please feel free to fill out this form and I will be in touch with you as soon as I can"
          level={3}
          align="center"
          underlined={false}
          shadow={false}
          className="contact-form-subtitle"
        />
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="small"
          type="text"
          placeholder="First and last name"
          required
          error={errors.name}
          disabled={isSubmitting}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="small"
          type="email"
          placeholder="your.email@example.com"
          required
          error={errors.email}
          disabled={isSubmitting}
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          variant="large"
          placeholder="Tell me about your project or opportunity..."
          required
          error={errors.message}
          disabled={isSubmitting}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleRecaptchaChange}
          className="recaptcha-container"
        />
        {submitStatus === 'success' && (
          <div className="contact-form-success" role="alert">
            <p>✓ Thank you for your message!</p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="contact-form-error" role="alert">
            <p>✗ There was an error sending your message. Please try again.</p>
          </div>
        )}
        <div className="contact-form-submit">
          <SiteButton
            text={isSubmitting ? 'Sending...' : 'Send Message'}
            variant="default"
            size="xl"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}