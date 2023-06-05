import "./cards.css";

interface FlashcardProps {
  frontContent: string;
  backContent: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontContent, backContent, isFlipped, onFlip }) => {
  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="card">
        <div className="front"><h3>{frontContent}</h3></div>
        <div className="back"><h3>{backContent}</h3></div>
      </div>
    </div>
  );
};

export default Flashcard;