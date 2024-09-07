import PropTypes from 'prop-types';

const Arrow = ({ direction, color, percentage }) => {
  const arrowStyle = {
    width: '20px',
    height: '20px',
    display: 'inline-block',
    border: `2px solid ${color}`,
    borderBottom: direction === 'up' ? 'none' : '2px solid transparent',
    borderTop: direction === 'down' ? 'none' : '2px solid transparent',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    transform: direction === 'up' ? 'rotate(-135deg)' : 'rotate(45deg)',
    marginRight: '10px',
    verticalAlign: 'middle',
  };

  return (
    <div style={arrowStyle}>
      <span style={{ color, marginLeft: '5px' }}>{percentage}</span>
    </div>
  );
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(['up', 'down']).isRequired,
  color: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
};

export default Arrow;
