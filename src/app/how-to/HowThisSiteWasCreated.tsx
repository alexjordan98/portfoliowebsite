"use client"
import React from 'react';
import Navbar from '@/components/Navbar';
import Title from '@/components/Title';
import IntroductionSection from '@/components/howTo/sections/IntroductionSection';
import DesignDecisionsSection from '@/components/howTo/sections/DesignDecisionsSection';
import TechnologiesUsedSection from '@/components/howTo/sections/TechnologiesUsedSection';
import Footer from '@/components/Footer';
import FileStructureSection from '@/components/howTo/sections/FileStructureSection';
import HowItConnectsSection from '@/components/howTo/sections/HowItConnectsSection';
import ConclusionSection from '@/components/howTo/sections/ConclusionSection';

/**
 * Main component for the "How This Site Was Made" page
 *
 *
 * @returns TSX element containing the complete how-to page layout
 */
export default function HowThisSiteWasCreated() {
  return (
    <>
      <Navbar currentPage='How the Site was Created' />

      <main className="how-this-site-was-made">

        <IntroductionSection />
        <DesignDecisionsSection />
        <TechnologiesUsedSection />
        <FileStructureSection />
        <HowItConnectsSection />
        <ConclusionSection />
        <Footer />

      </main>
    </>
  );
}