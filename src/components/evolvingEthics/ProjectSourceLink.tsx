import React from 'react';

/** The original Python project on GitHub. */
export const ROTH_REPOSITORY_URL = 'https://github.com/alexjordan98/Roth-Reinfocement-Project-Alex-and-Shefali';

/**
 * Closing row of the Evolving Ethics page with a link to the original Python project.
 *
 * @returns The page's closing row
 */
export default function ProjectSourceLink() {
  return (
    <div className="ethics-source">
      <a href={ROTH_REPOSITORY_URL} className="ethics-source__link">
        <svg className="ethics-source__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </svg>
        View the original project
      </a>
    </div>
  );
}
