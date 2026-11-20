import React from 'react';
import EthicsButton from './EthicsButton';

/**
 * One choice in the game picker.
 */
export interface GameOption {
  /** Game id. */
  id: string;
  /** Tab text. */
  label: string;
}

/**
 * GamePicker props.
 */
interface GamePickerProps {
  /** Games to choose from, in order. */
  options: GameOption[];
  /** Id of the selected game. */
  selectedId: string;
  /** Called with the id of a newly chosen game. */
  onSelect: (id: string) => void;
}

/**
 * Segmented pill group of toggle buttons for choosing a game. On narrow screens it becomes a
 * two-column grid, with an odd last tab spanning the full width.
 *
 * @param props - GamePicker props
 * @returns A labeled group of `aria-pressed` buttons
 */
export default function GamePicker({ options, selectedId, onSelect }: GamePickerProps) {
  return (
    <div role="group" aria-label="Choose a game" className="ethics-picker ethics-picker--games">
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <EthicsButton
            key={option.id}
            variant="tab"
            pressed={selected}
            onClick={() => {
              if (!selected) onSelect(option.id);
            }}
          >
            {option.label}
          </EthicsButton>
        );
      })}
    </div>
  );
}
