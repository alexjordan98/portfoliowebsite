import React from 'react';
import EthicsButton from './EthicsButton';
import ParameterSlider from './ParameterSlider';
import type { Playback } from '@/hooks';

/**
 * PlaybackControls props.
 */
interface PlaybackControlsProps {
  /** Playback state and controls from `usePlayback`. */
  playback: Playback;
  /** Total rounds in the run. */
  rounds: number;
  /** Starts a new run with a fresh seed. */
  onNewWorld: () => void;
}

/**
 * Play/Pause/Replay, Step and New world buttons, a "Round t / n" readout and a scrub slider.
 *
 * @param props - PlaybackControls props
 * @returns The playback toolbar and scrubber
 */
export default function PlaybackControls({ playback, rounds, onNewWorld }: PlaybackControlsProps) {
  const { round, isPlaying, play, pause, step, seek } = playback;
  const playLabel = isPlaying ? 'Pause' : round >= rounds ? 'Replay' : 'Play';

  return (
    <>
      <div className="ethics-playback">
        <div className="ethics-playback__buttons">
          <EthicsButton wide onClick={isPlaying ? pause : play}>{playLabel}</EthicsButton>
          <EthicsButton variant="soft" onClick={step}>Step</EthicsButton>
          <EthicsButton variant="soft" onClick={onNewWorld}>New world</EthicsButton>
        </div>
        <p className="ethics-playback__round">
          Round <strong>{round}</strong> / {rounds}
        </p>
      </div>
      <ParameterSlider
        id="scrub"
        label="Scrub through the run"
        variant="scrub"
        value={round}
        min={0}
        max={rounds}
        step={1}
        onChange={seek}
      />
    </>
  );
}
