import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Define the CustomBarChart component
const CustomBarChart = ({ data, darkMode }) => {
  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
      <XAxis dataKey="name" stroke={darkMode ? '#ddd' : '#333'} />
      <YAxis stroke={darkMode ? '#ddd' : '#333'} />
      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }} />
      <Bar dataKey="performance" fill={darkMode ? '#82ca9d' : '#8884d8'} />
    </BarChart>
  );
};

// Prop validation for CustomBarChart
CustomBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      performance: PropTypes.number.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired, // Add darkMode prop
};

export default CustomBarChart;
