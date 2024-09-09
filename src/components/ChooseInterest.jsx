import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import InterestTile from './InterestTile';
import Button from './Button';
import ParticleBackground from './ParticleBackground';

const interests = [
  'Music', 'Movies', 'Books', 'Tech', 'Travel', 'Fitness', 'Gaming', 'Photography',
  'Art', 'Cooking', 'Fashion', 'Science', 'Health', 'Nature', 'Business'
];

const ChooseInterest = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleSelect = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 5) {
      navigate('/skills'); // Navigate to ChooseSkills page
    } else {
      alert('Please select at least 5 interests.'); // Show error message
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll('.interest-tile');
    const tilePositions = Array.from(tiles).map(tile => {
      const rect = tile.getBoundingClientRect();
      return {
        id: tile.dataset.id,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    });

    const newLines = [];
    if (selectedInterests.length > 1) {
      for (let i = 0; i < selectedInterests.length - 1; i++) {
        const startInterest = selectedInterests[i];
        const endInterest = selectedInterests[i + 1];
        const startPos = tilePositions.find(tile => tile.id === interests.indexOf(startInterest));
        const endPos = tilePositions.find(tile => tile.id === interests.indexOf(endInterest));
        if (startPos && endPos) {
          newLines.push({
            x1: startPos.x,
            y1: startPos.y,
            x2: endPos.x,
            y2: endPos.y,
          });
        }
      }
    }

    setLines(newLines);
  }, [selectedInterests]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#e6e2eb] overflow-hidden">
      <div className="relative flex flex-col items-center justify-center flex-grow z-10 mt-24">
        <ParticleBackground className="absolute inset-0 z-0" />
        <h1 className="text-4xl font-bold text-[#352872] mb-8 z-10">Choose Your Interests</h1>
        <div ref={containerRef} className="relative flex flex-wrap gap-6 justify-center z-10 max-w-5xl mx-auto">
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1000 1000">
            {lines.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                stroke="#352872"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          {interests.map((interest, index) => (
            <InterestTile
              key={interest}
              interest={interest}
              selected={selectedInterests.includes(interest)}
              onSelect={handleSelect}
              data-id={index}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-8 z-10">
          <Button label="Continue" onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
};

export default ChooseInterest;
