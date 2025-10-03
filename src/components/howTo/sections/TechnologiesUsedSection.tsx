import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import AnimatedSection from '@/components/AnimatedSection';
import CardCarousel from '@/components/CardCarousel';
import Section from '@/components/Section';

/**
 * Technologies Used section component for the "How This Site Was Made" page
 *
 * @returns JSX element containing the technologies section
 */
export default function TechnologiesUsedSection() {
  const technologyItems = [
    {
      title: "Frontend: React + Next.js (with TypeScript)",
      text: "For the user-facing side, I went with React because it's fast, component-based, and the standard for modern web development. Next.js adds routing, server-side rendering, and a cleaner structure for pages. Using TypeScript keeps everything strongly typed, which helps catch bugs early and makes the codebase more reliable."
    },
    {
      title: "Styling: SCSS",
      text: "I chose SCSS because it gives me more control over layout, variables, and modular styles. It keeps the design consistent while letting me fine-tune details like spacing and responsiveness."
    },
    {
      title: "Backend: Java + Spring Boot (with MVC pattern)",
      text: "On the backend, I wanted something robust and structured. Spring Boot allows you to use the MVC (Model-View-Controller) pattern, which I adopted for this project. Controllers handle incoming requests, Services contain the business logic, and Repositories talk to the database. This separation of concerns keeps the backend organized and scalable."
    },
    {
      title: "Database: PostgreSQL on AWS RDS",
      text: "For data storage, I chose PostgreSQL because it's a reliable relational database with strong SQL support. Hosting it on AWS RDS means I don't have to worry about uptime, scaling, or backups — AWS manages that for me."
    },
    {
      title: "Deployment: AWS Amplify (frontend) + Elastic Beanstalk (backend JAR)",
      text: "I wanted to stay inside the AWS ecosystem because it's one of the most widely used cloud platforms — many companies host their sites on it. Amplify makes deploying the frontend straightforward with built-in CI/CD. For the backend, I package the Spring Boot project as a JAR and deploy it to Elastic Beanstalk, which automatically manages scaling and load balancing."
    }
  ];

  return (
    <AnimatedSection animation="fadeUp" delay={400}>
      <Section
        spacing="lg"
        contained={true}
        containerSize="lg"
        className="technologies-used-section-outline"
      >
        <div className="technologies-section-content">
          <div className="title-how-to">
            <Title
              text="Technologies Used"
              level={2}
              align="center"
              underlined={true}
            />
          </div>
          <Paragraph
            text="I didn't just pick these technologies at random. Each one was chosen because it solved a specific problem and, together, they create a full-stack system that's modern, scalable, and maintainable."
            size="xl"
            align="center"
          />

          <div className="technologies-carousel-container">
            <CardCarousel
              cardVariant="default"
              size="lg"
              items={technologyItems}
              cardClassName='technologies-used-card'
            />
          </div>

          <Paragraph
            text="All of these tools fit together naturally: the React frontend makes API calls, the Spring Boot backend serves those requests, and the PostgreSQL database persists the data. AWS ties it all together in one cloud environment. The stack not only works well technically, but also demonstrates that I can work with the same technologies professional teams use every day."
            size="xl"
            align="center"
          />
        </div>
      </Section>
    </AnimatedSection>
  );
}