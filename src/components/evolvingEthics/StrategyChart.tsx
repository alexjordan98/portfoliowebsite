import React from 'react';
import { CHART_WIDTH, formatPercent, strategyLinePoints } from '@/lib/rothErev/summary';

/**
 * StrategyChart props.
 */
interface StrategyChartProps {
  /** Chart title, e.g. "Row player". */
  title: string;
  /** Which player, for the title color. */
  player: 'row' | 'col';
  /** That player's probabilities per round. */
  series: number[][];
  /** Strategy names, in series order. */
  labels: string[];
  /** Current round; lines are drawn up to here. */
  round: number;
  /** Total rounds, which sets the x scale. */
  rounds: number;
}

/**
 * Line chart of one player's strategy shares over the run (teal, plum and amber lines), with a
 * legend of the current percentages.
 *
 * @param props - StrategyChart props
 * @returns The titled chart and legend
 */
export default function StrategyChart({ title, player, series, labels, round, rounds }: StrategyChartProps) {
  const current = series[round];
  return (
    <div className="ethics-chart">
      <p className={`ethics-chart__title ethics-text--${player}`}>{title}</p>
      <svg
        className="ethics-chart__plot"
        viewBox={`0 0 ${CHART_WIDTH} 100`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${title} strategy shares over time`}
      >
        <line className="ethics-chart__midline" x1="0" y1="50" x2={CHART_WIDTH} y2="50" />
        {labels.map((label, k) => (
          <polyline
            key={label}
            className={`ethics-chart__line ethics-series--${k}`}
            points={strategyLinePoints(series, k, round, rounds)}
          />
        ))}
      </svg>
      <div className="ethics-chart__legend">
        {labels.map((label, k) => (
          <span key={label} className="ethics-chart__legend-item">
            <span className={`ethics-chart__swatch ethics-series--${k}`} />
            {label} {formatPercent(current[k])}
          </span>
        ))}
      </div>
    </div>
  );
}
