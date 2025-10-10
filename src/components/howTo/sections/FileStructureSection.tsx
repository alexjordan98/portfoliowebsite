import React from 'react';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Card from '@/components/Card';
import NumberedList from '@/components/NumberedList';
import Container from '@/components/Container';
import AnimatedSection from '@/components/AnimatedSection';
import FileTreeSVG from '@/components/howTo/svgs/FileTreeSVG';

/**
 * File Structure section component for the "How This Site Was Made" page
 *
 * @returns TSX element containing the file structure section
 */
export default function FileStructureSection() {
    const frontendItems = [
        {
            boldPrefix: "app/",
            text: " → Each page of the site lives here. For example, the Resume page has its own folder with a page.tsx file, which keeps routing simple and predictable."
        },
        {
            boldPrefix: "components/",
            text: " → Reusable building blocks like Cards, Sections, Navbar, and Footer. This keeps the look and feel consistent while avoiding duplicated code."
        },
        {
            boldPrefix: "components/resume/",
            text: " → Tabs and sections specific to the Resume page, so everything related to that feature stays in one place."
        },
        {
            boldPrefix: "styles/",
            text: " → SCSS files split into categories (components, pages, utilities). This makes the design modular and easy to update without breaking the whole site."
        }
    ];

    const backendItems = [
        {
            boldPrefix: "controllers/",
            text: " → Handle incoming requests (the \"receptionists\" of the system)."
        },
        {
            boldPrefix: "services/",
            text: " → Contain the business logic (the \"managers\" who decide what needs to happen)."
        },
        {
            boldPrefix: "core/entities/",
            text: " → Define the database models (like the Skill entity)."
        },
        {
            boldPrefix: "core/repositories/",
            text: " → Handle database access (the \"filing cabinets\" where data lives)."
        },
        {
            boldPrefix: "scripts/",
            text: " → Utilities like PopulateSkills, which seeds the database with starter data."
        }
    ];

    return (
        <AnimatedSection animation="fadeUp" delay={300}>
            <Container
                size="full"
                childLayout="vertical"
                childAlignment="child-center"
                className="pink-container"
            >
                <div className="title-how-to">
                    <Title
                        text="File & Component Structure"
                        level={2}
                        align="center"
                        underlined={true}
                    />
                </div>
                <div className="long-paragraphs">
                    <Paragraph
                        text="A big part of building a site like this isn't just writing code that works — it's organizing it in a way that stays clean and maintainable as the project grows. I paid a lot of attention to how both the frontend and backend are structured so that the code makes sense, is easy to extend, and follows common industry patterns."
                        size="xl"
                        align="center"
                    />
                </div>
                <div className="file-structure-layout">
                    <AnimatedSection
                        animation="fadeRight"
                        delay={400}
                        className="file-structure-svg-container"
                    >
                        <FileTreeSVG />
                    </AnimatedSection>
                    <div className="file-structure-content">
                        <div className="file-structure-cards-row">
                            <AnimatedSection animation="fadeUp" delay={500}>
                                <Card
                                    variant="default"
                                    size="lg"
                                    className="lavender-card"
                                    childAlignment="child-left"
                                >
                                    <Title
                                        text="Frontend (React + Next.js)"
                                        level={3}
                                        variant="card"
                                        align="left"
                                    />
                                    <NumberedList
                                        items={frontendItems}
                                        listIndexType="disc"
                                        size="base"
                                        align="left"
                                        hasTitle={false}
                                    />
                                    <Paragraph
                                        text="The end result is that I can add new features (like another tab or a new page) without rewriting existing components — I just compose the pieces I already built."
                                        size="lg"
                                        align="left"
                                    />
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={550}>
                                <Card
                                    variant="default"
                                    size="lg"
                                    className="lavender-card"
                                    childAlignment="child-left"
                                >
                                    <Title
                                        text="Backend (Spring Boot with MVC)"
                                        level={3}
                                        variant="card"
                                        align="left"
                                    />
                                    <NumberedList
                                        items={backendItems}
                                        listIndexType="disc"
                                        size="base"
                                        align="left"
                                        hasTitle={false}
                                    />
                                    <Paragraph
                                        text="This structure means each layer has a single responsibility. If I want to change how data is stored, I update the Repository. If I want to adjust logic, I edit the Service. If I want to expose a new endpoint, I add a Controller. Each piece is clear and isolated, which makes the whole system easier to work with."
                                        size="lg"
                                        align="left"
                                    />
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </Container>
        </AnimatedSection>
    );
}