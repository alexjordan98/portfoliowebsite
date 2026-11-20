'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { runEnsemble } from '@/lib/rothErev/ensemble';
import type { EnsembleRequest, EnsembleResponse } from '@/lib/rothErev/ensemble.worker';
import { DEFAULT_WORLDS } from '@/lib/rothErev/settings';
import { simulateRun } from '@/lib/rothErev/simulate';
import type { EnsembleResult, GameDefinition, RunHistory, SimulationParams } from '@/lib/rothErev/types';

export { DEFAULT_WORLDS };

/**
 * Inputs for {@link useRothErevSimulation}.
 */
export interface RothErevSimulationOptions {
  /** Game to play. */
  game: GameDefinition;
  /** Parameters for the single recorded run. The ensemble uses everything except `seed`. */
  params: SimulationParams;
  /** Seed of the first ensemble world; change it to reroll the ensemble. */
  ensembleSeed: number;
  /** Number of ensemble worlds. Defaults to {@link DEFAULT_WORLDS}. */
  worlds?: number;
  /** Ensemble already computed for the initial inputs (e.g. at build time); skips recomputing it on mount. */
  initialEnsemble?: EnsembleResult | null;
}

/**
 * Output of {@link useRothErevSimulation}.
 */
export interface RothErevSimulation {
  /** Round-by-round probabilities of the recorded run. */
  history: RunHistory;
  /** Latest ensemble tallies, or null until the first ensemble finishes. */
  ensemble: EnsembleResult | null;
  /** Game the latest ensemble was computed for (may lag behind `game` while pending). */
  ensembleGame: GameDefinition | null;
  /** True while a newer ensemble is still being computed. */
  ensemblePending: boolean;
}

/**
 * Creates the ensemble worker, or returns null where workers are unavailable.
 *
 * @returns A worker running `ensemble.worker.ts`, or null
 */
function createEnsembleWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null;
  try {
    return new Worker(new URL('../lib/rothErev/ensemble.worker.ts', import.meta.url));
  } catch {
    return null;
  }
}

/**
 * Runs one recorded Roth–Erev world plus an ensemble of many worlds for the same settings.
 *
 * The recorded run is computed synchronously and memoized on its inputs. The ensemble is
 * computed from deferred inputs in a Web Worker (falling back to a transition on the main
 * thread) so dragging a slider stays smooth.
 *
 * @param options - Game, parameters, ensemble seed and world count
 * @returns The recorded history and the latest ensemble result
 */
export function useRothErevSimulation({
  game,
  params,
  ensembleSeed,
  worlds = DEFAULT_WORLDS,
  initialEnsemble = null,
}: RothErevSimulationOptions): RothErevSimulation {
  const { rounds, forgetting, mistakes, seed } = params;

  const history = useMemo(
    () => simulateRun(game, { rounds, forgetting, mistakes, seed }, true).history as RunHistory,
    [game, rounds, forgetting, mistakes, seed],
  );

  const request = useMemo(
    () => ({ game, params: { rounds, forgetting, mistakes }, worlds, seedBase: ensembleSeed }),
    [game, rounds, forgetting, mistakes, worlds, ensembleSeed],
  );
  const deferredRequest = useDeferredValue(request);

  const initialRequest = useRef(request);
  const [ensemble, setEnsemble] = useState<EnsembleResult | null>(initialEnsemble);
  const [completedRequest, setCompletedRequest] = useState<typeof request | null>(initialEnsemble ? request : null);
  const workerRef = useRef<Worker | null>(null);
  const latestId = useRef(0);

  useEffect(() => {
    const worker = createEnsembleWorker();
    workerRef.current = worker;
    return () => {
      worker?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const id = ++latestId.current;
    if (initialEnsemble && deferredRequest === initialRequest.current) return;
    const worker = workerRef.current;
    if (!worker) {
      startTransition(() => {
        setEnsemble(runEnsemble(deferredRequest.game, deferredRequest.params, deferredRequest.worlds, deferredRequest.seedBase));
        setCompletedRequest(deferredRequest);
      });
      return;
    }
    const onMessage = (event: MessageEvent<EnsembleResponse>) => {
      if (event.data.id !== latestId.current) return;
      setEnsemble(event.data.result);
      setCompletedRequest(deferredRequest);
    };
    worker.addEventListener('message', onMessage);
    const message: EnsembleRequest = { id, ...deferredRequest };
    worker.postMessage(message);
    return () => worker.removeEventListener('message', onMessage);
  }, [deferredRequest, initialEnsemble]);

  return { history, ensemble, ensembleGame: completedRequest?.game ?? null, ensemblePending: completedRequest !== request };
}
