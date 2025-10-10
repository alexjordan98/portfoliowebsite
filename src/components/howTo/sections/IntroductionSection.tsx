import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import AnimatedSection from '@/components/AnimatedSection';
import Container from '@/components/Container';

/**
 * Introduction section component for the "How This Site Was Made" page
 *
 * @returns TSX element containing the introduction content
 */
export default function IntroductionSection() {
  return (
    <AnimatedSection animation="fadeUp" delay={0}>
      <Container
        className="light-green-container"
        size="full"
        childLayout="vertical"
        childAlignment="child-center"
      >
        <div className="title-how-to">
          <Title
            text="Introduction"
            level={2}
            align="center"
            shadow={true}
            underlined={true}

          />
        </div>
        <div className="long-paragraphs">
          <Paragraph
            text="A lot of people asked me why I chose to build this site from scratch. When I set out to build this site,
                I could have gone the easy route — spun up a template on GoDaddy or Wix, clicked a few buttons, and called it
                a day. But that wasn't the point. I wanted something more than just a digital business card. I wanted a project
                 that would not only showcase who I am, but also demonstrate that I can design, structure, and deploy a complete
                 full-stack application from scratch."
            size="xl"
            align="left"
          />
          <Paragraph
            text="I want this site to be a useful teaching tool for anyone who wants to understand how to create their own
          modern React-Next website, or how to create a Java-Spring Boot backend. I will try to explain the choices I made
          and how the pieces fit together, so someone just getting into this ecosystem can follow along and see how a real project comes together."
            size="xl"
            align="left"
          />
          <Paragraph
            text="I think it's also important that I include this how-to page specifically. I wanted to explain that these
                concepts aren't out of reach. Anyone can understand the high-level ideas behind how a site like this works,
                and anyone can learn to code if they approach it step by step. Too often, people in software talk in jargon
                that makes technology feel inaccessible. I believe we can do better. Explaining complex systems in plain
                language isn't dumbing things down — it's proof that you really understand them."
            size="xl"
            align="left"
          />
          <Paragraph
            text="Building it this way gave me full control over every detail — from the structure of the components
                in React, to the flow of data between the backend and the SQL database, to the color palette and layout
                that make the site feel approachable. That control means the final product is stronger, more maintainable,
                and more flexible than anything I could have thrown together with an out-of-the-box website builder."
            size="xl"
            align="left"
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}