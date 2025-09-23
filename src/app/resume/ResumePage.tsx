"use client"
import React from 'react';
import Title from '@/components/Title';
import ResumeTabs from '@/components/resume/ResumeTabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * ResumePage component that displays the main resume page with tabs
 *
 * Contains the main resume title and tab navigation for different sections
 * including full-time jobs, startups, personal projects, and education.
 */
export default function ResumePage() {
  return (
    <>
    <Navbar currentPage="Resume"/>
    <div className="resume-page">
      <ResumeTabs />
    </div>
    <Footer />
    </>
  );
}