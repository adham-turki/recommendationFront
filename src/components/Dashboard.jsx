import { useState } from 'react';
import CustomLineChart from './LineChart.jsx';
import CustomPieChart from './PieChart.jsx';
import CustomBarChart from './BarChart.jsx';
import StatisticsBox from './StatisticsBox.jsx';
import PropTypes from 'prop-types';

const Dashboard = ({ darkMode }) => {  // Add darkMode prop
  const [timeRange, setTimeRange] = useState('Last 30 Days'); // Default time range


  // // Mock data for different time ranges
  // let data =await fetch('http://192.168.1.136:8089/contents/1')
  // .then(async (response) => {
  //   console.log(await response.json())

  //   // return response.json();
  // })
  // .catch((err) => {
  //   console.log(err);
    
  // })
  // console.log(data)
  const getDataForTimeRange = (range) => {
    switch (range) {
      case 'Last Week':
        return [
          { name: 'Sat', performance: 1000 },
          { name: 'Sun', performance: 1200 },
          { name: 'Mon', performance: 1100 },
          { name: 'Tue', performance: 1050 },
          { name: 'Wed', performance: 1300 },
          { name: 'Thu', performance: 1250 },
          { name: 'Fri', performance: 1400 },
        ];
      case 'Last 30 Days':
        return [
          { name: '2024-07-30', performance: 1200 },
          { name: '2024-07-31', performance: 1500 },
          { name: '2024-08-01', performance: 1700 },
          { name: '2024-08-02', performance: 1600 },
          { name: '2024-08-03', performance: 1400 },
          { name: '2024-08-04', performance: 1300 },
          { name: '2024-08-05', performance: 1500 },
          { name: '2024-08-06', performance: 1600 },
          { name: '2024-08-07', performance: 1750 },
          { name: '2024-08-08', performance: 1650 },
          { name: '2024-08-09', performance: 1550 },
          { name: '2024-08-10', performance: 1450 },
          { name: '2024-08-11', performance: 1400 },
          { name: '2024-08-12', performance: 1600 },
          { name: '2024-08-13', performance: 1700 },
          { name: '2024-08-14', performance: 1800 },
          { name: '2024-08-15', performance: 1900 },
          { name: '2024-08-16', performance: 2000 },
          { name: '2024-08-17', performance: 2100 },
          { name: '2024-08-18', performance: 2200 },
          { name: '2024-08-19', performance: 2300 },
          { name: '2024-08-20', performance: 2400 },
          { name: '2024-08-21', performance: 2500 },
          { name: '2024-08-22', performance: 2600 },
          { name: '2024-08-23', performance: 2700 },
          { name: '2024-08-24', performance: 2800 },
          { name: '2024-08-25', performance: 2900 },
          { name: '2024-08-26', performance: 3000 },
          { name: '2024-08-27', performance: 3100 },
          { name: '2024-08-28', performance: 3200 },
          { name: '2024-08-29', performance: 3300 },
          { name: '2024-08-30', performance: 3400 },
          { name: '2024-08-31', performance: 3500 },
        ];
      case 'Last 1 Year':
        return [
          { name: 'Jan', performance: 4000 },
          { name: 'Feb', performance: 3000 },
          { name: 'Mar', performance: 1000 },
          { name: 'Apr', performance: 2780 },
          { name: 'May', performance: 1890 },
          { name: 'Jun', performance: 390 },
          { name: 'Jul', performance: 3490 },
          { name: 'Aug', performance: 2000 },
          { name: 'Sep', performance: 2780 },
          { name: 'Oct', performance: 890 },
          { name: 'Nov', performance: 2390 },
          { name: 'Dec', performance: 3490 },
        ];
      default:
        return [];
    }
  };

  // Example engagement rate and comparison value
  const engagementRate = 86; // Example engagement rate
  const comparisonValue = 50; // Example comparison value

  return (
    <main className={`flex flex-col py-10 px-12 w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>  {/* Apply dark mode classes */}
      {/* Statistics Boxes Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatisticsBox
          title="Total Users"
          value="1,234"
          darkMode={darkMode} // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Active Users"
          value="567"
          darkMode={darkMode} // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Engagement Rate"
          value={`${engagementRate}%`}
          engagementRate={engagementRate}
          comparisonValue={comparisonValue}
          darkMode={darkMode} // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Total Posts"
          value="987"
          darkMode={darkMode} // Pass darkMode to StatisticsBox if needed
        />
      </section>

      {/* Performance Chart Section */}
      <section className={`flex flex-col rounded-3xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} border p-10 mb-6`}> {/* Apply dark mode classes */}
        <h2 className="font-semibold text-[28px] leading-[1.2] tracking-[-0.015em] mb-1">Total Interactions</h2>
        <p className="mb-6 text-[14px] text-[#eeeeee]">Track number of interactions over time</p>
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTimeRange('Last Week')}
              className={`py-2 px-4 rounded-lg font-medium text-[14px] ${timeRange === 'Last Week' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-[#D9D9D9]') : (darkMode ? 'bg-gray-700 text-white' : 'bg-[#F2F2F2]')} `}
            >
              Last Week
            </button>
            <button
              onClick={() => setTimeRange('Last 30 Days')}
              className={`py-2 px-4 rounded-lg font-medium text-[14px] ${timeRange === 'Last 30 Days' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-[#D9D9D9]') : (darkMode ? 'bg-gray-700 text-white' : 'bg-[#F2F2F2]')} `}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('Last 1 Year')}
              className={`py-2 px-4 rounded-lg font-medium text-[14px] ${timeRange === 'Last 1 Year' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-[#D9D9D9]') : (darkMode ? 'bg-gray-700 text-white' : 'bg-[#F2F2F2]')} `}
            >
              Last 1 Year
            </button>
          </div>
          <div>
            <select className={`py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-[#F2F2F2]'} font-medium text-[14px] text-black`}>
              <option>All categories</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
          </div>
        </div>
        <CustomLineChart data={getDataForTimeRange(timeRange)} darkMode={darkMode} />
        </section>
      <section className={`flex flex-col rounded-3xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} border p-10 mb-6`}> {/* Apply dark mode classes */}
        <h2 className="font-semibold text-[28px] leading-[1.2] tracking-[-0.015em] mb-1">Total Posts Distribution</h2>
        <p className="mb-6 text-[14px] text-[#eeeeee]">A pie chart showing the distribution of different categories. Each slice represents the proportion of total interactions attributed to that category.</p>
        <CustomPieChart darkMode={darkMode} />
        </section>
      <section className={`flex flex-col justify-self-center rounded-3xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} border p-10`}> {/* Apply dark mode classes */}
        <h2 className="font-semibold text-[28px] leading-[1.2] tracking-[-0.015em] mb-1">Profile Searching</h2>
        <p className="mb-6 text-[14px] text-[#eeeeee]">A bar chart displaying the performance metrics for each month over the past year. Each bar represents the total performance for that month.</p>
        <div className='flex mx-auto'>
        <CustomBarChart data={getDataForTimeRange('Last 1 Year')} darkMode={darkMode} />
        </div>
      </section>
    </main>
  );
};
Dashboard.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Dashboard;