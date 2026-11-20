import React from 'react';

/**
 * One step of the learning rule.
 */
interface LearningStep {
  /** Step heading. */
  title: string;
  /** Step explanation. */
  body: string;
}

/** The three steps of Roth–Erev learning, in order. */
const STEPS: LearningStep[] = [
  {
    title: 'Play',
    body: 'Every round, each player picks a strategy. Each strategy has a weight, and heavier strategies get picked more often.',
  },
  {
    title: 'Reinforce',
    body: 'Whatever a player earned that round is added to the weight of the strategy they used. Success is sticky.',
  },
  {
    title: 'Forget and slip',
    body: 'Old weights fade a little each round (forgetting, δ). Now and then a player picks at random by mistake (ε).',
  },
];

/**
 * "How the players learn" section: three numbered cards and the update formula.
 *
 * @returns The explanation section, anchored at `#how`
 */
export default function HowItWorks() {
  return (
    <section id="how" className="ethics-section ethics-section--roomy">
      <div className="ethics-section__intro">
        <h2 className="ethics-heading">How the players learn</h2>
        <p className="ethics-intro-text">
          The model comes from Roth and Erev’s work on how people actually learn in repeated games. It’s
          deliberately simple: no foresight and no morality, just habits that get stronger when they pay.
        </p>
      </div>
      <ol className="ethics-steps">
        {STEPS.map((step, index) => (
          <li key={step.title} className="ethics-card ethics-step">
            <span className="ethics-step__number" aria-hidden="true">{index + 1}</span>
            <h3 className="ethics-step__title">{step.title}</h3>
            <p className="ethics-body-text">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="ethics-formula">weight ← (1 − δ) × weight + payoff</p>
    </section>
  );
}
