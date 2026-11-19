import { createRng } from './random';
import type { GameDefinition, RunResult, SimulationParams } from './types';

/** Smallest value a strategy weight may decay to, so no strategy ever vanishes entirely. */
export const WEIGHT_FLOOR = 1e-6;

/**
 * Normalizes a weight vector into probabilities that sum to 1.
 *
 * @param weights - Non-negative strategy weights
 * @returns The weights divided by their total
 */
export function normalize(weights: number[]): number[] {
  const total = weights.reduce((sum, w) => sum + w, 0);
  return weights.map((w) => w / total);
}

/**
 * Samples an index with probability proportional to its weight.
 *
 * @param weights - Non-negative strategy weights
 * @param rng - Random source returning numbers in `[0, 1)`
 * @returns The sampled strategy index
 */
export function sampleIndex(weights: number[], rng: () => number): number {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let remaining = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    remaining -= weights[i];
    if (remaining <= 0) return i;
  }
  return weights.length - 1;
}

/**
 * Applies forgetting to every weight in place, never letting one fall below {@link WEIGHT_FLOOR}.
 *
 * @param weights - Strategy weights to decay
 * @param forgetting - Fraction of each weight lost this round
 */
function decay(weights: number[], forgetting: number): void {
  for (let i = 0; i < weights.length; i++) {
    weights[i] = Math.max(weights[i] * (1 - forgetting), WEIGHT_FLOOR);
  }
}

/**
 * Simulates one run of Roth–Erev reinforcement learning on a two-player game.
 *
 * Each round, with probability `mistakes` both players pick uniformly at random; otherwise
 * each samples a strategy in proportion to its weight. Every weight then decays by
 * `(1 − forgetting)`, and each player's payoff is added to the weight of the strategy they used.
 * Initial weights are all 1.
 *
 * @param game - The game to play
 * @param params - Rounds, forgetting, mistake rate and seed
 * @param record - When true, the normalized probabilities of every round are returned
 * @returns The final probabilities, plus the history when `record` is true
 */
export function simulateRun(game: GameDefinition, params: SimulationParams, record: boolean): RunResult {
  const rng = createRng(params.seed);
  const rowCount = game.rowLabels.length;
  const colCount = game.colLabels.length;
  const rowWeights = new Array<number>(rowCount).fill(1);
  const colWeights = new Array<number>(colCount).fill(1);
  const history = record ? { row: [normalize(rowWeights)], col: [normalize(colWeights)] } : null;

  for (let round = 0; round < params.rounds; round++) {
    let rowChoice: number;
    let colChoice: number;
    if (rng() < params.mistakes) {
      rowChoice = Math.floor(rng() * rowCount);
      colChoice = Math.floor(rng() * colCount);
    } else {
      rowChoice = sampleIndex(rowWeights, rng);
      colChoice = sampleIndex(colWeights, rng);
    }
    decay(rowWeights, params.forgetting);
    decay(colWeights, params.forgetting);
    rowWeights[rowChoice] += game.rowPayoffs[rowChoice][colChoice];
    colWeights[colChoice] += game.colPayoffs[rowChoice][colChoice];
    if (history) {
      history.row.push(normalize(rowWeights));
      history.col.push(normalize(colWeights));
    }
  }

  return { finalRow: normalize(rowWeights), finalCol: normalize(colWeights), history };
}
