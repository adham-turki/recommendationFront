import PropTypes from 'prop-types';
const Button = ({ label, onClick, type = 'primary' }) => {
    const baseStyles = 'px-6 py-3 rounded-full font-semibold transition duration-300 transform';
  
    const typeStyles =
      type === 'primary'
        ? 'bg-gradient-to-r from-[#352872] to-[#5342a9] text-white shadow-lg hover:scale-105 hover:bg-[#5342a9] hover:shadow-xl'
        : 'bg-gradient-to-r from-gray-400 to-gray-200 text-gray-800 shadow-md hover:scale-105 hover:from-gray-500 hover:to-gray-300 hover:shadow-lg';
  
    return (
      <button
        className={`${baseStyles} ${typeStyles}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  Button.propTypes = {
    label: PropTypes.string.isRequired,  // label must be a string and is required
    onClick: PropTypes.func.isRequired,  // onClick must be a function and is required
    type: PropTypes.oneOf(['primary', 'secondary']) // type must be 'primary' or 'secondary'
  };
  
  Button.defaultProps = {
    type: 'primary',  // default type is 'primary'
  };
  
  export default Button;
  