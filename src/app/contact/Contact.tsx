"use client"
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '../../components/contact/ContactForm';

/**
 * Contact page component
 *
 * Main contact page layout with navigation, contact form, and footer.
 * Provides a complete page structure for user contact submissions.
 *
 * @example
 * ```tsx
 * // In app/contact/page.tsx
 * export default function ContactPage() {
 *   return <Contact />;
 * }
 * ```
 *
 * @returns JSX element representing the complete contact page
 */
export default function Contact() {
    return (
        <main className="contact-page">
            <Navbar currentPage="Contact" />
            <ContactForm />
            <Footer />
        </main>
    );
}