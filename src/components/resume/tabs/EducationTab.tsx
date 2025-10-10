"use client"

import Card from "@/components/Card";
import Container from "@/components/Container";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

/**
 * EducationTab component that displays my educational history
 *
 */
export default function EducationTab() {
    return (
        <>
            <Container
                size="full"
                childLayout="vertical"
                childAlignment="child-center"
                className="education-container"
            >
                <Title
                    text="University"
                    level={2}
                    shadow={true}
                    underlined={true}
                />
                <div className="education-titles">
                    <Title
                        text="Northeastern University, Boston MA"
                        level={3}
                        align="left"
                        className="education-title"
                    />
                    <Title
                        text="College of Computer and Information Science"
                        level={4}
                        align="left"
                        className="education-title"
                    />
                    <Title
                        text="Bachelor of Science in Computer Science and Philosophy with Minors in Mathematics and Information Ethics"
                        level={5}
                        align="left"
                        className="education-title"
                    />
                </div>
                <div className="education-noteable-classes">
                    <Title
                        text="Noteable Classes"
                        level={3}
                        align="left"
                        className="noteable-classes-main-title"
                    />
                    <Container
                        size='full'
                        childLayout="horizontal"
                        childAlignment="child-left"
                    >
                        <Card
                            size="sm"
                            variant="default"
                            childAlignment="child-center"
                            selfAlignment="self-left"
                        >
                            <Title
                                text="Software Development"
                                level={5}
                                align="center"
                                variant="card"
                            />
                            <Paragraph
                                text="In this class I learned the fundamentals of modern professional software development.
                                                Specifically things like agile development, versioning, MVC, etc."
                                size="sm"
                                variant="card"
                                align="center"
                            />
                        </Card>
                        <Card
                            size="sm"
                            variant="default"
                            childAlignment="child-center"
                            selfAlignment="self-left"
                        >
                            <Title
                                text="Theory of Computation"
                                level={5}
                                align="center"
                                variant="card"
                            />
                            <Paragraph
                                text="Theory of computation was the most interesting Computer Science class that I took.
                                                We learned how to define Turing Machines and how all software can be described as one."
                                size="sm"
                                variant="card"
                                align="center"
                            />
                        </Card>
                        <Card
                            size="sm"
                            variant="default"
                            childAlignment="child-center"
                            selfAlignment="self-left"
                        >
                            <Title
                                text="Algorithms"
                                level={5}
                                align="center"
                                variant="card"
                            />
                            <Paragraph
                                text="In Algorithms we learned the most commonly used algorithms that cpmputer scientists
                                             need to solve problems like binary search, marge sort, graph/tree alorithms and
                                             Dijkstra's algorithm"
                                size="sm"
                                variant="card"
                                align="center"
                            />
                        </Card>
                        <Card
                            size="sm"
                            variant="default"
                            childAlignment="child-center"
                            selfAlignment="self-left"
                        >
                            <Title
                                text="Global Justice"
                                level={5}
                                align="center"
                                variant="card"
                            />
                            <Paragraph
                                text="This was my capstone philosophy class, in it we had to write a paper on a Global Justice
                                    topic. I wrote mine about Climate Change and countries' obligations to reduce emissions."
                                size="sm"
                                variant="card"
                                align="center"
                            />
                        </Card>
                    </Container>

                </div>
                <div className="education-high-school">
                    `<Title
                        text="High School"
                        level={2}
                        shadow={true}
                        underlined={true}
                    />

                    <div className="education-titles">
                        <Title
                            text="The American School in Switzerland, Lugano, Switzerland"
                            level={3}
                            align="left"
                            className="education-title"
                        />
                        <Title
                            text="International Baccalaureate (IB) Diploma, (High School Diploma)"
                            level={4}
                            align="left"
                            className="education-title"
                        />
                    </div>
                    <div className="education-high-school-skills">
                        <Title
                            text="Most Useful Skills Gained"
                            level={3}
                            align="left"
                            className="noteable-classes-main-title"
                        />
                        <Container
                            size='full'
                            childLayout="horizontal"
                            childAlignment="child-left"
                        >
                            <Card
                                size="sm"
                                variant="default"
                                childAlignment="child-center"
                                selfAlignment="self-left"
                            >
                                <Title
                                    text="I learned to speak Spanish very well, almost fluently. I have found this
                                        extremely useful living on the east coast and get to practice regularly."
                                    level={5}
                                    align="center"
                                    variant="card"
                                />

                            </Card>
                            <Card
                                size="sm"
                                variant="default"
                                childAlignment="child-center"
                                selfAlignment="self-left"
                            >
                                <Title
                                    text="IB prepared me to tackle rigorous university ciricula, and taught me to think critically.
                                     IB History especially taught me to always pay attention to people's sources."
                                    level={5}
                                    align="center"
                                    variant="card"
                                />

                            </Card>
                            <Card
                                size="sm"
                                variant="default"
                                childAlignment="child-center"
                                selfAlignment="self-left"
                            >
                                <Title
                                    text="I learned how to get along with people from all over the world and made deep
                                     / lasting friendships that cut through cultutral differences."
                                    level={5}
                                    align="center"
                                    variant="card"
                                />
                            </Card>

                        </Container>

                    </div>

                </div>
            </Container>
        </>

    );
}