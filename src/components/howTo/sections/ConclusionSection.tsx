import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Container from '@/components/Container';
import AnimatedSection from '@/components/AnimatedSection';

/**
 * Conclusion section component for the "How This Site Was Made" page
 *
 * Provides a comprehensive closing statement that summarizes the purpose
 * of the portfolio website and the "How This Site Was Made" guide. Emphasizes
 * technical capabilities, educational goals, and architectural thinking while
 * maintaining an approachable tone.
 *
 * Uses the pink-container for visual distinction as the final section,
 * with text-only content for a clean, professional ending.
 *
 * @returns TSX element containing the conclusion section
 */
export default function ConclusionSection() {
  return (
    <AnimatedSection animation="fadeUp" delay={1100}>
      <Container
        size="full"
        childLayout="vertical"
        childAlignment="child-center"
        className="pink-container"
      >
        <div className="title-how-to">
          <Title
            text="Conclusion"
            level={2}
            align="center"
            underlined={true}
            shadow={true}
          />
        </div>
        <div className="long-paragraphs">
          <Paragraph
            text="I hope that this page has helped to show that I am capable of building robust and complex websites. From creating a high-level plan to architecting the system, and then executing on the technical details, my goal was to demonstrate that I can take an idea from concept to production."
            size="xl"
            align="left"
          />

          <Paragraph
            text="This explanation is also meant to highlight that I can competently use technologies like React, TSX, Java, and AWS, while applying high-level object-oriented design principles. These are the same tools and approaches used by professional teams every day, and I would like employers to see that I could easily contribute to — or integrate with — any design or engineering team working with this stack."
            size="xl"
            align="left"
          />

          <Paragraph
            text="At the same time, I wanted this site to serve a bigger purpose: to make the process of building software less intimidating. By breaking down the architecture into clear sections and metaphors, I've tried to show that these systems aren't magic boxes — they're just organized layers of logic, data, and design. Anyone can learn this with the right guidance, and as developers we should be doing a better job explaining how things work."
            size="xl"
            align="left"
          />

          <Paragraph
            text="Finally, my aim is for this page to give a sense of the kind of architectural thinking necessary for a lead engineer. That means I could step into a role as a team lead, or independently create and maintain a website for a smaller company end-to-end. I would also like this site to act as a roadmap for anyone making their own project — helping beginners see not just the what, but the how to think like an engineer."
            size="xl"
            align="left"
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}