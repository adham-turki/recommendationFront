import { useSpring, animated } from '@react-spring/web';
import { FaMusic, FaFilm, FaPaw,FaBook, FaLaptopCode, FaPlane, FaDumbbell, FaGamepad, FaCamera, FaPalette, FaUtensils, FaTshirt, FaFlask, FaHeartbeat, FaTree, FaBriefcase } from 'react-icons/fa';

const icons = {
  Music: <FaMusic />,
  Movies: <FaFilm />,
  Books: <FaBook />,
  Tech: <FaLaptopCode />,
  Travel: <FaPlane />,
  Fitness: <FaDumbbell />,
  Gaming: <FaGamepad />,
  Photography: <FaCamera />,
  Art: <FaPalette />,
  Cooking: <FaUtensils />,
  Fashion: <FaTshirt />,
  Science: <FaFlask />,
  Health: <FaHeartbeat />,
  Nature: <FaTree />,
  Business: <FaBriefcase />,
  Animal: <FaPaw />,
};

const InterestTile = ({ interest, selected, onSelect }) => {
  const styles = useSpring({
    transform: selected ? 'scale(1.1) rotateY(10deg)' : 'scale(1)',
    boxShadow: selected ? '0px 20px 40px rgba(29, 53, 87, 0.7)' : '0px 5px 20px rgba(0, 0, 0, 0.3)',
    backgroundColor: selected ? '#5342a9' : '#352872',
    config: { tension: 400, friction: 15 }
  });

  return (
    <animated.div
      style={styles}
      className="interest-tile w-28 h-28 text-white rounded-xl flex flex-col items-center justify-center 
                  cursor-pointer m-3 p-4 transition-all transform perspective-500"
      onClick={() => onSelect(interest)}
    >
      <div className="text-2xl">{icons[interest]}</div>
      <h3 className="mt-2 text-base font-semibold">{interest}</h3>
    </animated.div>
  );
};

export default InterestTile;
