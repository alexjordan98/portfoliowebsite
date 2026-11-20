'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import SiteButton from './SiteButton';

/**
 * Navigation item interface
 */
interface NavItem {
  /** Display text for the navigation item */
  label: string;
  /** URL path for the navigation item */
  href: string;
  /** Icon component to display before the label */
  icon?: React.ReactNode;
}

/**
 * Navbar component props interface
 * Enhanced with Notion-style clean aesthetics and modern navigation patterns
 */
interface NavbarProps {
  /** Navbar id */
  id?: string;

  /** Additional CSS classes */
  className?: string;

  /** Currently active page (backward compatibility) */
  currentPage?: string;

  /** Navigation items array (modern approach) */
  items?: NavItem[];
}

/**
 * Closes the mobile menu when Escape is pressed while it is open, returning focus to the toggle.
 *
 * @param isOpen - Whether the menu is open
 * @param close - Closes the menu
 * @param toggleRef - Toggle button that receives focus after closing
 */
function useCloseOnEscape(isOpen: boolean, close: () => void, toggleRef: React.RefObject<HTMLButtonElement | null>): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, toggleRef]);
}

/**
 * Simple navigation bar component for clean, modern site navigation.
 * Below the medium breakpoint the links collapse behind a hamburger toggle.
 *
 * @example
 * ```tsx
 * // Basic navbar with items array
 * <Navbar
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Resume', href: '/resume' },
 *     { label: 'Contact', href: '/contact' }
 *   ]}
 *   currentPage="Resume"
 * />
 *
 * // With icons
 * <Navbar
 *   items={[
 *     { label: 'Home', href: '/', icon: <HomeIcon /> },
 *     { label: 'Resume', href: '/resume', icon: <DocumentIcon /> }
 *   ]}
 * />
 * ```
 *
 * @param props - Navbar component props
 * @returns TSX element representing a navigation bar
 */
export default function Navbar({
  id,
  className = '',
  currentPage,
  items = []
}: NavbarProps) {
  const defaultItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Resume', href: '/resume' },
    { label: 'How the Site was Created', href: '/how-to' },
    { label: 'Skills', href: '/skills' },
    { label: 'Evolutionary Ethics', href: '/evolving-ethics' },
    //{ label: 'Internet Tracking', href: '/internet-tracking' },
    { label: 'Contact', href: '/contact' }
  ];

  const navigationItems = items.length > 0 ? items : defaultItems;
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listId = `${useId()}-nav-list`;
  const closeMenu = useCallback(() => setIsOpen(false), []);
  useCloseOnEscape(isOpen, closeMenu, toggleRef);

  const navbarClasses = [
    'navbar',
    className
  ].filter(Boolean).join(' ');

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = currentPage === item.label;
    const linkClasses = [
      'nav-link',
      isActive ? 'active' : '',
      'flex items-center transition-colors duration-200'
    ].filter(Boolean).join(' ');

    return (
      <a
        href={item.href}
        className={linkClasses}
        aria-current={isActive ? 'page' : undefined}
        onClick={closeMenu}
      >
        {item.icon && (
          <span className="nav-icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className="nav-label">
          {item.label}
        </span>
      </a>
    );
  };

  return (
    <nav className={navbarClasses} role="navigation" aria-label="Main navigation" id={id}>
      <SiteButton
        ref={toggleRef}
        className="nav-menu-toggle"
        variant="menu-toggle"
        text={isOpen ? 'Close menu' : 'Open menu'}
        ariaExpanded={isOpen}
        ariaControls={listId}
        onClick={() => setIsOpen((open) => !open)}
      />
      <ul id={listId} className={['nav-list', isOpen ? '' : 'nav-mobile-hidden'].filter(Boolean).join(' ')}>
        {navigationItems.map((item, index) => (
          <li key={index} className="nav-item">
            <NavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}