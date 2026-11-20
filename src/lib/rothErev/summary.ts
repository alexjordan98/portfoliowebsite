import { describeOutcome, DIVIDE_THE_DOLLAR } from './games';
import { heatColor } from './heatColor';
import { simulateRun } from './simulate';
import type { EnsembleResult, GameDefinition, OutcomeTone, RunHistory } from './types';

/** A cell's joint probability above which the run counts as settled. */
export const SETTLED_CELL = 0.8;

/** A cell's joint probability above which the run counts as leaning toward it. */
export const LEANING_CELL = 0.45;

/**
 * The most likely pair of choices at some round.
 */
export interface LikeliestCell {
  /** Row strategy index. */
  row: number;
  /** Column strategy index. */
  col: number;
  /** Joint probability `rowProbs[row] × colProbs[col]`. */
  probability: number;
}

/**
 * Finds the pair of strategies with the highest joint probability.
 *
 * @param rowProbs - Row player's strategy probabilities
 * @param colProbs - Column player's strategy probabilities
 * @returns The most likely cell (first one wins ties)
 */
export function findLikeliestCell(rowProbs: number[], colProbs: number[]): LikeliestCell {
  let best: LikeliestCell = { row: 0, col: 0, probability: -1 };
  rowProbs.forEach((p, i) => {
    colProbs.forEach((q, j) => {
      if (p * q > best.probability) best = { row: i, col: j, probability: p * q };
    });
  });
  return best;
}

/**
 * Stage of a run, as shown in the status card.
 * - `start`: round 0, nothing has happened yet
 * - `exploring`: no cell above {@link LEANING_CELL}
 * - `leaning`: top cell above {@link LEANING_CELL}
 * - `settled`: top cell above {@link SETTLED_CELL}
 */
export type RunStage = 'start' | 'exploring' | 'leaning' | 'settled';

/**
 * Text for the run status card.
 */
export interface RunStatus {
  /** Stage of the run. */
  stage: RunStage;
  /** Small uppercase label. */
  kicker: string;
  /** Main sentence. */
  text: string;
}

/**
 * Describes where a run stands at a given round.
 *
 * @param game - The game being played
 * @param round - Current round
 * @param likeliest - Most likely cell at that round
 * @returns Stage, kicker and sentence for the status card
 */
export function describeRunStatus(game: GameDefinition, round: number, likeliest: LikeliestCell): RunStatus {
  const label = describeOutcome(game, likeliest.row, likeliest.col).label;
  if (round === 0) {
    return { stage: 'start', kicker: 'Round 0', text: 'Every pair of choices is equally likely. Press play.' };
  }
  if (likeliest.probability > SETTLED_CELL) return { stage: 'settled', kicker: 'Settled', text: label };
  if (likeliest.probability > LEANING_CELL) return { stage: 'leaning', kicker: 'Leaning toward', text: label };
  return { stage: 'exploring', kicker: 'Still exploring', text: 'No habit has taken over yet.' };
}

/**
 * One bar of the ensemble chart.
 */
export interface EnsembleBar {
  /** Outcome label (outcomes with the same label are merged). */
  label: string;
  /** Tone used to color the bar. */
  tone: OutcomeTone;
  /** Number of worlds that ended here. */
  count: number;
  /** Share of all worlds, 0–100. */
  percent: number;
}

/** Label of the bar for worlds that never settled. */
export const UNDECIDED_LABEL = 'Still undecided at the end';

/**
 * Turns ensemble tallies into bars: labels resolved, equal labels merged, undecided worlds
 * added, sorted by share.
 *
 * @param game - The game the ensemble played
 * @param ensemble - Tallies from {@link runEnsemble}
 * @returns Bars, largest first
 */
export function summarizeEnsemble(game: GameDefinition, ensemble: EnsembleResult): EnsembleBar[] {
  const merged = new Map<string, { tone: OutcomeTone; count: number }>();
  Object.entries(ensemble.counts).forEach(([key, count]) => {
    const [i, j] = key.split(',').map(Number);
    const { label, tone } = describeOutcome(game, i, j);
    const existing = merged.get(label);
    if (existing) existing.count += count;
    else merged.set(label, { tone, count });
  });
  if (ensemble.unsettled > 0) merged.set(UNDECIDED_LABEL, { tone: 'meager', count: ensemble.unsettled });
  return Array.from(merged, ([label, { tone, count }]) => ({
    label,
    tone,
    count,
    percent: (count / ensemble.worlds) * 100,
  })).sort((a, b) => b.count - a.count);
}

/** Width of the strategy chart's viewBox. */
export const CHART_WIDTH = 300;

/** Most points drawn per strategy line. */
const MAX_CHART_POINTS = 240;

/**
 * Converts one history entry to an SVG point inside the 300×100 chart.
 *
 * @param series - Probabilities per round
 * @param index - Round index
 * @param strategy - Strategy index
 * @param rounds - Total rounds (sets the x scale)
 * @returns `"x,y"` with one decimal
 */
function chartPoint(series: number[][], index: number, strategy: number, rounds: number): string {
  const x = (index / rounds) * CHART_WIDTH;
  const y = 97 - series[index][strategy] * 94;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

/**
 * Builds a polyline `points` string for one strategy up to the current round, thinned to at
 * most about 240 points.
 *
 * @param series - Probabilities per round
 * @param strategy - Strategy index
 * @param round - Last round to draw
 * @param rounds - Total rounds (sets the x scale)
 * @returns The `points` attribute value
 */
export function strategyLinePoints(series: number[][], strategy: number, round: number, rounds: number): string {
  if (!series[0] || strategy >= series[0].length) return '';
  const stride = Math.max(1, Math.ceil(round / MAX_CHART_POINTS));
  const points: string[] = [];
  for (let i = 0; i <= round; i += stride) points.push(chartPoint(series, i, strategy, rounds));
  if (round % stride !== 0) points.push(chartPoint(series, round, strategy, rounds));
  return points.join(' ');
}

/**
 * A hero snapshot: the 3×3 probability grid of one Divide the Dollar run at one round.
 */
export interface HeroSnapshot {
  /** Caption, e.g. "Round 40". */
  label: string;
  /** Heat colors of the nine cells in row-major order. */
  colors: string[];
}

/** Rounds shown in the hero, in order. */
const HERO_ROUNDS = [1, 40, 600];

/**
 * Picks the first Divide the Dollar run (δ 0.01, no mistakes, 600 rounds) that ends at the
 * fair ½–½ split and returns its grid at rounds 1, 40 and 600.
 *
 * @returns Three snapshots for the hero figure
 */
export function buildHeroSnapshots(): HeroSnapshot[] {
  let history: RunHistory | null = null;
  for (let seed = 1; seed < 60; seed++) {
    const run = simulateRun(DIVIDE_THE_DOLLAR, { rounds: 600, forgetting: 0.01, mistakes: 0, seed }, true);
    history = run.history;
    if (run.finalRow[1] > 0.9 && run.finalCol[1] > 0.9) break;
  }
  const { row, col } = history as RunHistory;
  return HERO_ROUNDS.map((round) => ({
    label: `Round ${round}`,
    colors: row[round].flatMap((p) => col[round].map((q) => heatColor(p * q))),
  }));
}

/**
 * Formats a 0–1 probability as a whole percentage.
 *
 * @param probability - Value between 0 and 1
 * @returns e.g. `"42%"`
 */
export function formatPercent(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}
