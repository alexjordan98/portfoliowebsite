import React from 'react';

/**
 * Sand-colored panel with the model's limits and further reading.
 *
 * @returns The limits panel
 */
export default function ModelLimits() {
  return (
    <div className="ethics-limits">
      <div className="ethics-limits__column">
        <h3 className="ethics-limits__title">What this doesn’t show</h3>
        <p className="ethics-body-text">
          The model explains how a norm could arise. It doesn’t tell you which norm is right. Real people also
          have language, culture, empathy and punishment, and none of that is in this model.
        </p>
      </div>
      <div className="ethics-limits__column">
        <h3 className="ethics-limits__title">Further reading</h3>
        <p className="ethics-body-text">
          Roth &amp; Erev, “Learning in Extensive-Form Games” (1995) · Skyrms, <em>Evolution of the Social
          Contract</em> (1996) · Skyrms, <em>The Stag Hunt and the Evolution of Social Structure</em> (2004)
        </p>
      </div>
    </div>
  );
}
