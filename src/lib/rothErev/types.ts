/**
 * How an outcome reads ethically, used to color ensemble bars and captions.
 * - `good`: good for both players
 * - `unfair`: a lopsided convention
 * - `meager`: safe but leaves value on the table
 * - `bad`: bad for both players
 */
export type OutcomeTone = 'good' | 'unfair' | 'meager' | 'bad';

/**
 * A named outcome for one cell of the payoff matrix.
 */
export interface OutcomeDescriptor {
  /** Human-readable description of the outcome. */
  label: string;
  /** Ethical reading of the outcome. */
  tone: OutcomeTone;
}

/**
 * A two-player normal-form game the simulator can play.
 */
export interface GameDefinition {
  /** Stable identifier used for tabs and lookups. */
  id: string;
  /** Display name of the game. */
  name: string;
  /** One-paragraph explanation of the game's story. */
  description: string;
  /** Strategy names for the row player. */
  rowLabels: string[];
  /** Strategy names for the column player. */
  colLabels: string[];
  /** Row player's payoff, indexed `[row][col]`. */
  rowPayoffs: number[][];
  /** Column player's payoff, indexed `[row][col]`. */
  colPayoffs: number[][];
  /** Outcome descriptors keyed by `"row,col"`. */
  outcomes: Record<string, OutcomeDescriptor>;
  /** Descriptor used for any cell missing from `outcomes`. */
  fallback: OutcomeDescriptor;
  /** Short takeaway shown in the insight card. */
  headline: string;
  /** Longer explanation shown under the headline. */
  insight: string;
}

/**
 * Tunable parameters for a single simulated run.
 */
export interface SimulationParams {
  /** Number of rounds to play. */
  rounds: number;
  /** Forgetting rate δ: fraction of every weight lost each round. */
  forgetting: number;
  /** Mistake rate ε: chance a round is played uniformly at random. */
  mistakes: number;
  /** Seed for the deterministic random number generator. */
  seed: number;
}

/**
 * Normalized strategy probabilities for both players at every round,
 * including round 0 (before any play).
 */
export interface RunHistory {
  /** Row player's probabilities, indexed `[round][strategy]`. */
  row: number[][];
  /** Column player's probabilities, indexed `[round][strategy]`. */
  col: number[][];
}

/**
 * Result of a single run: the final probabilities, plus the full history when recorded.
 */
export interface RunResult {
  /** Row player's final strategy probabilities. */
  finalRow: number[];
  /** Column player's final strategy probabilities. */
  finalCol: number[];
  /** Round-by-round history, present only when recording was requested. */
  history: RunHistory | null;
}

/**
 * Aggregate result of running many independent worlds.
 */
export interface EnsembleResult {
  /** Number of settled worlds per `"row,col"` outcome. */
  counts: Record<string, number>;
  /** Number of worlds where at least one player had not settled. */
  unsettled: number;
  /** Total worlds simulated. */
  worlds: number;
}
