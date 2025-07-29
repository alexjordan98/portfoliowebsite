import React from 'react';
import Link from 'next/link';

interface NavbarProps {
    currentPage?: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
    const pages = [
        'Home',
        'Resume',
        'How the Site was Created',
        'Internet Tracking',
        'Contact'
    ];

    const pageMapping = {
        'Home': '/',
        'Resume': '/resume',
        'How the Site was Created': '/how-the-site-was-created',
        'Internet Tracking': '/internet-tracking',
        'Contact': '/contact'
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {pages.map((page) => (
                    <li key={page} className="nav-item">
                        <Link
                            href={pageMapping[page as keyof typeof pageMapping]}
                            className={`nav-link ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}