"use client"
import React, { useState } from 'react';
import Card from './Card';
import Title from './Title';
import Paragraph from './Paragraph';

/**
 * Interface for carousel item data
 */
interface CarouselItem {
  /** Title text for the card */
  title: string;

  /** Body text content for the card */
  text: string;
}

/**
 * CardCarousel component props interface
 */
interface CardCarouselProps {
  /** HTML id attribute */
  id?: string;

  /** Additional CSS classes to apply to the carousel wrapper */
  className?: string;

  //** Card class name */
  cardClassName?: string;

  /** Card style variant - affects background and styling */
  cardVariant?: 'default' | 'inModal' | 'openModal' | 'list' | 'resume';

  /** Card size variant - affects padding and max-width */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Array of items to display in the carousel */
  items: CarouselItem[];
}

/**
 * CardCarousel component for displaying cards in a 2D carousel layout
 *
 * Creates an interactive carousel where cards are stacked on the left and right
 * sides of the current centered card. Users can navigate through cards using
 * arrow buttons on either side of the current card.
 *
 * Compatible with Card.tsx component and CardCarousel.scss styles.
 *
 * @example
 * ```tsx
 * const carouselItems = [
 *   { title: "Card 1", text: "Content for first card" },
 *   { title: "Card 2", text: "Content for second card" },
 *   { title: "Card 3", text: "Content for third card" }
 * ];
 *
 * <CardCarousel
 *   size="lg"
 *   cardVariant="default"
 *   items={carouselItems}
 * />
 * ```
 *
 * @param props - CardCarousel component props
 * @returns TSX element representing an interactive card carousel
 */
export default function CardCarousel({
  id,
  className = '',
  cardClassName = '',
  cardVariant = 'default',
  size = 'md',
  items,
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardOffset, setCardOffset] = useState(0);
  const displayCards = Array(9).fill(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    setCardOffset((prevOffset) => prevOffset + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
    setCardOffset((prevOffset) => prevOffset - 1);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    action: 'prev' | 'next'
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action === 'prev' ? handlePrevious() : handleNext();
    }
  };

  const getCardPosition = (index: number): string => {
    const adjustedIndex = ((index + cardOffset) % 9 + 9) % 9;

    if (adjustedIndex === 4) return 'center';

    if (adjustedIndex < 4) {
      return `left-${4 - adjustedIndex}`;
    } else {
      return `right-${adjustedIndex - 4}`;
    }
  };

  const carouselClasses = [
    'card-carousel',
    `card-carousel-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={carouselClasses} id={id}>
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={handlePrevious}
        onKeyDown={(e) => handleKeyDown(e, 'prev')}
        aria-label="Previous card"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="carousel-cards-container">
        {displayCards.map((_, index) => {
          const position = getCardPosition(index);
          const cardClasses = `carousel-card carousel-card-${position}`;
          const isCenter = position === 'center';
          const currentItem = isCenter ? items[currentIndex] : null;

          return (
            <div key={index} className={cardClasses}>
              <Card
                size={size}
                variant={cardVariant}
                childAlignment="child-center"
                selfAlignment="self-center"
                childLayoutt="vertical"
                className={ cardClassName}
              >
                {isCenter && currentItem && (
                  <>
                    <h3 className="carousel-card-title">{ }</h3>
                    <Title
                      text={currentItem.title}
                      level={3}
                      align='center'
                      variant='card'
                    />
                    <Paragraph
                      text={currentItem.text}
                      size="lg"
                      align="center"
                      variant="card"
                    />
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={handleNext}
        onKeyDown={(e) => handleKeyDown(e, 'next')}
        aria-label="Next card"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}