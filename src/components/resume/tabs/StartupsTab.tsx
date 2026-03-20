"use client"
import React from 'react';
import ResumeSection from '../ResumeSection';
import WorkingSVG from '../svgs/WorkingSvg';

/**
 * StartupsTab component props interface
 */
interface StartupsTabProps {
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * StartupsTab component that displays startup enterepenureship history
 *
 * @example
 * ```tsx
 * <StartupsTab />
 * ```
 */
export default function StartupsTab({ className = '' }: StartupsTabProps) {
  return (
    <div className={`full-time-jobs-tab ${className}`}>
      <ResumeSection
        title="Partner (website development and general management)"
        companyName='Azhar Apparel, REMOTE'
        tenureLength="March 2020 – April 2023"
        jobDescription={[
          "Azhar Apparel is the name of an ecommerce clothing startup that I started with a fellow student using Northeastern’s business incubator called IDEA",
          "Designed the company’s Shopify webpage with one of my partners utilizing agile development methodology (HTML, liquid, CSS)",
          "Implemented SEO and keyword optimization within Shopify and across social media platforms to improve visibility and organic reach",
          "Set up and maintained the brand’s Google Workspace accounts, Google Analytics, and Google Ads campaigns to track engagement and drive sales",
          "Created a Facebook and Instagram (azhar_apparel_store) Store and helped develop a marketing strategy",
          "Sourced the clothes from Kenya and dealt with supply chain"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={0}
      />

      <ResumeSection
        title="Head Developer"
        companyName="Yogh, REMOTE"
        tenureLength="December 2022 - June 2023"
        jobDescription={[
          "Yogh is a small startup I founded with some friends that aimed to create a social network for university students who wanted to join clubs at their schools / connect with people at similar clubs in other schools",
          "Collaborated with my cofounders to create wireframes for the app and create tickets for each page",
          "Created an IOS app using react-native to house the social networking capabilities",
          "Hooked the app up to Firebase/Firestore so they could handle the backend",
          "Demoed prototype to some users at certain universities and to potential investors",
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={100}
      />
    </div>
  );
}