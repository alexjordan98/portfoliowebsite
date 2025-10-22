import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import NumberedList from '@/components/NumberedList';
import DisplayImage from '@/components/DisplayImage';
import AnimatedSection from '@/components/AnimatedSection';
import animeDesignImage from '@/images/anime-painting-design.png';
import Container from '@/components/Container';

/**
 * Design Decisions section component for the "How This Site Was Made" page
 *
 * @returns TSX element containing the design decisions content with split layout
 */
export default function DesignDecisionsSection() {
    const designDecisions = [
        {
            boldPrefix: "Soft color palette:",
            text: " I leaned into softer tones rather than harsh contrasts. This makes the site easier to read, creates a calmer mood, and avoids the sterile \"corporate\" look."
        },
        {
            boldPrefix: "Card-based layout:",
            text: " Each section is wrapped in a card, giving the content its own container. This makes information modular and scannable — visitors can easily jump between projects, jobs, or skills without being buried in text."
        },
        {
            boldPrefix: "Tabs on the Resume page:",
            text: " Instead of cramming everything into a single scroll, I split the content into tabs (Education, Jobs, Projects, Startups). It keeps things clean, interactive, and more aligned with how people actually explore resumes."
        },
        {
            boldPrefix: "Animations on scroll:",
            text: " Subtle transitions as sections appear keep the site feeling alive and polished without distracting from the content."
        },
        {
            boldPrefix: "Component reusability:",
            text: " I designed with React components so the same building blocks (like cards, buttons, or titles) could be reused across pages. This keeps the look consistent and makes the codebase much easier to maintain."
        }
    ];

    return (
        <AnimatedSection animation="fadeUp" delay={100}>
            <Container
                className="pink-container"
                size="full"
                childLayout="vertical"
                childAlignment="child-center"
            >
                <div className="design-decisions-layout">
                    <div className="design-decisions-content">
                        <div className="title-how-to">
                            <Title
                                text="Design Decisions"
                                level={2}
                                align="center"
                                underlined={true}
                            />
                        </div>
                        <Paragraph
                            text="From the beginning, I wanted this site to feel approachable and modern without being overwhelming. The design choices reflect that balance."
                            size="xl"
                            align="left"
                        />
                        <NumberedList
                            items={designDecisions}
                            listIndexType="disc"
                            size="xl"
                            align="left"
                            hasTitle={false}
                        />
                        <Paragraph
                            text="In short, the design isn't just about looks — it's about readability, maintenance, and showing that I can think about user experience at the same time as technical structure."
                            size="xl"
                            align="left"
                        />
                    </div>
                    <AnimatedSection animation="fadeLeft" delay={500} className="design-decisions-image">
                        <DisplayImage
                            src={animeDesignImage}
                            alt="Design illustration showing creative process with colors, cards, and user interface elements"
                            width={400}
                            height={500}
                            className="design-hero-image"
                        />
                    </AnimatedSection>
                </div>
            </Container>
        </AnimatedSection>
    );
}