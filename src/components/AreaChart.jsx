import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Define the CustomAreaChart component
const CustomAreaChart = ({ data }) => {
  return (
    <AreaChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="performance" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

// Prop validation for CustomAreaChart
CustomAreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      performance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomAreaChart;
