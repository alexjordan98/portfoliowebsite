'use client';

import React, { useState } from 'react';
import EthicsButton from './EthicsButton';
import EthicsInput from './EthicsInput';
import {
  CUSTOM_PAYOFF_MAX,
  CUSTOM_PAYOFF_MIN,
  isValidCustomPayoff,
  type CustomGameSpec,
} from '@/lib/rothErev/games';

/** Matrix sizes the editor supports. */
const SIZES = [2, 3] as const;

/** Longest allowed strategy name. */
const MAX_NAME_LENGTH = 16;

/** Names given to strategies that don't have one yet. */
const PLACEHOLDER_NAMES = ['Option A', 'Option B', 'Option C'];

/** Id of the error message under the editor. */
const ERROR_ID = 'custom-game-error';

/**
 * Raw, possibly invalid text the user has typed.
 */
interface EditorDraft {
  /** Strategy names (always three; only the first `size` are used). */
  names: string[];
  /** Row player's payoffs as text, 3×3. */
  rowPayoffs: string[][];
  /** Column player's payoffs as text, 3×3. */
  colPayoffs: string[][];
  /** Number of strategies, 2 or 3. */
  size: number;
}

/**
 * Pads a numeric matrix to 3×3 text, filling missing cells with "0".
 *
 * @param matrix - Payoffs for a 2×2 or 3×3 game
 * @returns 3×3 matrix of strings
 */
function toTextMatrix(matrix: number[][]): string[][] {
  return [0, 1, 2].map((i) => [0, 1, 2].map((j) => String(matrix[i]?.[j] ?? 0)));
}

/**
 * Creates the editable draft from a spec.
 *
 * @param spec - Current custom game
 * @returns Draft with text values
 */
function draftFromSpec(spec: CustomGameSpec): EditorDraft {
  return {
    names: PLACEHOLDER_NAMES.map((name, i) => spec.strategies[i] ?? name),
    rowPayoffs: toTextMatrix(spec.rowPayoffs),
    colPayoffs: toTextMatrix(spec.colPayoffs),
    size: spec.strategies.length,
  };
}

/**
 * Parses the draft into a playable spec.
 *
 * @param draft - Text the user typed
 * @returns The spec, or an error message describing what is wrong
 */
function parseDraft(draft: EditorDraft): { spec: CustomGameSpec } | { error: string } {
  const indices = Array.from({ length: draft.size }, (_, i) => i);
  const names = indices.map((i) => draft.names[i].trim());
  if (names.some((name) => name === '')) return { error: 'Every strategy needs a name.' };
  if (new Set(names).size !== names.length) return { error: 'Strategy names must be different.' };
  const parse = (matrix: string[][]) => indices.map((i) => indices.map((j) => Number(matrix[i][j].trim() || NaN)));
  const rowPayoffs = parse(draft.rowPayoffs);
  const colPayoffs = parse(draft.colPayoffs);
  if (![...rowPayoffs.flat(), ...colPayoffs.flat()].every(isValidCustomPayoff)) {
    return { error: `Payoffs must be numbers from ${CUSTOM_PAYOFF_MIN} to ${CUSTOM_PAYOFF_MAX}.` };
  }
  return { spec: { strategies: names, rowPayoffs, colPayoffs } };
}

/**
 * Returns a copy of a 3×3 text matrix with one cell replaced.
 *
 * @param matrix - Original matrix
 * @param i - Row index
 * @param j - Column index
 * @param value - New text
 * @returns The updated matrix
 */
function withCell(matrix: string[][], i: number, j: number, value: string): string[][] {
  return matrix.map((row, r) => row.map((cell, c) => (r === i && c === j ? value : cell)));
}

/**
 * CustomGameEditor props.
 */
interface CustomGameEditorProps {
  /** Last valid custom game. */
  spec: CustomGameSpec;
  /** Called whenever the edits form a valid game. */
  onChange: (spec: CustomGameSpec) => void;
}

