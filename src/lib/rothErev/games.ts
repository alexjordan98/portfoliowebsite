import type { GameDefinition, OutcomeDescriptor, OutcomeTone } from './types';

/**
 * Builds an outcome descriptor from a label and tone.
 *
 * @param label - Human-readable outcome
 * @param tone - Ethical reading of the outcome
 * @returns The descriptor
 */
function outcome(label: string, tone: OutcomeTone): OutcomeDescriptor {
  return { label, tone };
}

/** Divide the Dollar: three demands (⅓, ½, ⅔) on a pie worth 6. */
export const DIVIDE_THE_DOLLAR: GameDefinition = {
  id: 'dd',
  name: 'Divide the Dollar',
  description:
    'Split a pie between two players. Each asks for a share. If the two requests fit, both get what they asked for; if together they ask for too much, nobody gets anything.',
  rowLabels: ['Ask ⅓', 'Ask ½', 'Ask ⅔'],
  colLabels: ['Ask ⅓', 'Ask ½', 'Ask ⅔'],
  rowPayoffs: [[2, 2, 2], [3, 3, 0], [4, 0, 0]],
  colPayoffs: [[2, 3, 4], [2, 3, 0], [2, 0, 0]],
  outcomes: {
    '1,1': outcome('Fair: ½ and ½', 'good'),
    '2,0': outcome('Row takes ⅔, column ⅓', 'unfair'),
    '0,2': outcome('Column takes ⅔, row ⅓', 'unfair'),
    '0,0': outcome('Both settle for ⅓', 'meager'),
    '0,1': outcome('⅓ and ½, some left on the table', 'meager'),
    '1,0': outcome('½ and ⅓, some left on the table', 'meager'),
  },
  fallback: outcome('Too greedy, nobody gets paid', 'bad'),
  headline: 'Fairness is the likeliest outcome, but not a sure thing.',
  insight:
    'No one is told to be fair, yet the 50/50 split is the most common single ending. But in a large share of worlds, one player learns to ask for more and the other learns to accept less, and that unfair deal holds.',
};

/** Stag Hunt: cooperation pays best but is risky; hare is safe. */
export const STAG_HUNT: GameDefinition = {
  id: 'stag',
  name: 'Stag Hunt',
  description:
    'Hunting a stag together feeds both players best, but a lone stag hunter goes home with nothing. Hunting hare is safe whatever the other player does.',
  rowLabels: ['Stag', 'Hare'],
  colLabels: ['Stag', 'Hare'],
  rowPayoffs: [[4, 0], [3, 3]],
  colPayoffs: [[4, 3], [0, 3]],
  outcomes: {
    '0,0': outcome('Both hunt stag: trust', 'good'),
    '1,1': outcome('Both hunt hare: caution', 'meager'),
    '0,1': outcome('Row trusts, column doesn’t', 'bad'),
    '1,0': outcome('Column trusts, row doesn’t', 'bad'),
  },
  fallback: outcome('Mixed', 'bad'),
  headline: 'Trust, not greed, is the hard problem.',
  insight:
    'Everyone would be better off hunting stag, but most worlds settle on the safe hare. Cooperation only wins when early luck builds trust before caution takes hold. Skyrms argues this, not the Prisoner’s Dilemma, is the core problem of the social contract.',
};

/** Prisoner's Dilemma: defection dominates even though mutual cooperation is better. */
export const PRISONERS_DILEMMA: GameDefinition = {
  id: 'pd',
  name: 'Prisoner’s Dilemma',
  description:
    'Whatever the other player does, you score more by defecting. Yet if both cooperate, both do better than if both defect.',
  rowLabels: ['Cooperate', 'Defect'],
  colLabels: ['Cooperate', 'Defect'],
  rowPayoffs: [[3, 0], [5, 1]],
  colPayoffs: [[3, 5], [0, 1]],
  outcomes: {
    '0,0': outcome('Both cooperate', 'good'),
    '1,1': outcome('Both defect', 'bad'),
    '0,1': outcome('Column exploits row', 'unfair'),
    '1,0': outcome('Row exploits column', 'unfair'),
  },
  fallback: outcome('Mixed', 'bad'),
  headline: 'Learning alone doesn’t produce cooperation.',
  insight:
    'Defection takes over almost every world. Where people do cooperate in situations like this, there is usually something extra: repeat partners, reputation, punishment or institutions.',
};

