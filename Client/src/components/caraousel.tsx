import React, { useState } from 'react';
import Flashcard from './card';



interface SlideshowProps {
  flashcards: string[][];
}

const Slideshow: React.FC<SlideshowProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const currentCardIndex = currentIndex + 1;
  const totalCards = flashcards.length;

  return (
    <div className="slideshow">
      <Flashcard
        frontContent={flashcards[currentIndex][0]}
        backContent={flashcards[currentIndex][1]}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />
      
      <div className="buttons">
        <button onClick={handlePrev} className="next_prev">Previous</button>
        <div className="counter">{`${currentCardIndex}/${totalCards}`}</div>
        <button onClick={handleNext} className="next_prev">Next</button>
      </div>
    </div>
  );
};

export default Slideshow;