/**
 * Editor for the "Custom" tab: 2×2 or 3×3 size, strategy names and both players' payoffs
 * (0–10). The simulation only updates while every field is valid; otherwise an error explains
 * what to fix and the last valid game keeps running.
 *
 * @param props - CustomGameEditor props
 * @returns The editable payoff matrix
 */
export default function CustomGameEditor({ spec, onChange }: CustomGameEditorProps) {
  const [draft, setDraft] = useState<EditorDraft>(() => draftFromSpec(spec));
  const parsed = parseDraft(draft);
  const error = 'error' in parsed ? parsed.error : null;
  const indices = Array.from({ length: draft.size }, (_, i) => i);

  const update = (next: EditorDraft) => {
    setDraft(next);
    const result = parseDraft(next);
    if ('spec' in result) onChange(result.spec);
  };

  return (
    <div className="ethics-payoffs">
      <div className="ethics-custom__toolbar">
        <p className="ethics-payoffs__legend">
          Payoffs <span className="ethics-text--row">row player</span> ·{' '}
          <span className="ethics-text--col">column player</span>
        </p>
        <div role="group" aria-label="Number of strategies" className="ethics-picker ethics-picker--small">
          {SIZES.map((size) => (
            <EthicsButton
              key={size}
              variant="tab"
              pressed={draft.size === size}
              onClick={() => update({ ...draft, size })}
            >
              {`${size}×${size}`}
            </EthicsButton>
          ))}
        </div>
      </div>
      <fieldset className="ethics-custom__names">
        <legend className="ethics-custom__label">Strategy names</legend>
        {indices.map((i) => (
          <EthicsInput
            key={i}
            id={`custom-name-${i}`}
            ariaLabel={`Strategy ${i + 1} name`}
            value={draft.names[i]}
            maxLength={MAX_NAME_LENGTH}
            onChange={(value) => update({ ...draft, names: draft.names.map((n, k) => (k === i ? value : n)) })}
          />
        ))}
      </fieldset>
      <div className="ethics-payoffs__scroll">
        <table className="ethics-payoffs__table">
          <thead>
            <tr>
              <th scope="col" className="ethics-payoffs__corner">
                <span className="ethics-visually-hidden">Row strategy</span>
              </th>
              {indices.map((j) => (
                <th key={j} scope="col" className="ethics-payoffs__col-head">{draft.names[j]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indices.map((i) => (
              <tr key={i}>
                <th scope="row" className="ethics-payoffs__row-head">{draft.names[i]}</th>
                {indices.map((j) => (
                  <td key={j} className="ethics-payoffs__cell ethics-payoffs__cell--edit">
                    <EthicsInput
                      id={`custom-row-${i}-${j}`}
                      variant="payoff"
                      player="row"
                      ariaLabel={`Row player payoff when row plays ${draft.names[i]} and column plays ${draft.names[j]}`}
                      value={draft.rowPayoffs[i][j]}
                      maxLength={4}
                      errorId={isValidCustomPayoff(Number(draft.rowPayoffs[i][j].trim() || NaN)) ? undefined : ERROR_ID}
                      onChange={(value) => update({ ...draft, rowPayoffs: withCell(draft.rowPayoffs, i, j, value) })}
                    />
                    <span className="ethics-payoffs__comma">,</span>
                    <EthicsInput
                      id={`custom-col-${i}-${j}`}
                      variant="payoff"
                      player="col"
                      ariaLabel={`Column player payoff when row plays ${draft.names[i]} and column plays ${draft.names[j]}`}
                      value={draft.colPayoffs[i][j]}
                      maxLength={4}
                      errorId={isValidCustomPayoff(Number(draft.colPayoffs[i][j].trim() || NaN)) ? undefined : ERROR_ID}
                      onChange={(value) => update({ ...draft, colPayoffs: withCell(draft.colPayoffs, i, j, value) })}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p id={ERROR_ID} className="ethics-custom__error" role="status">
        {error ?? ''}
      </p>
    </div>
  );
}
