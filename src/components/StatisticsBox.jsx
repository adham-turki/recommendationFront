import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatisticsBox = ({ title, value, engagementRate, comparisonValue, darkMode }) => {
  // Determine if the engagement rate is high and set arrow color accordingly
  const isEngagementHigh = engagementRate > comparisonValue;
  const arrowColor = isEngagementHigh ? 'text-green-500' : 'text-red-500';
  const arrowIcon = isEngagementHigh ? <FaArrowUp /> : <FaArrowDown />;

  // Calculate percentage change if both engagementRate and comparisonValue are provided
  const percentageChange = comparisonValue !== undefined 
    ? `${((Math.abs(engagementRate - comparisonValue) / comparisonValue) * 100).toFixed(2)}%`
    : '';

  return (
    <div className={`rounded-lg shadow-md p-6 flex items-center border border-solid ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} `}>
      <div className='w-full'>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</h3>
        <div className="flex justify-between w-full">
          <p className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{value}</p>
          {engagementRate !== undefined && comparisonValue !== undefined && (
            <div className={`flex items-center rounded-2xl ${darkMode ? 'bg-gray-600' : 'bg-[#dcfce7]'} `}>
              <span className={`text-sm pl-2 ${arrowColor}`}>{arrowIcon}</span>
              <span className={`text-sm font-medium pr-2 ${arrowColor}`}>{percentageChange}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StatisticsBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  engagementRate: PropTypes.number,
  comparisonValue: PropTypes.number,
  darkMode: PropTypes.bool.isRequired,
};

StatisticsBox.defaultProps = {
  engagementRate: undefined,
  comparisonValue: undefined,
};

export default StatisticsBox;
