/**
 * Creates a seeded mulberry32 pseudo-random number generator.
 *
 * Replaces the `quantumrandom` web API used by the original Python project, which no
 * longer works, with a fast deterministic generator so runs are reproducible.
 *
 * @param seed - Any integer; the same seed always yields the same sequence
 * @returns A function returning uniformly distributed numbers in `[0, 1)`
 */
export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
