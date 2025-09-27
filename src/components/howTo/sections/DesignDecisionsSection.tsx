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
 * @returns JSX element containing the design decisions content with split layout
 */
export default function DesignDecisionsSection() {
    const designDecisions = [
        "Soft color palette: I leaned into softer tones rather than harsh contrasts. This makes the site easier to read, creates a calmer mood, and avoids the sterile \"corporate\" look.",
        "Card-based layout: Each section is wrapped in a card, giving the content its own container. This makes information modular and scannable — visitors can easily jump between projects, jobs, or skills without being buried in text.",
        "Tabs on the Resume page: Instead of cramming everything into a single scroll, I split the content into tabs (Education, Jobs, Projects, Startups). It keeps things clean, interactive, and more aligned with how people actually explore resumes.",
        "Animations on scroll: Subtle transitions as sections appear keep the site feeling alive and polished without distracting from the content.",
        "Component reusability: I designed with React components so the same building blocks (like cards, buttons, or titles) could be reused across pages. This keeps the look consistent and makes the codebase much easier to maintain."
    ];

    return (
        <AnimatedSection animation="fadeUp" delay={300}>
            <Container
                className="light-green-container"
                size="full"
                childLayout="vertical"
                childAlignment="child-center"
            >
                <div className="design-decisions-layout">
                    <div className="design-decisions-content">
                        <Title
                            text="Design Decisions"
                            level={2}
                            align="left"
                            underlined={true}
                        />
                        <Paragraph
                            text="From the beginning, I wanted this site to feel approachable and modern without being overwhelming. The design choices reflect that balance."
                            size="lg"
                            align="left"
                        />
                        <NumberedList
                            items={designDecisions}
                            listIndexType="disc"
                            size="lg"
                            align="left"
                            hasTitle={false}
                        />
                        <Paragraph
                            text="In short, the design isn't just about looks — it's about readability, maintainability, and showing that I can think about user experience at the same time as technical structure."
                            size="lg"
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