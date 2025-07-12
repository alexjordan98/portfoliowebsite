import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import TLDRCircle from '@/components/TLDRCircle';
import SiteButton from '@/components/SiteButton';

export default function HomePage() {
  return (
    <main className="home-wrapper">
      <section className="intro-section">
        <div className="intro-content">
          <Title
            text="George Jordan"
            fontSize={64}
            color="#000000"
          />
          <Title
            text="Software Developer"
            fontSize={32}
            color="#000000"
          />
          <Paragraph
            text="Hi. I am George Jordan, an American Software developer based out of Washington DC, who focuses on full stack website development."
            fontSize={24}
            color="#111111"
          />
          <Paragraph
            text="I made this website to showcase my skills, but also a how-to for anyone who wants to learn some web development."
            fontSize={24}
            color="#111111"
          />
          <SiteButton 
            text="Go to Detailed Resume"
            type="primary-button"
          />
        </div>
        <div className="image-placeholder" />
      </section>

      {/* Tech Stack Section */}
      <section className="stack-section">
        <Title 
            text="My Main Stack"
            fontSize={48}
            color="#000000"
        />
        <Title 
            text="TLDR"
            fontSize={32}
            color="#000000"
        />
        <TLDRCircle/>
        <SiteButton 
          text="Click to see the Skill Bubbles"
          type="secondary-button"
        />
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <Title 
            text="Why Hire an Experienced Dev like Me?"
            fontSize={48}
            color="#000000"
        />
        <div className="experience-content">
          <div className="experienced-dev-images">
            <div className="image-placeholder"/>
            <div className="experience-arrow">→</div>
            <div className="image-placeholder"/>
          </div>
          <div className="experienced-dev-lists">
            <ul className="left-list">
              <li>Debugging Complex Issues</li>
              <li>Designing Scalable Architecture</li>
              <li>Understanding Older Code</li>
              <li>Estimating Task Duration</li>
              <li>Avoiding Overengineering</li>
            </ul>

            <ul className="right-list">
              <li>Use breakpoints, logging, and isolate code paths</li>
              <li>Use reusable components and well-known design patterns</li>
              <li>Understand original intent before rewriting</li>
              <li>Break tasks into subparts and estimate time conservatively</li>
              <li>Only abstract when truly needed</li>
            </ul>
          </div>  
        </div>
      </section>

      <section className="recommendations-section">
        <h2 className="section-title">Recommendations</h2>
        <div className="recommendation-cards">
          <div className="card">“A Great Guy, my best friend, would recommend 10/10”<br />– Mom</div>
          <div className="card">“One thing I can say about Alex is he doesn’t quit when he starts something”<br />– Robin Jain, Startup Co-founder</div>
          <div className="card">“A genuinely glowing review”<br />– Name, Description</div>
        </div>
      </section>
    </main>
  );
}
