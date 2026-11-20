import { simulateRun } from './simulate';
import type { EnsembleResult, GameDefinition, SimulationParams } from './types';

/** A player counts as settled once their most likely strategy exceeds this probability. */
export const SETTLED_THRESHOLD = 0.8;

/**
 * Returns the index of the largest value in a list.
 *
 * @param values - Numbers to search
 * @returns Index of the first maximum
 */
export function argMax(values: number[]): number {
  let best = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[best]) best = i;
  }
  return best;
}

/**
 * Runs many independent worlds with consecutive seeds and tallies where each one ended up.
 *
 * A world is settled when both players' top strategy is above {@link SETTLED_THRESHOLD};
 * settled worlds are counted under the `"row,col"` key of their top strategies.
 *
 * @param game - The game to play
 * @param params - Rounds, forgetting and mistake rate (the seed is ignored)
 * @param worlds - Number of worlds to simulate
 * @param seedBase - Seed of the first world; world `w` uses `seedBase + w`
 * @returns Outcome counts and the number of unsettled worlds
 */
export function runEnsemble(
  game: GameDefinition,
  params: Omit<SimulationParams, 'seed'>,
  worlds: number,
  seedBase: number,
): EnsembleResult {
  const counts: Record<string, number> = {};
  let unsettled = 0;
  for (let w = 0; w < worlds; w++) {
    const { finalRow, finalCol } = simulateRun(game, { ...params, seed: seedBase + w }, false);
    const rowTop = argMax(finalRow);
    const colTop = argMax(finalCol);
    if (finalRow[rowTop] < SETTLED_THRESHOLD || finalCol[colTop] < SETTLED_THRESHOLD) {
      unsettled++;
      continue;
    }
    const key = `${rowTop},${colTop}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return { counts, unsettled, worlds };
}
