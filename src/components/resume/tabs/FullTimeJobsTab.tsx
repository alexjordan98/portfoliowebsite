"use client"
import React from 'react';
import ResumeSection from '../ResumeSection';
import WorkingSVG from '../svgs/WorkingSvg';
import SiteButton from '@/components/SiteButton';

/**
 * FullTimeJobsTab component props interface
 */
interface FullTimeJobsTabProps {
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * FullTimeJobsTab component that displays full-time employment history
 *
 * Contains ResumeSection components for each full-time position with
 * job titles, tenure lengths, and detailed job descriptions.
 *
 * @example
 * ```tsx
 * <FullTimeJobsTab />
 * ```
 */
export default function FullTimeJobsTab({ className = '' }: FullTimeJobsTabProps) {
  return (
    <div className={`full-time-jobs-tab ${className}`}>
      <SiteButton
        className="download-resume-button"
        variant="default"
        size="xl"
        text="Download Resume PDF"
        onClick={() => window.open('/2025-George-Jordan-Resume.pdf', '_blank')}
      />
      <ResumeSection
        title="Head of Frontend Development"
        companyName="Anteros Bio, REMOTE"
        tenureLength="April 2025 – Present"
        jobDescription={[
          "Architected a new client-facing application using TypeScript and React to support Anterosbio’s genomics platform",
          "Established CI/CD pipelines and environment workflows leveraging AWS Amplify to automate builds, testing, and deployments",
          "Structured DynamoDB schema and data access patterns to support scalable NoSQL data interactions within the application",
          "Directed frontend development practices, setting code standards, component patterns, and Git branching strategies for the team",
          "Collaborated with cross-functional scientists and product stakeholders to translate complex requirements into intuitive user interfaces",
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={0}
      />

      <ResumeSection
        title="Full Stack Web Developer"
        companyName="CABEM Technologies, REMOTE"
        tenureLength="May 2021 – August 2024"
        jobDescription={[
          "Developed new web pages to support different types of loan servicing for Forbright bank. The front-end was built in React-Next JS, and I connected it to PHP back-end services using AXIOS calls",
          "Engineered new back-end services in PHP to connect to the front-end pages I created. I made sure these new services followed the latest OSWAP cyber security standards. I also updated and fixed bugs in older services",
          "Designed and created new SQL tables using MariaDB for the UIs and services I made and connected them to the services. I also upgraded / amended existing tables",
          "Modernized old UI pages that were written in bare bones JS/PHP by changing them to React to remove any vulnerabilities like JS void",
          "Met with our clients at Forbright bank to go over designs for new web pages",
          "Managed my test site and updates to the production sites on the EC2 AWS console",
          "Trained new developers on the company procedures / code base"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={100}
      />

      <ResumeSection
        title="I.T. Technician"
        companyName="Fenway Health, Boston MA"
        tenureLength="September 2019 - May 2021"
        jobDescription={[
          "Assisted fellow employees in the office with general technical issues (I had to do this over the internet during the pandemic, the need for help increased significantly)",
          "Imaged and deployed Windows computers/tablets around the company office",
          "Used active directory to add new computers and users to the network",
          "Configured and deployed network switches and firewalls to establish secure and efficient connectivity across the office",
          "Setup computers for Fenway’s drive through COVID testing tent"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={200}
      />

      <ResumeSection
        title="College Coop (Programmer)"
        companyName="Dell Technologies, Franklin, MA"
        tenureLength="July 2018 – December 2018"
        jobDescription={[
          "Automated excel report creation using Java to save team members 3-5 hours/week",
          "Identified opportunities for automation that could best increase the team’s efficiency",
          "Met with the team’s stakeholders to design a website structure for a data repositorys"
        ]}
        svgComponent={<WorkingSVG />}
        animationDelay={300}
      />
    </div>
  );
}