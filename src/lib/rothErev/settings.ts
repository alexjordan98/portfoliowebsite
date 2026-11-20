import { PRESET_GAMES } from './games';

/** Number of worlds in the ensemble. */
export const DEFAULT_WORLDS = 200;

/** Starting game and dials for the simulator, matching the design. */
export const INITIAL_SETTINGS = {
  gameId: PRESET_GAMES[0].id,
  rounds: 1000,
  forgetting: 0.01,
  mistakes: 0.02,
  seed: 3,
  ensembleSeed: 1000,
};