/** Hawk–Dove: two hawks fight, a hawk beats a dove, two doves share. */
export const HAWK_DOVE: GameDefinition = {
  id: 'hd',
  name: 'Hawk–Dove',
  description:
    'Two players want the same thing. Two hawks fight and both lose; a hawk facing a dove takes it all; two doves share it.',
  rowLabels: ['Hawk', 'Dove'],
  colLabels: ['Hawk', 'Dove'],
  rowPayoffs: [[0, 4], [1, 2]],
  colPayoffs: [[0, 1], [4, 2]],
  outcomes: {
    '0,1': outcome('Row is hawk, column is dove', 'unfair'),
    '1,0': outcome('Column is hawk, row is dove', 'unfair'),
    '1,1': outcome('Both doves share', 'good'),
    '0,0': outcome('Both fight', 'bad'),
  },
  fallback: outcome('Mixed', 'bad'),
  headline: 'Arbitrary roles become stable rules.',
  insight:
    'Players almost never end up sharing. One becomes the hawk and the other the dove. Which player gets which role is down to luck, but once set it holds, much like a convention of ownership.',
};

/** The four preset games, in tab order. */
export const PRESET_GAMES: GameDefinition[] = [DIVIDE_THE_DOLLAR, STAG_HUNT, PRISONERS_DILEMMA, HAWK_DOVE];

/** Identifier of the user-editable game. */
export const CUSTOM_GAME_ID = 'custom';

/** Smallest payoff a custom game accepts. */
export const CUSTOM_PAYOFF_MIN = 0;

/** Largest payoff a custom game accepts. */
export const CUSTOM_PAYOFF_MAX = 10;

/**
 * The editable parts of a custom game.
 */
export interface CustomGameSpec {
  /** Strategy names shared by both players (2 or 3 entries). */
  strategies: string[];
  /** Row player's payoff, indexed `[row][col]`. */
  rowPayoffs: number[][];
  /** Column player's payoff, indexed `[row][col]`. */
  colPayoffs: number[][];
}

/** Starting point for the custom tab: a 2×2 coordination game. */
export const DEFAULT_CUSTOM_SPEC: CustomGameSpec = {
  strategies: ['Option A', 'Option B'],
  rowPayoffs: [[5, 0], [2, 2]],
  colPayoffs: [[5, 2], [0, 2]],
};

/**
 * Classifies a custom-game cell by comparing it with every other cell.
 *
 * A cell is `bad` when both players get nothing, `meager` when another cell makes both
 * players strictly better off, `good` when it is efficient and equal, and `unfair` when it
 * is efficient but unequal.
 *
 * @param spec - The custom game
 * @param i - Row index
 * @param j - Column index
 * @returns The tone of the cell
 */
export function classifyCustomCell(spec: CustomGameSpec, i: number, j: number): OutcomeTone {
  const a = spec.rowPayoffs[i][j];
  const b = spec.colPayoffs[i][j];
  if (a === 0 && b === 0) return 'bad';
  const dominated = spec.rowPayoffs.some((row, r) =>
    row.some((other, c) => other > a && spec.colPayoffs[r][c] > b),
  );
  if (dominated) return 'meager';
  return a === b ? 'good' : 'unfair';
}

/**
 * Turns a custom spec into a playable game with generic outcome labels ("Row: X, Column: Y").
 *
 * @param spec - Strategy names and payoffs entered by the user
 * @returns A game definition the engine can run
 */
export function buildCustomGame(spec: CustomGameSpec): GameDefinition {
  const outcomes: Record<string, OutcomeDescriptor> = {};
  spec.strategies.forEach((rowName, i) => {
    spec.strategies.forEach((colName, j) => {
      outcomes[`${i},${j}`] = outcome(`Row: ${rowName}, Column: ${colName}`, classifyCustomCell(spec, i, j));
    });
  });
  return {
    id: CUSTOM_GAME_ID,
    name: 'Custom game',
    description:
      'Your own game, like the original Python tool. Name the strategies, set each payoff from 0 to 10, and see which habits take hold.',
    rowLabels: spec.strategies,
    colLabels: spec.strategies,
    rowPayoffs: spec.rowPayoffs,
    colPayoffs: spec.colPayoffs,
    outcomes,
    fallback: outcome('Mixed', 'bad'),
    headline: 'Your rules, your norms.',
    insight:
      'Whatever matrix you enter, the players only ever repeat what paid. Try making cooperation pay a little more, or a little less, and see how often it survives.',
  };
}

/**
 * Checks that a payoff is a number within the custom-game range.
 *
 * @param value - Candidate payoff
 * @returns True when the value is finite and between {@link CUSTOM_PAYOFF_MIN} and {@link CUSTOM_PAYOFF_MAX}
 */
export function isValidCustomPayoff(value: number): boolean {
  return Number.isFinite(value) && value >= CUSTOM_PAYOFF_MIN && value <= CUSTOM_PAYOFF_MAX;
}

/**
 * Looks up the descriptor for a cell, falling back to the game's default.
 *
 * @param game - The game being played
 * @param i - Row index
 * @param j - Column index
 * @returns The outcome descriptor for that cell
 */
export function describeOutcome(game: GameDefinition, i: number, j: number): OutcomeDescriptor {
  return game.outcomes[`${i},${j}`] ?? game.fallback;
}
