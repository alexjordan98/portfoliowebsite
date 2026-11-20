/** RGB stops of the heat scale: sand, aqua, teal, dark teal. */
const HEAT_STOPS: [number, number, number][] = [
  [246, 238, 221],
  [131, 197, 190],
  [0, 109, 119],
  [0, 77, 79],
];

/** Positions of {@link HEAT_STOPS} along the 0–1 scale. */
const HEAT_POSITIONS = [0, 0.45, 0.75, 1];

/** Exponent applied before interpolation so small probabilities stay visible. */
const HEAT_EXPONENT = 0.75;

/**
 * Maps a probability to a color on the four-stop scale `#F6EEDD → #83C5BE → #006D77 → #004D4F`.
 *
 * @param value - Probability between 0 and 1 (values outside are clamped)
 * @returns A CSS `rgb(...)` color string
 */
export function heatColor(value: number): string {
  const x = Math.pow(Math.max(0, Math.min(1, value)), HEAT_EXPONENT);
  let k = 0;
  while (k < HEAT_POSITIONS.length - 2 && x > HEAT_POSITIONS[k + 1]) k++;
  const f = (x - HEAT_POSITIONS[k]) / (HEAT_POSITIONS[k + 1] - HEAT_POSITIONS[k]);
  const rgb = HEAT_STOPS[k].map((a, i) => Math.round(a + (HEAT_STOPS[k + 1][i] - a) * f));
  return `rgb(${rgb.join(',')})`;
}
