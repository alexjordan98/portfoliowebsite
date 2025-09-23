"use client"
import React, { useState } from 'react';
import FullTimeJobsTab from './tabs/FullTimeJobsTab';
import StartupsTab from './tabs/StartupsTab';
import PersonalProjectsTab from './tabs/PersonalProjectsTab';
import EducationTab from './tabs/EducationTab';

/**
 * Tab configuration interface for resume sections
 */
interface TabConfig {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab button */
  label: string;
  /** Content component to render when tab is active */
  content: React.ReactNode;
}

/**
 * ResumeTabs component props interface
 */
interface ResumeTabProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional default active tab index */
  defaultActiveTab?: number;
}

/**
 * ResumeTabs component that provides tabbed navigation for resume sections
 *
 * Manages tab state and renders appropriate content based on active tab.
 * Includes smooth transitions between tabs and keyboard accessibility.
 * Supports four main sections: Full-time jobs, Startups, Personal projects, and Education.
 *
 * @example
 * ```tsx
 * <ResumeTabs defaultActiveTab={0} />
 * ```
 */
export default function ResumeTabs({
  className = '',
  defaultActiveTab = 0
}: ResumeTabProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const tabs: TabConfig[] = [
    {
      id: 'full-time',
      label: 'Full Time Jobs',
      content: <FullTimeJobsTab />
    },
    {
      id: 'startups',
      label: 'Startups',
      content: <StartupsTab />
    },
    {
      id: 'projects',
      label: 'Personal Projects',
      content: <PersonalProjectsTab />
    },
    {
      id: 'education',
      label: 'Education',
      content: <EducationTab />
    }
  ];

  /**
   * Handles tab button click events
   * @param tabIndex - Index of the tab to activate
   */
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  /**
   * Handles keyboard navigation for tab buttons
   * @param event - Keyboard event
   * @param tabIndex - Index of the current tab
   */
  const handleKeyDown = (event: React.KeyboardEvent, tabIndex: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setActiveTab(tabIndex > 0 ? tabIndex - 1 : tabs.length - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        setActiveTab(tabIndex < tabs.length - 1 ? tabIndex + 1 : 0);
        break;
      case 'Home':
        event.preventDefault();
        setActiveTab(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveTab(tabs.length - 1);
        break;
    }
  };

  return (
    <div className={`resume-tab-container ${className}`}>
      <nav className="resume-tab-nav" role="tablist" aria-label="Resume sections">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            className={`resume-tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="resume-tab-content">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className={`resume-tab-panel ${activeTab === index ? 'active' : ''}`}
            hidden={activeTab !== index}
          >
            {activeTab === index && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}