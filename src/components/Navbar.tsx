"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navigation item interface
 */
interface NavItem {
  /** Display text for the navigation item */
  label: string;
  /** URL path for the navigation item */
  href: string;
  /** Whether this item opens in a new tab */
  external?: boolean;
  /** Icon component to display before the label */
  icon?: React.ReactNode;
}

/**
 * Navbar component props interface
 * Enhanced with Notion-style clean aesthetics and modern navigation patterns
 */
interface NavbarProps {
  /** Currently active page (backward compatibility) */
  currentPage?: string;

  /** Navigation items array (modern approach) */
  items?: NavItem[];

  /** Navbar variant style */
  variant?: 'default' | 'minimal' | 'elevated' | 'transparent' | 'fixed';

  /** Brand/logo section */
  brand?: {
    text?: string;
    logo?: React.ReactNode;
    href?: string;
  };

  /** Additional CSS classes */
  className?: string;

  /** Whether navbar should be sticky on scroll */
  sticky?: boolean;

  /** Whether to show mobile menu toggle */
  showMobileMenu?: boolean;

  /** Mobile menu state control */
  mobileMenuOpen?: boolean;

  /** Mobile menu toggle handler */
  onMobileMenuToggle?: (open: boolean) => void;

  /** Custom actions to display on the right side */
  actions?: React.ReactNode;
}

/**
 * Enhanced Navbar component with Notion-style clean aesthetics
 *
 * Provides modern navigation with responsive design, clean typography, and smooth interactions.
 * Maintains backward compatibility with currentPage prop while supporting modern navigation patterns.
 *
 * Compatible with styles/components/_navbar.scss and includes Notion-inspired design elements:
 * - Clean typography with subtle hover states
 * - Minimal border usage
 * - Smooth transitions and micro-interactions
 * - Responsive mobile-first design
 * - Accessibility-first navigation
 *
 * @example
 * ```tsx
 * // Backward compatible usage
 * <Navbar currentPage="Home" />
 *
 * // Modern usage with custom items
 * <Navbar
 *   variant="minimal"
 *   brand={{ text: "Portfolio", href: "/" }}
 *   items={[
 *     { label: "Work", href: "/work" },
 *     { label: "About", href: "/about" },
 *     { label: "Contact", href: "/contact" }
 *   ]}
 *   sticky
 * />
 *
 * // With brand and actions
 * <Navbar
 *   variant="elevated"
 *   brand={{
 *     logo: <Logo />,
 *     text: "Alex Jordan",
 *     href: "/"
 *   }}
 *   items={navItems}
 *   actions={<ThemeToggle />}
 * />
 * ```
 *
 * @param props - Navbar component props
 * @returns JSX element representing a responsive navigation bar
 */
export default function Navbar({
  currentPage,
  items,
  variant = 'default',
  brand,
  className = '',
  sticky = false,
  showMobileMenu = true,
  mobileMenuOpen: controlledMobileMenuOpen,
  onMobileMenuToggle,
  actions
}: NavbarProps) {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const mobileMenuOpen = controlledMobileMenuOpen ?? internalMobileMenuOpen;
  const [isScrolled, setIsScrolled] = useState(false);
  const defaultItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Resume', href: '/resume' },
    { label: 'How the Site was Created', href: '/how-the-site-was-created' },
    { label: 'Internet Tracking', href: '/internet-tracking' },
    { label: 'Contact', href: '/contact' }
  ];

  const navigationItems = items || defaultItems;

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen;
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    } else {
      setInternalMobileMenuOpen(newState);
    }
  };

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  const navbarClasses = [
    'navbar',
    variant !== 'default' ? `navbar-${variant}` : '',
    sticky ? 'navbar-sticky' : '',
    isScrolled ? 'navbar-scrolled' : '',
    className
  ].filter(Boolean).join(' ');

  const MobileMenuButton = () => (
    <button
      className="mobile-menu-button md:hidden p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
      onClick={handleMobileMenuToggle}
      aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileMenuOpen}
    >
      <svg
        className="h-6 w-6"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        {mobileMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );

  const BrandComponent = () => {
    if (!brand) return null;

    const brandContent = (
      <>
        {brand.logo && <span className="brand-logo mr-2">{brand.logo}</span>}
        {brand.text && <span className="brand-text font-heading font-semibold text-lg">{brand.text}</span>}
      </>
    );

    if (brand.href) {
      return (
        <Link href={brand.href} className="brand-link flex items-center hover:opacity-80 transition-opacity">
          {brandContent}
        </Link>
      );
    }

    return <div className="brand flex items-center">{brandContent}</div>;
  };

  const NavLink = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
    const isActive = currentPage === item.label;
    const linkClasses = [
      mobile ? 'mobile-nav-link' : 'nav-link',
      isActive ? 'active' : '',
      'flex items-center transition-colors duration-200'
    ].filter(Boolean).join(' ');

    const linkContent = (
      <>
        {item.icon && <span className="nav-icon mr-2">{item.icon}</span>}
        <span>{item.label}</span>
      </>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link href={item.href} className={linkClasses}>
        {linkContent}
      </Link>
    );
  };

  return (
    <nav className={navbarClasses} role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        {navigationItems.map((item, index) => (
          <li key={index} className="nav-item">
            <NavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}