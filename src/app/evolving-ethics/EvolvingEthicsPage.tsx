import React from 'react';
import EthicsHero from '@/components/evolvingEthics/EthicsHero';
import EthicsSimulator from '@/components/evolvingEthics/EthicsSimulator';
import EthicsTakeaways from '@/components/evolvingEthics/EthicsTakeaways';
import HowItWorks from '@/components/evolvingEthics/HowItWorks';
import ProjectSourceLink from '@/components/evolvingEthics/ProjectSourceLink';
import { runEnsemble } from '@/lib/rothErev/ensemble';
import { PRESET_GAMES } from '@/lib/rothErev/games';
import { DEFAULT_WORLDS, INITIAL_SETTINGS } from '@/lib/rothErev/settings';
import { buildHeroSnapshots } from '@/lib/rothErev/summary';

/**
 * Evolving Ethics page body. Runs on the server (at build time for this static route), so the
 * hero figure, the explanations and the initial ensemble are in the HTML before any script loads.
 *
 * @returns The page content between the site navbar and footer
 */
export default function EvolvingEthicsPage() {
  const initialGame = PRESET_GAMES.find((game) => game.id === INITIAL_SETTINGS.gameId) ?? PRESET_GAMES[0];
  const initialEnsemble = runEnsemble(
    initialGame,
    { rounds: INITIAL_SETTINGS.rounds, forgetting: INITIAL_SETTINGS.forgetting, mistakes: INITIAL_SETTINGS.mistakes },
    DEFAULT_WORLDS,
    INITIAL_SETTINGS.ensembleSeed,
  );

  return (
    <main className="ethics-page">
      <div className="ethics-page__inner">
        <EthicsHero snapshots={buildHeroSnapshots()} />
        <HowItWorks />
        <EthicsSimulator initialEnsemble={initialEnsemble} />
        <EthicsTakeaways />
        <ProjectSourceLink />
      </div>
    </main>
  );
}
