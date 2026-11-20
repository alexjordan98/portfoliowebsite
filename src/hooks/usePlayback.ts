'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Milliseconds between playback ticks. */
const TICK_MS = 40;

/** Number of ticks a full run takes (about 6.4 seconds at {@link TICK_MS}). */
const TICKS_PER_RUN = 160;

/**
 * Controls returned by {@link usePlayback}.
 */
export interface Playback {
  /** Round currently shown, from 0 to `totalRounds`. */
  round: number;
  /** True while the animation is advancing. */
  isPlaying: boolean;
  /** Starts playing; from the last round it starts again at round 0. */
  play: () => void;
  /** Stops at the current round. */
  pause: () => void;
  /** Pauses and advances one round. */
  step: () => void;
  /** Pauses and jumps to a round. */
  seek: (round: number) => void;
  /** Rewinds to round 0 and plays from there. */
  restart: () => void;
}

/**
 * Reports whether the user has asked the system to minimize motion.
 *
 * @returns True when `prefers-reduced-motion: reduce` matches
 */
function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animates through the rounds of a recorded run with `requestAnimationFrame`.
 *
 * Every {@link TICK_MS} ms it advances about `totalRounds / 160` rounds, so a full run takes
 * roughly six seconds whatever its length. With reduced motion, playing jumps straight to the
 * last round.
 *
 * @param totalRounds - Number of rounds in the run
 * @param initialRound - Round shown before anything is played (defaults to the last round)
 * @returns The current round and playback controls
 */
export function usePlayback(totalRounds: number, initialRound: number = totalRounds): Playback {
  const [round, setRound] = useState(Math.min(initialRound, totalRounds));
  const [isPlaying, setIsPlaying] = useState(false);
  const roundRef = useRef(round);
  roundRef.current = round;

  useEffect(() => {
    setRound((current) => Math.min(current, totalRounds));
  }, [totalRounds]);

  useEffect(() => {
    if (!isPlaying) return;
    const stepSize = Math.max(1, Math.round(totalRounds / TICKS_PER_RUN));
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const ticks = Math.floor((now - last) / TICK_MS);
      if (ticks > 0) {
        last += ticks * TICK_MS;
        const next = Math.min(totalRounds, roundRef.current + stepSize * ticks);
        setRound(next);
        if (next >= totalRounds) {
          setIsPlaying(false);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, totalRounds]);

  const playFrom = useCallback(
    (start: number) => {
      if (prefersReducedMotion()) {
        setRound(totalRounds);
        setIsPlaying(false);
        return;
      }
      setRound(start);
      setIsPlaying(true);
    },
    [totalRounds],
  );

  const play = useCallback(() => {
    playFrom(roundRef.current >= totalRounds ? 0 : roundRef.current);
  }, [playFrom, totalRounds]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const step = useCallback(() => {
    setIsPlaying(false);
    setRound((current) => Math.min(totalRounds, current + 1));
  }, [totalRounds]);

  const seek = useCallback(
    (target: number) => {
      setIsPlaying(false);
      setRound(Math.max(0, Math.min(totalRounds, Math.round(target))));
    },
    [totalRounds],
  );

  const restart = useCallback(() => playFrom(0), [playFrom]);

  return { round, isPlaying, play, pause, step, seek, restart };
}
