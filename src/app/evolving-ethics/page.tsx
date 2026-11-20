import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EvolvingEthicsPage from './EvolvingEthicsPage';

/** Page title and description for search and link previews. */
export const metadata: Metadata = {
  title: 'Evolving Ethics | Alex Jordan',
  description:
    'An in-browser Roth–Erev reinforcement learning simulator showing how fairness, trust and ownership norms can emerge from simple habit.',
};

/**
 * Evolving Ethics route component.
 *
 * @returns The Evolving Ethics page wrapped in the site navbar and footer
 */
export default function EvolvingEthics() {
  return (
    <div>
      <Navbar currentPage="Evolving Ethics" />
      <EvolvingEthicsPage />
      <Footer />
    </div>
  );
}
