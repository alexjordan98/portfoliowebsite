"use client"
import React from 'react';
import ResumeSection from '../ResumeSection';
import WorkingSVG from '../svgs/WorkingSvg';
import SiteButton from '@/components/SiteButton';

/**
 * PersonalProjectsTab component props interface
 */
interface PersonalProjectsTabProps {
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * PersonalProjectsTab component that displays notable personal projects
 *
 * @example
 * ```tsx
 * <PersonalProjectsTab />
 * ```
 */
export default function PersonalProjectsTab({ className = '' }: PersonalProjectsTabProps) {
  return (
    <div className={`full-time-jobs-tab ${className}`}>
      <ResumeSection
        title="Portfolio Website"
        tenureLength=""
        companyName=''
        jobDescription={[
          "I created this site using typescript and Java to showcase my skills, click below to see a more detailed breakdown of how it was done",
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={0}
        hasLink={true}
        linkDestination="/how-to"
        linkName="How This Site was Created"
      />
      <ResumeSection
        title="Roth Reinforcement Learning Model"
        companyName="Ethics and Evolutionary Games (EEG) Class At Northeastern"
        tenureLength="September 2020 - Devember 2020"
        jobDescription={[
          'As described by the university, EEG was a class that "surveys the basic ideas and principles from evolutionary game theory and how they can be applied to philosophical questions about ethical and social norms". It was very interesting',
          "Roth Reinfocement is essentially a type of Algorithm used commonly in game theory to model how people learn from experience. Basically if a strategy works, someone will be more likely to use it again",
          "For my final project in this class, I built a Python simulation tool with a Tkinter UI to model Roth reinforcement learning in repeated games",
          "It implements dynamic payoff matrices and player weights to study how strategies evolve under reinforcement rules",
          "I also designed an import/export system via Excel for flexible input of parameters and retrieval of simulation results.",
          "In the end I presented findings as part of an Ethics & Evolutionary Games seminar, bridging technical modeling with philosophical analysis"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={100}
        hasLink={true}
        linkDestination={process.env.NEXT_PUBLIC_ROTH_GITHUB}
        linkName="Model's Github Repository"
      />
      <ResumeSection
        title="Global Climate Justice Paper"
        tenureLength=""
        companyName=''
        jobDescription={[
          "In my last semester of University, I wrote a capstone paper on Cilimate Justice",
          "After reading the most prominent philosophers in the realm of Climate Justice, I had to create a paper arguing for my own points whilst showing a deep understanding of the current literature",
          "I have included it here to show that I am profficient in the humanities as well as software development. I have a keen interest in politics and philisophy"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={200}
        hasLink={true}
        linkDestination=""
        linkName="View Paper pdf"
        linkOnClick={() => window.open('/Global-Justice-Climate-Change-Paper.pdf', '_blank', 'noopener, noreferrer')}
      />
    </div>
  );
}