"use client"
import React from 'react';
import Navbar from '@/components/Navbar';
import Title from '@/components/Title';
import IntroductionSection from '@/components/howTo/sections/IntroductionSection';
import DesignDecisionsSection from '@/components/howTo/sections/DesignDecisionsSection';

/**
 * Main component for the "How This Site Was Made" page
 *
 *
 * @returns JSX element containing the complete how-to page layout
 */
export default function HowThisSiteWasCreated() {
  return (
    <>
      <Navbar currentPage='How the Site was Created'/>

      <main className="how-this-site-was-made">
        <div className="how-site-made-main-title">
          <Title
            text="How and Why I Made This Site"
            level={1}
            align="center"
            shadow={true}
            underlined={true}
          />
          </div>
        <IntroductionSection />
        <DesignDecisionsSection />

      </main>
    </>
  );
}