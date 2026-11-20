import React from 'react';
import { heatColor } from '@/lib/rothErev/heatColor';
import { formatPercent, type LikeliestCell } from '@/lib/rothErev/summary';
import type { GameDefinition } from '@/lib/rothErev/types';

/** Joint probability above which a cell's text turns white for contrast. */
const LIGHT_TEXT_ABOVE = 0.4;

/**
 * OutcomeHeatmap props.
 */
interface OutcomeHeatmapProps {
  /** Game being played (for strategy labels). */
  game: GameDefinition;
  /** Row player's probabilities at the current round. */
  rowProbs: number[];
  /** Column player's probabilities at the current round. */
  colProbs: number[];
  /** Current round. */
  round: number;
  /** Most likely cell at the current round. */
  likeliest: LikeliestCell;
}

/**
 * Grid of joint probabilities `row[i] × col[j]` at the current round, with the most likely
 * cell outlined and a 0–100% legend underneath.
 *
 * @param props - OutcomeHeatmap props
 * @returns The heatmap and its legend
 */
export default function OutcomeHeatmap({ game, rowProbs, colProbs, round, likeliest }: OutcomeHeatmapProps) {
  const ariaLabel =
    `Probability grid at round ${round}. Most likely: ${game.rowLabels[likeliest.row]} and ` +
    `${game.colLabels[likeliest.col]}, ${Math.round(likeliest.probability * 100)} percent.`;

  return (
    <div className="ethics-heatmap">
      <div role="img" aria-label={ariaLabel} className="ethics-heatmap__grid">
        <div className="ethics-heatmap__col-heads">
          {game.colLabels.map((label) => (
            <span key={label} className="ethics-heatmap__col-head">{label}</span>
          ))}
        </div>
        {game.rowLabels.map((rowLabel, i) => (
          <div key={rowLabel} className="ethics-heatmap__row">
            <span className="ethics-heatmap__row-head">{rowLabel}</span>
            {game.colLabels.map((colLabel, j) => {
              const value = rowProbs[i] * colProbs[j];
              const classes = [
                'ethics-heatmap__cell',
                value > LIGHT_TEXT_ABOVE ? 'ethics-heatmap__cell--light' : '',
                i === likeliest.row && j === likeliest.col ? 'ethics-heatmap__cell--top' : '',
              ].filter(Boolean).join(' ');
              return (
                <div key={colLabel} className={classes} style={{ background: heatColor(value) }}>
                  {formatPercent(value)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="ethics-heatmap__legend" aria-hidden="true">
        <span>0%</span>
        <div className="ethics-heatmap__scale" />
        <span>100%</span>
      </div>
    </div>
  );
}
