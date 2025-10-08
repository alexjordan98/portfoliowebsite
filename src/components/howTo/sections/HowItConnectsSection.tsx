import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Card from '@/components/Card';
import Container from '@/components/Container';
import AnimatedSection from '@/components/AnimatedSection';
import RestaurantFlowSVG from '@/components/howTo/svgs/RestaurantFlowSVG';
import Pantry from '../svgs/PantrySVG';
import Restaurant from '../svgs/RestaurantSVG';
import ArrowSVG from '../svgs/ArrowSVG';

/**
 * How It All Connects section component for the "How This Site Was Made" page
 *
 * @returns TSX element containing the how it connects section
 */
export default function HowItConnectsSection() {
  const practicalSteps = [
    {
      title: "1. Frontend Request",
      text: "When you click on something in the site — for example, the Resume tabs — the React + Next.js frontend makes an API call."
    },
    {
      title: "2. Controller",
      text: "That request goes to the Spring Boot backend, where a Controller receives it."
    },
    {
      title: "3. Service",
      text: "The Controller passes the work to a Service, which contains the business logic."
    },
    {
      title: "4. Repository/Database",
      text: "The Service talks to a Repository, which queries the PostgreSQL database on AWS RDS to fetch or save data."
    },
    {
      title: "5. Response",
      text: "The data flows back through the Service and Controller to the frontend, where it's displayed inside a styled component."
    }
  ];

  const getArrowAngle = (index: number) => {

    switch (index) {
      case 0:
        return 45;
      case 1:
        return 135;
      case 2:
        return 180;
      case 3:
         return 225;
      case 4:
         return 315;
    }
  }



  return (
    <Container
      size="full"
      childLayout="vertical"
      childAlignment="child-center"
      className="light-green-container"
    >
      <div className="title-how-to">
        <Title
          text="How It All Connects"
          level={2}
          align="center"
          underlined={true}
          shadow={true}
        />
      </div>
      <AnimatedSection animation="fadeUp" delay={600}>
        <div className="long-paragraphs">
          <Paragraph
            text="A good way to think about this site is like a **restaurant**. The **frontend** is the **menu** —
              it's what you see, click on, and interact with. The **backend** is the **kitchen** — it takes your
              requests and does the real work. The **database** is the **pantry** — where the raw ingredients (data)
              are stored. And **AWS** is the **building** itself — the infrastructure that makes sure the lights stay on and the doors stay open."
            size="xl"
            align="center"
          />
        </div>
        <div style={{ marginLeft: "-30px" }}>
          <RestaurantFlowSVG />
        </div>
      </AnimatedSection>
      <AnimatedSection animation="fadeUp" delay={900}>
        <section className="how-connects-practice">

          <div className="title-how-to">
            <Title
              text="How It Works in Practice"
              level={3}
              align="center"
              underlined={true}
            />
          </div>

          <div className="circular-flow-diagram">
            {practicalSteps.map((step, index) => (
              <div
                key={index+1}
                className={`flow-card-wrapper flow-position-${index + 1}`}
              >
                <Card
                  variant="circle"
                  size="lg"
                  childAlignment="child-center"
                  className="flow-card"

                >
                  <Title
                    text={step.title}
                    level={4}
                    variant="card"
                    align="center"
                  />
                  <Paragraph
                    text={step.text}
                    size="lg"
                    variant="card"
                    align="center"
                  />
                </Card>
                <ArrowSVG className={`flow-arrow arrow-${index + 1}`} width={80} height={300} thickness={7} rotation={getArrowAngle(index)}/>
              </div>
            ))}
          </div>
          <div className="long-paragraphs">
            <Paragraph
              text="This layered design isn't just for show. It makes the system easier to maintain and extend. If I need to
                  change how the database works, I don't have to touch the frontend. If I want to redesign a page, I don't have
                  to rewrite backend logic. Each part is responsible for a clear role, and they connect through well-defined boundaries."
              size="xl"
              align="center"
            />
          </div>
        </section>
      </AnimatedSection>
    </Container>
  );
}