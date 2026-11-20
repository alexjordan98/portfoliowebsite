import React from 'react';
import EthicsButton from './EthicsButton';
import type { HeroSnapshot } from '@/lib/rothErev/summary';

/**
 * EthicsHero props.
 */
interface EthicsHeroProps {
  /** Three Divide the Dollar grids (rounds 1, 40, 600) from `buildHeroSnapshots`. */
  snapshots: HeroSnapshot[];
}

/**
 * Hero of the Evolving Ethics page: kicker, headline, lede, two jump links and a figure of
 * one Divide the Dollar run converging on the fair split.
 *
 * @param props - EthicsHero props
 * @returns The hero section
 */
export default function EthicsHero({ snapshots }: EthicsHeroProps) {
  return (
    <section className="ethics-hero">
      <div className="ethics-hero__copy">
        <p className="ethics-kicker">Interactive project · Roth–Erev reinforcement learning</p>
        <h1 className="ethics-hero__title">Where does fairness come from?</h1>
        <p className="ethics-hero__lede">
          Two players. No rules about right or wrong. Each one simply repeats whatever paid off last time.
          Run the simulation and watch norms like trust, fairness and “that’s mine” show up on their own, or
          fail to.
        </p>
        <div className="ethics-hero__actions">
          <EthicsButton href="#sim" size="lg">Try the simulator</EthicsButton>
          <EthicsButton href="#how" size="lg" variant="outline">How it works</EthicsButton>
        </div>
      </div>
      <figure className="ethics-hero__figure">
        <div className="ethics-hero__snapshots">
          {snapshots.map((snapshot) => (
            <div key={snapshot.label} className="ethics-hero__snapshot">
              <div className="ethics-hero__grid" aria-hidden="true">
                {snapshot.colors.map((color, index) => (
                  <div key={index} className="ethics-hero__cell" style={{ background: color }} />
                ))}
              </div>
              <p className="ethics-hero__snapshot-label">{snapshot.label}</p>
            </div>
          ))}
        </div>
        <figcaption className="ethics-hero__caption">
          One run of <strong>Divide the Dollar</strong>. Each square is a pair of demands; darker means more
          likely. Choices start out spread evenly and end up concentrated on the fair ½–½ split.
        </figcaption>
      </figure>
    </section>
  );
}
