'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomGameEditor from './CustomGameEditor';
import EnsembleResults from './EnsembleResults';
import GameInsight from './GameInsight';
import GamePicker, { type GameOption } from './GamePicker';
import OutcomeHeatmap from './OutcomeHeatmap';
import ParameterSlider from './ParameterSlider';
import PayoffTable from './PayoffTable';
import PlaybackControls from './PlaybackControls';
import RunCaption from './RunCaption';
import StrategyChart from './StrategyChart';
import { usePlayback, useRothErevSimulation } from '@/hooks';
import { DEFAULT_WORLDS, INITIAL_SETTINGS } from '@/lib/rothErev/settings';
import {
  CUSTOM_GAME_ID,
  DEFAULT_CUSTOM_SPEC,
  PRESET_GAMES,
  buildCustomGame,
  type CustomGameSpec,
} from '@/lib/rothErev/games';
import { describeRunStatus, findLikeliestCell, summarizeEnsemble } from '@/lib/rothErev/summary';
import type { EnsembleResult, GameDefinition } from '@/lib/rothErev/types';

/** Tabs: the four presets plus the custom game. */
const GAME_OPTIONS: GameOption[] = [
  ...PRESET_GAMES.map((game) => ({ id: game.id, label: game.name })),
  { id: CUSTOM_GAME_ID, label: 'Custom' },
];

/**
 * EthicsSimulator props.
 */
interface EthicsSimulatorProps {
  /** Ensemble for `INITIAL_SETTINGS`, computed at build time so the first paint has results. */
  initialEnsemble: EnsembleResult;
}

/**
 * Calls `onChange` after the first render whenever `key` changes.
 *
 * @param key - Value whose changes should trigger the callback
 * @param onChange - Callback to run
 */
function useOnChange(key: string, onChange: () => void): void {
  const previous = useRef(key);
  const callback = useRef(onChange);
  callback.current = onChange;
  useEffect(() => {
    if (previous.current === key) return;
    previous.current = key;
    callback.current();
  }, [key]);
}

/**
 * The interactive part of the page: the "Run a world" simulator and the "Now run 200 worlds"
 * ensemble. Any change to the game or dials restarts the run from round 0.
 *
 * @param props - EthicsSimulator props
 * @returns The simulator and ensemble sections
 */
export default function EthicsSimulator({ initialEnsemble }: EthicsSimulatorProps) {
  const [gameId, setGameId] = useState(INITIAL_SETTINGS.gameId);
  const [customSpec, setCustomSpec] = useState<CustomGameSpec>(DEFAULT_CUSTOM_SPEC);
  const [rounds, setRounds] = useState(INITIAL_SETTINGS.rounds);
  const [forgetting, setForgetting] = useState(INITIAL_SETTINGS.forgetting);
  const [mistakes, setMistakes] = useState(INITIAL_SETTINGS.mistakes);
  const [seed, setSeed] = useState(INITIAL_SETTINGS.seed);
  const [ensembleSeed, setEnsembleSeed] = useState(INITIAL_SETTINGS.ensembleSeed);

  const customGame = useMemo(() => buildCustomGame(customSpec), [customSpec]);
  const game: GameDefinition =
    gameId === CUSTOM_GAME_ID ? customGame : PRESET_GAMES.find((g) => g.id === gameId) ?? PRESET_GAMES[0];

  const params = useMemo(() => ({ rounds, forgetting, mistakes, seed }), [rounds, forgetting, mistakes, seed]);
  const { history, ensemble, ensembleGame, ensemblePending } = useRothErevSimulation({
    game,
    params,
    ensembleSeed,
    worlds: DEFAULT_WORLDS,
    initialEnsemble,
  });
  const playback = usePlayback(rounds);
  useOnChange(`${game.id}|${JSON.stringify(customSpec)}|${rounds}|${forgetting}|${mistakes}|${seed}`, playback.restart);

  const round = Math.min(playback.round, rounds);
  const rowProbs = history.row[round];
  const colProbs = history.col[round];
  const likeliest = findLikeliestCell(rowProbs, colProbs);
  const bars = ensemble && ensembleGame ? summarizeEnsemble(ensembleGame, ensemble) : [];

  return (
    <>
      <section id="sim" className="ethics-section">
        <div className="ethics-section__header">
          <div className="ethics-section__intro ethics-section__intro--narrow">
            <h2 className="ethics-heading">Run a world</h2>
            <p className="ethics-intro-text">
              Pick a game, set the dials, press play. The grid shows how likely each pair of choices is at the
              current round.
            </p>
          </div>
          <GamePicker options={GAME_OPTIONS} selectedId={gameId} onSelect={setGameId} />
        </div>

        <div className="ethics-sim">
          <div className="ethics-card ethics-sim__settings">
            <div className="ethics-sim__game">
              <h3 className="ethics-sim__game-name">{game.name}</h3>
              <p className="ethics-sim__game-desc">{game.description}</p>
            </div>
            {gameId === CUSTOM_GAME_ID ? (
              <CustomGameEditor spec={customSpec} onChange={setCustomSpec} />
            ) : (
              <PayoffTable game={game} />
            )}
            <div className="ethics-sim__sliders">
              <ParameterSlider
                id="rounds"
                label="Rounds"
                value={rounds}
                min={100}
                max={2000}
                step={100}
                valueLabel={String(rounds)}
                onChange={setRounds}
              />
              <ParameterSlider
                id="delta"
                label="Forgetting (δ)"
                value={forgetting}
                min={0}
                max={0.1}
                step={0.005}
                valueLabel={forgetting.toFixed(3)}
                helper="How fast old habits fade. Higher means the players react more to recent rounds."
                onChange={setForgetting}
              />
              <ParameterSlider
                id="eps"
                label="Mistakes (ε)"
                value={mistakes}
                min={0}
                max={0.2}
                step={0.01}
                valueLabel={`${Math.round(mistakes * 100)}%`}
                helper="Chance a round is played at random. Mistakes can knock players out of a rut."
                onChange={setMistakes}
              />
            </div>
          </div>

          <div className="ethics-card ethics-card--raised ethics-sim__run">
            <PlaybackControls playback={playback} rounds={rounds} onNewWorld={() => setSeed((s) => s + 1)} />
            <div className="ethics-sim__results">
              <OutcomeHeatmap
                game={game}
                rowProbs={rowProbs}
                colProbs={colProbs}
                round={round}
                likeliest={likeliest}
              />
              <div className="ethics-sim__side">
                <RunCaption status={describeRunStatus(game, round, likeliest)} />
                <StrategyChart
                  title="Row player"
                  player="row"
                  series={history.row}
                  labels={game.rowLabels}
                  round={round}
                  rounds={rounds}
                />
                <StrategyChart
                  title="Column player"
                  player="col"
                  series={history.col}
                  labels={game.colLabels}
                  round={round}
                  rounds={rounds}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnsembleResults
        bars={bars}
        worlds={DEFAULT_WORLDS}
        pending={ensemblePending}
        onReroll={() => setEnsembleSeed((s) => s + DEFAULT_WORLDS)}
        aside={<GameInsight game={game} />}
      />
    </>
  );
}
