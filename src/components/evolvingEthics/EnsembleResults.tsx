import React from 'react';
import EthicsButton from './EthicsButton';
import type { EnsembleBar } from '@/lib/rothErev/summary';
import type { OutcomeTone } from '@/lib/rothErev/types';

/** Smallest drawn bar width, in percent, so tiny shares stay visible. */
const MIN_BAR_PERCENT = 1.5;

/** Tone legend entries, in display order. */
const TONE_LEGEND: { tone: OutcomeTone; label: string }[] = [
  { tone: 'good', label: 'Good for both' },
  { tone: 'unfair', label: 'Lopsided convention' },
  { tone: 'meager', label: 'Safe but meager' },
  { tone: 'bad', label: 'Bad for both' },
];

/**
 * EnsembleResults props.
 */
interface EnsembleResultsProps {
  /** Bars from `summarizeEnsemble`, largest first. */
  bars: EnsembleBar[];
  /** Number of worlds in the ensemble. */
  worlds: number;
  /** Name of the game the bars describe, shown in the heading. */
  gameName: string;
  /** True while a newer ensemble is computing. */
  pending: boolean;
  /** Reruns the ensemble with new seeds. */
  onReroll: () => void;
  /** Card shown beside the bars (the game insight). */
  aside: React.ReactNode;
}

/**
 * "Now run 200 worlds of …" section: horizontal bars of where many worlds ended, a reroll button
 * and a tone legend.
 *
 * @param props - EnsembleResults props
 * @returns The ensemble section
 */
export default function EnsembleResults({ bars, worlds, gameName, pending, onReroll, aside }: EnsembleResultsProps) {
  return (
    <section className="ethics-section">
      <div className="ethics-section__header">
        <div className="ethics-section__intro ethics-section__intro--wide">
          <h2 className="ethics-heading">Now run {worlds} worlds of {gameName}</h2>
          <p className="ethics-intro-text">
            One run is a story. Many runs show the odds. Same game, same dials, {worlds} different strokes of
            early luck. Here’s where they ended up.
          </p>
        </div>
        <EthicsButton variant="outline" onClick={onReroll}>Reroll {worlds} worlds</EthicsButton>
      </div>
      <div className="ethics-ensemble">
        <div className="ethics-card ethics-ensemble__bars" aria-busy={pending}>
          <ul className="ethics-ensemble__list">
            {bars.map((bar) => (
              <li key={bar.label} className="ethics-bar">
                <div className="ethics-bar__head">
                  <span className="ethics-bar__label">{bar.label}</span>
                  <span className="ethics-bar__value">{Math.round(bar.percent)}%</span>
                </div>
                <div className="ethics-bar__track">
                  <div
                    className={`ethics-bar__fill ethics-tone--${bar.tone}`}
                    style={{ width: `${Math.max(bar.percent, MIN_BAR_PERCENT).toFixed(1)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="ethics-ensemble__legend">
            {TONE_LEGEND.map(({ tone, label }) => (
              <span key={tone} className="ethics-ensemble__legend-item">
                <span className={`ethics-ensemble__swatch ethics-tone--${tone}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
        {aside}
      </div>
    </section>
  );
}
