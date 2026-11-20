import { describe, expect, it } from 'vitest';
import { runEnsemble } from '../ensemble';
import {
  DEFAULT_CUSTOM_SPEC,
  DIVIDE_THE_DOLLAR,
  PRESET_GAMES,
  PRISONERS_DILEMMA,
  STAG_HUNT,
  buildCustomGame,
  classifyCustomCell,
  isValidCustomPayoff,
} from '../games';
import { heatColor } from '../heatColor';
import { createRng } from '../random';
import { simulateRun } from '../simulate';

const LONG_RUN = { rounds: 2000, forgetting: 0.01, mistakes: 0 };

/**
 * Returns the share of an ensemble's worlds that ended at the given cell.
 *
 * @param counts - Ensemble outcome counts
 * @param key - `"row,col"` cell key
 * @param worlds - Total worlds simulated
 * @returns Fraction between 0 and 1
 */
function share(counts: Record<string, number>, key: string, worlds: number): number {
  return (counts[key] ?? 0) / worlds;
}

describe('createRng', () => {
  it('produces the same sequence for the same seed', () => {
    const a = createRng(42);
    const b = createRng(42);
    for (let i = 0; i < 100; i++) expect(a()).toBe(b());
  });

  it('stays within [0, 1)', () => {
    const rng = createRng(7);
    for (let i = 0; i < 1000; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('simulateRun', () => {
  it('gives the same history for the same seed', () => {
    const params = { rounds: 300, forgetting: 0.02, mistakes: 0.05, seed: 11 };
    const first = simulateRun(STAG_HUNT, params, true);
    const second = simulateRun(STAG_HUNT, params, true);
    expect(first.history).toEqual(second.history);
  });

  it('records round 0 plus every round', () => {
    const run = simulateRun(DIVIDE_THE_DOLLAR, { rounds: 50, forgetting: 0, mistakes: 0, seed: 1 }, true);
    expect(run.history?.row).toHaveLength(51);
    expect(run.history?.row[0]).toEqual([1 / 3, 1 / 3, 1 / 3]);
  });

  it('keeps probabilities summing to 1 every round', () => {
    for (const game of PRESET_GAMES) {
      const run = simulateRun(game, { rounds: 400, forgetting: 0.05, mistakes: 0.1, seed: 3 }, true);
      for (const series of [run.history!.row, run.history!.col]) {
        for (const probs of series) {
          expect(probs.reduce((s, p) => s + p, 0)).toBeCloseTo(1, 9);
        }
      }
    }
  });

  it('omits the history when not recording', () => {
    const run = simulateRun(STAG_HUNT, { rounds: 10, forgetting: 0, mistakes: 0, seed: 1 }, false);
    expect(run.history).toBeNull();
    expect(run.finalRow).toHaveLength(2);
  });
});

describe('runEnsemble', () => {
  it('Stag Hunt ends at Hare/Hare in roughly 70–85% of worlds', () => {
    const result = runEnsemble(STAG_HUNT, LONG_RUN, 500, 1000);
    const hare = share(result.counts, '1,1', 500);
    expect(hare).toBeGreaterThanOrEqual(0.7);
    expect(hare).toBeLessThanOrEqual(0.85);
  });

  it("Prisoner's Dilemma ends at Defect/Defect in over 85% of worlds", () => {
    const result = runEnsemble(PRISONERS_DILEMMA, LONG_RUN, 500, 1000);
    expect(share(result.counts, '1,1', 500)).toBeGreaterThan(0.85);
  });

  it('Divide the Dollar lands on ½–½ more than on any other single outcome', () => {
    const result = runEnsemble(DIVIDE_THE_DOLLAR, LONG_RUN, 500, 1000);
    const fair = result.counts['1,1'] ?? 0;
    for (const [key, n] of Object.entries(result.counts)) {
      if (key !== '1,1') expect(fair).toBeGreaterThan(n);
    }
    expect(fair).toBeGreaterThan(result.unsettled);
  });
});

describe('heatColor', () => {
  it('maps the ends of the scale to the first and last stops', () => {
    expect(heatColor(0)).toBe('rgb(246,238,221)');
    expect(heatColor(1)).toBe('rgb(0,77,79)');
  });
});

describe('custom games', () => {
  it('labels outcomes generically', () => {
    const game = buildCustomGame(DEFAULT_CUSTOM_SPEC);
    expect(game.outcomes['0,1'].label).toBe('Row: Option A, Column: Option B');
  });

  it('classifies cells by efficiency and equality', () => {
    expect(classifyCustomCell(DEFAULT_CUSTOM_SPEC, 0, 0)).toBe('good');
    expect(classifyCustomCell(DEFAULT_CUSTOM_SPEC, 1, 1)).toBe('meager');
    const dilemma = {
      strategies: PRISONERS_DILEMMA.rowLabels,
      rowPayoffs: PRISONERS_DILEMMA.rowPayoffs,
      colPayoffs: PRISONERS_DILEMMA.colPayoffs,
    };
    expect(classifyCustomCell(dilemma, 1, 0)).toBe('unfair');
    expect(classifyCustomCell(dilemma, 1, 1)).toBe('meager');
  });

  it('accepts payoffs only from 0 to 10', () => {
    expect(isValidCustomPayoff(0)).toBe(true);
    expect(isValidCustomPayoff(10)).toBe(true);
    expect(isValidCustomPayoff(10.5)).toBe(false);
    expect(isValidCustomPayoff(-1)).toBe(false);
    expect(isValidCustomPayoff(Number.NaN)).toBe(false);
  });
});
