"use client"
import React from 'react';
import Title from '@/components/Title';
import Card from '@/components/Card';
import NumberedList from '@/components/NumberedList';
import Section from '@/components/Section';
import AnimatedSection from '@/components/AnimatedSection';
import SiteButton from '../SiteButton';

/**
 * ResumeSection component props interface
 */
interface ResumeSectionProps {
  /** Job or position title */
  title: string;

  /** Company at which position was held */
  companyName: string;

  /** Duration/tenure length for the position */
  tenureLength: string;

  /** Array of job description bullet points */
  jobDescription: string[];

  /** SVG component to display on the right side */
  svgComponent: React.ReactNode;

  /** Optional CSS class name for styling */
  className?: string;

  /** Optional animation delay in milliseconds */
  animationDelay?: number;

  //** Whether this section has a button/link  */
  hasLink?: boolean;

  //** Link desination */
  linkDestination?: string;

  //** name for link */
  linkName?: string;

  //** Onclick for button */
  linkOnClick?: () => void;
}

/**
 * ResumeSection component for displaying standardized resume job sections
 *
 * Creates a horizontal layout with job information on the left (2/3 width)
 * and an animated SVG on the right (1/3 width). Uses existing components
 * for consistent styling and includes scroll-triggered animations.
 *
 * @example
 * ```tsx
 * <ResumeSection
 *   title="Senior Frontend Developer"
 *   tenureLength="Jan 2023 - Present"
 *   jobDescription={[
 *     "Led development of React applications",
 *     "Implemented responsive design systems",
 *     "Mentored junior developers"
 *   ]}
 *   svgComponent={<WorkingSVG />}
 *   animationDelay={200}
 * />
 * ```
 */
export default function ResumeSection({
  title,
  companyName,
  tenureLength,
  jobDescription,
  svgComponent,
  className = '',
  animationDelay = 0,
  hasLink = false,
  linkDestination = '',
  linkName = '',
  linkOnClick
}: ResumeSectionProps) {
  return (
    <AnimatedSection animation="fadeUp" delay={animationDelay}>
      <Section
        spacing="lg"
        contained={true}
        containerSize="xl"
        className={`experience-section-outline ${className}`}
      >
        <div className="resume-section-content">
          <AnimatedSection className="resume-section-animation-card" animation="fadeRight" delay={animationDelay > 0 ? animationDelay + 100 : 0}>
            <Card
              size="xl"
              variant="resume"
              childAlignment="child-left"
              selfAlignment="self-left"
              className="resume-section-card"
            >
              <Title
                text={title}
                level={2}
                variant="card"
                align="left"
              />
              <Title
                text={companyName}
                level={3}
                variant="card"
                align="left"
              />
              <Title
                text={tenureLength}
                level={4}
                variant="card"
                align="left"
              />
              <NumberedList
                title=""
                hasTitle={false}
                items={jobDescription}
                size="lg"
                variant="card"
                align="left"
              />
              {hasLink &&
                <SiteButton
                  text={linkName}
                  variant='card'
                  destination={linkDestination}
                  size='sm'
                  onClick={linkOnClick}
                />
              }

            </Card>
          </AnimatedSection>
          <AnimatedSection className="resume-section-animation-svg" animation="fadeRight" delay={animationDelay > 0 ? animationDelay + 200 : 0}>
            <div className="resume-section-svg">
              {svgComponent}
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </AnimatedSection>
  );
}