import React from 'react';
import Paragraph from './Paragraph';
import lookingAtComputer from '@/images/looking-at-computer.png'
import DisplayImage from './DisplayImage';

export default function TLDRCircle() {
    return (
        <div className="stack-circle">
            <div className="stack-column backend">
                <Paragraph
                    text="Backend"
                    fontSize={24}
                    color="white"
                    hasShadow={false}
                />
                <Paragraph
                    text="I develop scalable and secure backend systems that smoothly interact with frontend code and external services. Tech I use includes PHP, Java, Python, Go, .NET, and AWS EC2."
                    fontSize={18}
                    color="whie"
                    hasShadow={false}
                />
            </div>
            <DisplayImage
                className="tldr-circle-image"
                src={lookingAtComputer}
                alt="looking"
                width={550}
                height={550}
            />

            <div className="stack-column frontend">
                <Paragraph
                    text="Frontend"
                    fontSize={24}
                    color="white"
                    hasShadow={false}
                />
                <Paragraph
                    text="I build modern responsive interfaces with excellent user experience using React, Next.js, and TypeScript. I work with modern styling tools like Tailwind, SCSS, LQIP, and Svelte."
                    fontSize={18}
                    color="white"
                    hasShadow={false}
                />
            </div>

            <div className="stack-column api">
                <Paragraph
                    text="API Calls"
                    fontSize={24}
                    color="white"
                    hasShadow={false}
                />
                <Paragraph
                    text="I create and consume APIs to connect frontend and backend, using REST principles and modern auth layers. I work with REST APIs, Firewalls, and OAuth 2.0, JWT."
                    fontSize={18}
                    color="white"
                    hasShadow={false}
                />
            </div>

            <div className="stack-column db">
                <Paragraph
                    text="Database Design"
                    fontSize={24}
                    color="white"
                    hasShadow={false}
                />
                <Paragraph
                    text="I design efficient and reliable schemas tailored to complex models and relational legacy systems. I work with PostgreSQL, MySQL, Firestore, and SAP."
                    fontSize={18}
                    color="white"
                    hasShadow={false}
                />
            </div>
        </div>
    );
}
