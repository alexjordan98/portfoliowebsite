import React from 'react';

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
 * Simple navigation bar component for clean, modern site navigation
 *
 * Provides a clean navigation experience with active state highlighting.
 * Works with existing navbar SCSS styling and supports both modern items
 * array and backward compatible currentPage prop.
 *
 * Compatible with styles/components/_navbar.scss classes
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
 * @returns JSX element representing a navigation bar
 */
export default function Navbar({
  id,
  className = '',
  currentPage,
  items = []
}: NavbarProps) {
  // Default navigation items if none provided
  const defaultItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Resume', href: '/resume' },
    { label: 'How the Site was Created', href: '/how-the-site-was-created' },
    { label: 'Internet Tracking', href: '/internet-tracking' },
    { label: 'Contact', href: '/contact' }
  ];

  const navigationItems = items.length > 0 ? items : defaultItems;

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