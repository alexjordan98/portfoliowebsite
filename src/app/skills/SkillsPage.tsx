"use client"
import React, { useState, useEffect } from 'react';
import { getAllSkills, Skill } from '@/lib/api';
import { SkillsBubble } from '@/components/skills/SkillsBubble';

/**
 * Interface for a bubble instance with all necessary properties
 */
interface BubbleInstance {
  /**
   * Unique identifier for the bubble
   */
  id: string;

  /**
   * The skill name to display
   */
  skillName: string;

  /**
   * Delay in milliseconds before the bubble appears
   */
  delay: number;
}

/**
 * Skills page component that displays a button to release skill bubbles
 * Fetches skills from the backend and creates animated floating bubbles
 *
 * @component
 * @example
 * ```tsx
 * <SkillsPage />
 * ```
 */
export const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [bubbles, setBubbles] = useState<BubbleInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch skills from the backend on component mount
   */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills);
        setError(null);
      } catch (err) {
        setError('Failed to load skills. Please try again later.');
        console.error('Error fetching skills:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  /**
   * Generates a random number of bubbles between min and max (inclusive)
   *
   * @param min - Minimum number of bubbles
   * @param max - Maximum number of bubbles
   * @returns Random number between min and max
   */
  const getRandomBubbleCount = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Selects a random skill from the available skills array
   *
   * @returns A random Skill object
   */
  const getRandomSkill = (): Skill => {
    const randomIndex = Math.floor(Math.random() * skills.length);
    return skills[randomIndex];
  };

  /**
   * Handles the "Release the Skills" button click
   * Creates 5-20 bubbles released over 10 seconds
   */
  const handleReleaseSkills = () => {
    if (skills.length === 0) return;

    const bubbleCount = getRandomBubbleCount(5, 20);
    const newBubbles: BubbleInstance[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const randomSkill = getRandomSkill();
      newBubbles.push({
        id: `bubble-${Date.now()}-${i}`,
        skillName: randomSkill.name,
        delay: 0
      });
    }

    setBubbles((prev) => [...prev, ...newBubbles]);
  };

  /**
   * Clears all bubbles from the screen
   */
  const handleClearBubbles = () => {
    setBubbles([]);
  };

  if (isLoading) {
    return (
      <div className="skills-page">
        <div className="skills-page__loading">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="skills-page">
        <div className="skills-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <div className="skills-page__button-container">
        <button
          className="skills-page__release-button"
          onClick={handleReleaseSkills}
          disabled={skills.length === 0}
        >
          RELEASE THE SKILLS
        </button>
        {bubbles.length > 0 && (
          <button
            className="skills-page__clear-button"
            onClick={handleClearBubbles}
          >
            Clear Bubbles
          </button>
        )}
      </div>

      <div className="skills-page__bubbles-container">
        {bubbles.map((bubble) => (
          <SkillsBubble
            key={bubble.id}
            id={bubble.id}
            skill={bubble.skillName}
            randomized={true}
          />
        ))}
      </div>
    </div>
  );
};