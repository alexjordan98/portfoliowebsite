import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import TLDRCircle from '@/components/TLDRCircle';
import SiteButton from '@/components/SiteButton';
import DisplayImage from '@/components/DisplayImage';
import NumberedList from '@/components/NumberedList';

import pinkAnime from '@/images/pink-anime-flowers.png';
import enemiesBefore from '@/images/enemies-before.png';
import enemiesDefeated from '@/images/enemies-defeated.png'
import arrow from '@/images/arrow.png'
import TestimonialCard from '@/components/TestimonialCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="home-wrapper">
      <Navbar currentPage="Home" />
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
          />
          <Paragraph
            text="I made this website to showcase my skills, but also a how-to for anyone who wants to learn some web development."
            fontSize={24}
          />
          <SiteButton 
            text="Go to Detailed Resume"
            type="primary-button"
          />
        </div>
        <DisplayImage
          src={pinkAnime}
          alt="flowers"
          width={600}
          height={900}
        />
      </section>

      {/* Tech Stack Section */}
      <section className="stack-section">
        <Title 
            text="My Main Stack"
            fontSize={48}
        />
        <Title 
            text="TLDR"
            fontSize={32}
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
        />
        <div className="experience-content">
            <div className="left-experience-home-content">
              <div className="experience-home-image">
                <DisplayImage
                  src={enemiesBefore}
                  alt="before"
                  width={1500}
                  height={15000}
                />
              </div>
              <NumberedList
                title="Whilst developing software, there are many obstacles one will face such as:"
                items = {[
                  "Debugging complex issues",
                  "Designing scale-able architecture",
                  "Understanding older code",
                  "Estimating task duration",
                  "Avoiding over-engineering"
                ]}
              />
            </div>
            <div className="middle-experience-home-content">
              <div className="experience-home-image">
                <DisplayImage
                  src={arrow}
                  alt="arrow"
                  width={600}
                  height={600}
                />
              </div>
              <NumberedList
                title="The best way to overcome these challenges is through hands-on experience.
                   I’ve encountered them time and again, and over time, I’ve learned how to navigate 
                    them effectively. Here are a few insights I’ve picked up that are worth keeping in mind."
                items = {[
                  {
                    text: "Debugging",
                    subItems: ["Use breakpoints, logging, and isolate code blocks to narrow down the" 
                      + " problem area quickly. also always test your code to avoid debugging!!"
                    ]
                  },
                  {
                    text: "Designing Scalable Architecture",
                    subItems: ["Favor modular, loosely coupled components and apply well-known" 
                      + " design patterns to plan for growth."
                    ]
                  }
                ]}
              />
            </div>
            <div className="right-experience-home-content">
              <div className="experience-home-image">
                <DisplayImage
                  src={enemiesDefeated}
                  alt="defeated"
                  width={400}
                  height={600}
                />
              </div>
              <NumberedList
                title=""
                startNumber={3}
                items = {[
                  {
                    text: "Understanding Older Code",
                    subItems: ["Start by understanding the inputs and outputs, then trace smaller"
                       + " functions before tackling the big picture."
                    ]
                  },
                  {
                    text: "Estimating Task Duration",
                    subItems: ["Break tasks into smaller parts and reference similar past work to" 
                      + " set realistic time frames. It’s always better to tell a client that a task will take more time than less time"
                    ]
                  },
                  {
                    text: "Avoiding Over-engineering",
                    subItems: ["Focus on meeting the current requirements cleanly, and only abstract when duplication" 
                      + " or complexity demands it."
                    ]
                  }
                ]}
              />
            </div>
        </div>
      </section>
      <section className="recommendations-section">
        <Title 
            text="Recommendations"
            fontSize={40}
        />
        <div className="recommendation-cards">
          <TestimonialCard
            quote="A Great Guy, my best friend, would recommend 10/10"
            name="Mom"
            title=""
          />
          <TestimonialCard
            quote="A Great Guy, my best friend, would recommend 10/10"
            name="Robin Jain, Startup Co-founder"
            title=""
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
