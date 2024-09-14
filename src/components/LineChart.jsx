import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
        <XAxis dataKey="name" stroke={darkMode ? '#ddd' : '#333'} />
        <YAxis stroke={darkMode ? '#ddd' : '#333'} />
        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }} />
        <Legend />
        <Line type="monotone" dataKey="interaction" stroke={darkMode ? '#82ca9d' : '#A18249'} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Define prop types
CustomLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      interaction: PropTypes.number.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired, // Add darkMode prop
};

export default CustomLineChart;
