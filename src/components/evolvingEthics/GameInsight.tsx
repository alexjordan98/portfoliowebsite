import React from 'react';
import type { GameDefinition } from '@/lib/rothErev/types';

/**
 * GameInsight props.
 */
interface GameInsightProps {
  /** Game whose headline and insight to show. */
  game: GameDefinition;
}

/**
 * Dark teal "What this shows" card with the selected game's headline and insight.
 *
 * @param props - GameInsight props
 * @returns The insight card
 */
export default function GameInsight({ game }: GameInsightProps) {
  return (
    <aside className="ethics-insight">
      <p className="ethics-insight__kicker">What this shows</p>
      <p className="ethics-insight__headline">{game.headline}</p>
      <p className="ethics-insight__body">{game.insight}</p>
    </aside>
  );
}
