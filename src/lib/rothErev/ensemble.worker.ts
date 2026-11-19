import { runEnsemble } from './ensemble';
import type { EnsembleResult, GameDefinition, SimulationParams } from './types';

/**
 * Message sent to the ensemble worker.
 */
export interface EnsembleRequest {
  /** Increasing request id, echoed back so stale replies can be ignored. */
  id: number;
  /** Game to simulate. */
  game: GameDefinition;
  /** Rounds, forgetting and mistake rate. */
  params: Omit<SimulationParams, 'seed'>;
  /** Number of worlds to run. */
  worlds: number;
  /** Seed of the first world. */
  seedBase: number;
}

/**
 * Message posted back by the ensemble worker.
 */
export interface EnsembleResponse {
  /** Id of the request this answers. */
  id: number;
  /** Ensemble tallies. */
  result: EnsembleResult;
}

/**
 * Runs the requested ensemble off the main thread and posts the tallies back.
 *
 * @param event - Message carrying an {@link EnsembleRequest}
 */
function handleRequest(event: MessageEvent<EnsembleRequest>): void {
  const { id, game, params, worlds, seedBase } = event.data;
  const response: EnsembleResponse = { id, result: runEnsemble(game, params, worlds, seedBase) };
  self.postMessage(response);
}

self.addEventListener('message', handleRequest);
