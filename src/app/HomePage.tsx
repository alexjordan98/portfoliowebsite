"use client"
import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import SiteButton from '@/components/SiteButton';
import DisplayImage from '@/components/DisplayImage';
import NumberedList from '@/components/NumberedList';

import pinkAnime from '@/images/pink-anime-flowers.png';
import enemiesBefore from '@/images/enemies-before.png';
import enemiesDefeated from '@/images/enemies-defeated.png'
import lookingAtComputer from '@/images/looking-at-computer.png';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Card from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';

export default function HomePage() {

  const obstaclesList = [
    "Debugging complex issues",
    "Designing scalable architecture",
    "Understanding Older Code",
    "Estimating Task Duration",
    "Avoiding Overengineering"
  ];

  const experienceCards = [
    {
      title: "Debugging",
      content: "Use breakpoints, logging, and isolate code blocks to narrow down the problem area quickly. also always test your code to avoid debugging!!"
    },
    {
      title: "Designing Scalable Architecture",
      content: "Favor modular, loosely coupled components and apply well-known design patterns to plan for growth."
    },
    {
      title: "Understanding Older Code",
      content: "Start by understanding the inputs and outputs, then trace smaller functions before tackling the big picture."
    },
    {
      title: "Estimating Task Duration",
      content: "Break tasks into smaller parts and reference similar past work to set realistic time frames. It’s always better to tell a client that a task will take more time than less time"
    },
    {
      title: "Avoiding Overengineering",
      content: "Focus on meeting the current requirements cleanly, and only abstract when duplication or complexity demands it."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      testimonial: "Working with this developer was an absolute pleasure. The attention to detail and problem-solving skills were exceptional. Our project was delivered on time and exceeded expectations."
    },
    {
      name: "Michael Chen",
      testimonial: "Incredible technical expertise combined with excellent communication. The code quality was outstanding and the final product was exactly what we envisioned. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      testimonial: "Professional, reliable, and innovative. This developer brought creative solutions to complex problems and was always available for questions. A true pleasure to work with."
    }
  ];

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
                level={2}
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
                  align="center"
                  shadow={true}
                  underlined={true}
                />
                <Title
                  text="TLDR"
                  level={3}
                  align="center"
                  shadow={true}
                  underlined={true}
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
                      <Card
                        size="lg"
                        variant="default"
                        className="stack-card"
                      >
                        <div className="card-body">
                          <Title
                            text="Frontend"
                            level={2}
                            variant="card"
                          />
                          <Paragraph
                            text="Frontend I build responsive, secure, and modern web interfaces using
                                  cutting-edge frameworks like React-Next.js and React Native, optimizing
                                  for performance, accessibility, and user experience across devices.
                                  Languages I use include React, Next.js, React Native, Tailwind, SCSS,
                                   HTML, SCSS, Liquid, and Swift."
                            variant='card'
                            size="xl"
                          />
                        </div>
                      </Card>
                      <Card
                        size="lg"
                        variant="default"
                        className="stack-card"
                      >
                        <div className="card-body">
                          <Title
                            text="Backend"
                            level={2}
                            variant="card"
                          />
                          <Paragraph
                            text="I develop scalable and secure backend services that comply with modern
                                  cybersecurity standards, with a focus on maintainability and integration
                                  with complex systems. Tools I use include Java, PHP, Python, Go, .NET,
                                   and containerized services on AWS EC2."
                            variant='card'
                            size="xl"
                          />
                        </div>
                      </Card>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection animation="fadeUp" delay={700}>
                    <div className='stack-row'>
                      <Card
                        size="lg"
                        variant="default"
                        className="stack-card"
                      >
                        <div className="card-body">
                          <Title
                            text="API Calls"
                            level={2}
                            variant="card"
                          />
                          <Paragraph
                            text="I create APIs to connect frontends to backendends seamlessly, using the latest
                                  practices for data handling, security, and modular service design. I work with
                                  Axios, REST APIs, Firebase, Node.js, and authentication protocols like OAuth
                                   2.0, JWT, and API keys"
                            variant='card'
                            size="xl"
                          />
                        </div>
                      </Card>
                      <Card
                        size="lg"
                        variant="default"
                        className="stack-card"
                      >
                        <div className="card-body">
                          <Title
                            text="Database Design"
                            level={2}
                            variant="card"
                          />
                          <Paragraph
                            text="I design efficient and reliable database schemas tailored to application needs
                                  and maintain legacy structures with modern improvements. I work with MariaDB, SQL,
                                  NoSQL (Firestore), SAP, and manage deployment via AWS EC2 and GitHub."
                            variant='card'
                            size="xl"
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
      <AnimatedSection animation="fadeUp" delay={300}>
        <div className='stack-header'>
          <Title
            text='Why Hire an Experienced Deveveloper Like Me ?'
            level={1}
            align='center'
            underlined={true}
            shadow={true}
          />
        </div>
      </AnimatedSection>
      <AnimatedSection animation="fadeUp" delay={400}>
        <Section
          spacing="lg"
          contained={true}
          containerSize="lg"
          className="experience-section-outline"
        >
          <Container
            size="full"
            childLayout="horizontal"
            childAlignment="child-center"
          >
            <AnimatedSection animation="fadeRight" delay={500}>
              <Card
                size="xl"
                variant="default"
                childAlignment='none'
              >
                <NumberedList
                  title="Whilst developing software, there are many obstacles one will face such as"
                  titleProps={{
                    level: 2,
                    variant: "card",
                    align: "center"
                  }}
                  items={obstaclesList}
                  size="xl"
                  align="left"
                  variant='card'
                  listIndexType="decimal"
                />
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeRight" delay={600}>
              <div className="experience-image-section">
                <DisplayImage
                  src={enemiesBefore}
                  alt="Challenges in software development"
                  width={500}
                  height={700}
                  className="experience-image"
                />
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      </AnimatedSection>
      <AnimatedSection animation="fadeUp" delay={300}>
        <Section
          spacing="lg"
          contained={true}
          containerSize="xl"
          className="experience-section-outline"
        >
          <Container
            size="full"
            childLayout="horizontal"
            childAlignment="child-center"
          >
            <AnimatedSection animation="fadeRight" delay={400}>
              <div className="experience-image-section">
                <DisplayImage
                  src={enemiesDefeated}
                  alt="Overcoming development challenges"
                  width={500}
                  height={700}
                  className="experience-image"
                />
              </div>
            </AnimatedSection>
            <div className="experience-content-section">
              <Title
                text="The best way to overcome these challenges is through hands-on experience.
                      I've encountered them time and again, and over time, I've learned how to
                       navigate them effectively. Here are a few insights I've picked up
                        that are worth keeping in mind."
                level={2}
                align="center"
              />
              <div className="experience-cards-grid">
                <div className="experience-cards-row">
                  {experienceCards.slice(0, 3).map((card, index) => (
                    <AnimatedSection
                      animation="fadeRight"
                      delay={400 + 1 * index}
                      className="experience-section-card-animation"
                    >
                      <Card
                        key={index}
                        size="lg"
                        variant="default"
                        className="experience-section-card"
                      >
                        <Title
                          text={card.title}
                          level={3}
                          variant="card"
                          align="left"
                        />
                        <Paragraph
                          text={card.content}
                          size="xl"
                          variant="card"
                          align="left"
                        />
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
                <div className="experience-cards-row">
                  {experienceCards.slice(3, 5).map((card, index) => (
                    <AnimatedSection
                      animation="fadeRight"
                      delay={600 + ((index - 2) * 100)}
                      className="experience-section-card-animation"
                    >
                      <Card
                        key={index + 3}
                        size="lg"
                        variant="default"
                        className="experience-section-card"
                      >
                        <Title
                          text={card.title}
                          level={3}
                          variant="card"
                          align="left"
                        />
                        <Paragraph
                          text={card.content}
                          size="xl"
                          variant="card"
                          align="left"
                        />
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </AnimatedSection>
      <Section
        spacing="lg"
        contained={true}
        containerSize="xl"
        childAlignment="child-center"
      >
        <Title
          text="Testimonials"
          level={1}
          align="center"
          className="testimonial-section-title"
          shadow={true}
          underlined={true}
        />
        <Container
          size="full"
          childLayout="horizontal"
          childAlignment="child-center"
          className="testimonial-cards-container"
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              size="sm"
              variant="default"
              className="testimonial-card"
            >
              <Paragraph
                text={`"${testimonial.testimonial}"`}
                size="base"
                variant="card"
                align="center"
                className="testimonial-quote"
              />
              <Title
                text={testimonial.name}
                level={4}
                variant="card"
                align="center"
                className="testimonial-author"
              />
            </Card>
          ))}
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
