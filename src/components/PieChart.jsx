import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9c6200', '#9c9700', '#6f42c1', '#e83e8c','#3e8c','#a23e8a'];

const CustomPieChart = ({ data }) => {
  // Define the categories you want to display
  const specificCategories = ['Sport', 'Animal', 'Gaming', 'Music', 'Movies', 'Books', 'Tech', 'Travel', 'Movies' ,'Fashion','Science'];

  // Filter the data to only include those specific categories
  const filteredData = data.filter(item => specificCategories.includes(item.name));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={filteredData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomPieChart;