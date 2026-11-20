import React from 'react';
import type { RunStatus } from '@/lib/rothErev/summary';

/**
 * RunCaption props.
 */
interface RunCaptionProps {
  /** Status from `describeRunStatus`. */
  status: RunStatus;
}

/**
 * Status card above the strategy charts: "Round 0", "Still exploring", "Leaning toward" or
 * "Settled", with the outcome it refers to.
 *
 * @param props - RunCaption props
 * @returns The status card
 */
export default function RunCaption({ status }: RunCaptionProps) {
  return (
    <div className={`ethics-caption ethics-caption--${status.stage}`}>
      <p className="ethics-caption__kicker">{status.kicker}</p>
      <p className="ethics-caption__text">{status.text}</p>
    </div>
  );
}
