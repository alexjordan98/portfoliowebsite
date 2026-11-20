import React from 'react';
import ModelLimits from './ModelLimits';

/**
 * One takeaway card.
 */
interface Takeaway {
  /** Card heading. */
  title: string;
  /** Card body. */
  body: string;
}

/** What the simulations suggest about human ethics. */
const TAKEAWAYS: Takeaway[] = [
  {
    title: 'Norms can grow from habit',
    body: 'Nobody in the model is told to trust or to share. Stable conventions still form, because people keep doing what has worked for them.',
  },
  {
    title: 'History decides a lot',
    body: 'The same rules can lead to different outcomes. Luck in the first few rounds decides which norm takes hold, and an unfair norm can last just as long as a fair one.',
  },
  {
    title: 'Fairness pulls hardest',
    body: 'When two players split something, the 50/50 split is where they land most often. Equal treatment emerges without being imposed.',
  },
  {
    title: 'Trust is the hard part',
    body: 'Cooperating would make everyone better off, yet it’s fragile. Caution or self-interest usually wins unless something else helps, like reputation, repeat partners or institutions.',
  },
];

/**
 * "What it suggests about human ethics" section: four takeaway cards and the model's limits.
 *
 * @returns The takeaways section
 */
export default function EthicsTakeaways() {
  return (
    <section className="ethics-section ethics-section--roomy">
      <div className="ethics-section__intro ethics-section__intro--wide">
        <h2 className="ethics-heading">What it suggests about human ethics</h2>
        <p className="ethics-intro-text">
          Philosophers like Brian Skyrms use models like this to ask how a social contract could grow out of
          ordinary, self-interested learning instead of being designed by anyone.
        </p>
      </div>
      <div className="ethics-takeaways">
        {TAKEAWAYS.map((takeaway) => (
          <article key={takeaway.title} className="ethics-card ethics-takeaway">
            <h3 className="ethics-takeaway__title">{takeaway.title}</h3>
            <p className="ethics-body-text">{takeaway.body}</p>
          </article>
        ))}
      </div>
      <ModelLimits />
    </section>
  );
}
