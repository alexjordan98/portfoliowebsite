"use client"
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
import lookingAtComputer from '@/images/looking-at-computer.png';

import TestimonialCard from '@/components/TestimonialCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Card from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';

export default function HomePage() {
  return (
    <main className="home-wrapper">
      <Navbar currentPage="Home" />
      <AnimatedSection animation="fadeUp" delay={100}>
        <Section
          spacing="lg"
          containerSize="xl"
          childAlignment="child-center"
          contained={true}
        >
          <Title
            text="A Brief Introduction"
            level={1}
            shadow={true}
            align='center'
            underlined={true}
          />

          <Container
            size="full"
            childLayout="horizontal"
            childAlignment="child-center"
            className="intro-grid"
          >
            <Card
              size="xl"
              variant="default"
              className="intro-content-card"
              childAlignment='child-center'
            >
              <Title
                text="George Jordan"
                level={1}
                shadow={true}
              />
              <Title
                text="Software Developer"
                level={3}
                variant="card"
                shadow={true}
              />
              <Paragraph
                text="Hi. I my name is George Jordan. I am an American Software developer based out of Washington DC, who focuses on full stack website development."
                size="xl"
                variant="card"
              />
              <Paragraph
                text="I made this website to showcase my skills, but also a how-to for anyone who wants to learn some web development."
                size="xl"
                variant="card"
              />
              <SiteButton
                text="Go to Detailed Resume"
                size="md"
                className="intro-resume-button"
                variant="card"
              />
            </Card>

            <div className="intro-image-section">
              <DisplayImage
                src={pinkAnime}
                alt="Decorative flowers illustration"
                width={600}
                height={900}
                className="intro-hero-image"
              />
            </div>
          </Container>

          {/* <SiteButton
          text="Click to see the Skill Bubbles"
          variant="default"
          size="lg"
          className="intro-skills-button"
        /> */}
        </Section>
      </AnimatedSection>

      <AnimatedSection animation="fadeUp" delay={200}>
        <Section spacing="lg" contained={true} containerSize='xl'>
          <Container size="full">
            <div className="stack-section-content">
              <div className="stack-header">
                <Title
                  text="My Main Stack"
                  level={1}
                  variant="section"
                  align="center"
                  shadow={true}
                />
                <Title
                  text="TLDR"
                  level={3}
                  variant="default"
                  align="center"
                  shadow={true}
                />
              </div>
              <div className="stack-layout">
                <AnimatedSection
                  animation="fadeRight"
                  delay={400}
                  className="stack-image-container"
                >
                  <DisplayImage
                    src={lookingAtComputer}
                    alt="Developer working at computer"
                    width={550}
                    height={550}
                    className="stack-hero-image"
                  />
                </AnimatedSection>
                <div className="stack-cards-container">
                  <AnimatedSection animation="fadeUp" delay={600}>
                    <div className='stack-row'>
                      <Card size="lg" variant="default" className="stack-card">
                        <div className="card-body">
                          <Title
                            text="Backend"
                            level={4}
                            variant="card"
                            fontSize={24}
                            color="#000000"
                            align="center"
                          />
                          <Paragraph
                            text="I develop scalable and secure backend systems that smoothly interact with frontend code and external services. Tech I use includes PHP, Java, Python, Go, .NET, and AWS EC2."
                            fontSize={18}
                          />
                        </div>
                      </Card>
                      <Card size="lg" variant="default" className="stack-card">
                        <div className="card-body">
                          <Title
                            text="Frontend"
                            level={4}
                            variant="card"
                            fontSize={24}
                            color="#000000"
                            align="center"
                          />
                          <Paragraph
                            text="I build modern responsive interfaces with excellent user experience using React, Next.js, and TypeScript. I work with modern styling tools like Tailwind, SCSS, LQIP, and Svelte."
                            fontSize={18}
                          />
                        </div>
                      </Card>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection animation="fadeUp" delay={700}>
                    <div className='stack-row'>
                      <Card size="lg" variant="default" className="stack-card">
                        <div className="card-body">
                          <Title
                            text="API Calls"
                            level={4}
                            variant="card"
                            fontSize={24}
                            color="#000000"
                            align="left"
                          />
                          <Paragraph
                            text="I create and consume APIs to connect frontend and backend, using REST principles and modern auth layers. I work with REST APIs, Firewalls, and OAuth 2.0, JWT."
                            fontSize={18}
                          />
                        </div>
                      </Card>
                      <Card size="lg" variant="default" className="stack-card">
                        <div className="card-body">
                          <Title
                            text="Database Design"
                            level={4}
                            variant="card"
                            fontSize={24}
                            color="#000000"
                            align="left"
                          />
                          <Paragraph
                            text="I design efficient and reliable schemas tailored to complex models and relational legacy systems. I work with PostgreSQL, MySQL, Firestore, and SAP."
                            fontSize={18}
                          />
                        </div>
                      </Card>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </AnimatedSection>
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
              items={[
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
              items={[
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
              items={[
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
