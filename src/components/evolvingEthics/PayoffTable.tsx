import React from 'react';
import type { GameDefinition } from '@/lib/rothErev/types';

/**
 * PayoffTable props.
 */
interface PayoffTableProps {
  /** Game whose payoffs to show. */
  game: GameDefinition;
}

/**
 * Payoff matrix as an accessible table: row player's payoff in teal, column player's in plum.
 *
 * @param props - PayoffTable props
 * @returns The payoff legend and a horizontally scrollable table
 */
export default function PayoffTable({ game }: PayoffTableProps) {
  return (
    <div className="ethics-payoffs">
      <p className="ethics-payoffs__legend">
        Payoffs <span className="ethics-text--row">row player</span> ·{' '}
        <span className="ethics-text--col">column player</span>
      </p>
      <div className="ethics-payoffs__scroll">
        <table className="ethics-payoffs__table">
          <thead>
            <tr>
              <th scope="col" className="ethics-payoffs__corner">
                <span className="ethics-visually-hidden">Row strategy</span>
              </th>
              {game.colLabels.map((label) => (
                <th key={label} scope="col" className="ethics-payoffs__col-head">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {game.rowLabels.map((rowLabel, i) => (
              <tr key={rowLabel}>
                <th scope="row" className="ethics-payoffs__row-head">{rowLabel}</th>
                {game.colLabels.map((colLabel, j) => (
                  <td key={colLabel} className="ethics-payoffs__cell">
                    <span className="ethics-text--row">{game.rowPayoffs[i][j]}</span>
                    <span className="ethics-payoffs__comma">, </span>
                    <span className="ethics-text--col">{game.colPayoffs[i][j]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
