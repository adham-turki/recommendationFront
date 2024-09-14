import { useEffect, useState } from 'react';
import CustomLineChart from './LineChart.jsx';
import CustomPieChart from './PieChart.jsx';
import CustomBarChart from './BarChart.jsx';
import StatisticsBox from './StatisticsBox.jsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Dashboard = () => {  // Add darkMode prop
  const [timeRange, setTimeRange] = useState('Last 30 Days'); // Default time range
  const [statistics, setStatistics] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);



  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API}/statistics`);
      const data = await res.json();
      setStatistics(data);
    }
    fetchData();
    console.log(statistics)
  }, []);
   // Transform categoryCounts into an array of objects with name and value properties
   const getCategoryCountsData = () => {
    if (!statistics.categoryCounts) return [];
    return Object.entries(statistics.categoryCounts).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  const getDataForTimeRange = (range) => {
    switch (range) {
      case 'Last Week':
        return [
          { name: 'Sat', interaction: 1000 },
          { name: 'Sun', interaction: 1200 },
          { name: 'Mon', interaction: 1100 },
          { name: 'Tue', interaction: 1050 },
          { name: 'Wed', interaction: 1300 },
          { name: 'Thu', interaction: 1250 },
          { name: 'Fri', interaction: 1400 },
        ];
      case 'Last 30 Days':
        return [
          { name: '2024-07-30', interaction: 1200 },
          { name: '2024-07-31', interaction: 1500 },
          { name: '2024-08-01', interaction: 1700 },
          { name: '2024-08-02', interaction: 1600 },
          { name: '2024-08-03', interaction: 1400 },
          { name: '2024-08-04', interaction: 1300 },
          { name: '2024-08-05', interaction: 1500 },
          { name: '2024-08-06', interaction: 1600 },
          { name: '2024-08-07', interaction: 1750 },
          { name: '2024-08-08', interaction: 1650 },
          { name: '2024-08-09', interaction: 1550 },
          { name: '2024-08-10', interaction: 1450 },
          { name: '2024-08-11', interaction: 1400 },
          { name: '2024-08-12', interaction: 1600 },
          { name: '2024-08-13', interaction: 1700 },
          { name: '2024-08-14', interaction: 1800 },
          { name: '2024-08-15', interaction: 1900 },
          { name: '2024-08-16', interaction: 2000 },
          { name: '2024-08-17', interaction: 2100 },
          { name: '2024-08-18', interaction: 2200 },
          { name: '2024-08-19', interaction: 2300 },
          { name: '2024-08-20', interaction: 2400 },
          { name: '2024-08-21', interaction: 2500 },
          { name: '2024-08-22', interaction: 2600 },
          { name: '2024-08-23', interaction: 2700 },
          { name: '2024-08-24', interaction: 2800 },
          { name: '2024-08-25', interaction: 2900 },
          { name: '2024-08-26', interaction: 3000 },
          { name: '2024-08-27', interaction: 3100 },
          { name: '2024-08-28', interaction: 3200 },
          { name: '2024-08-29', interaction: 3300 },
          { name: '2024-08-30', interaction: 3400 },
          { name: '2024-08-31', interaction: 3500 },
        ];
      case 'Last 1 Year':
        return [
          { name: 'Jan', interaction: 4000 },
          { name: 'Feb', interaction: 3000 },
          { name: 'Mar', interaction: 1000 },
          { name: 'Apr', interaction: 2780 },
          { name: 'May', interaction: 1890 },
          { name: 'Jun', interaction: 390 },
          { name: 'Jul', interaction: 3490 },
          { name: 'Aug', interaction: 2000 },
          { name: 'Sep', interaction: 2780 },
          { name: 'Oct', interaction: 890 },
          { name: 'Nov', interaction: 2390 },
          { name: 'Dec', interaction: 3490 },
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
          value={statistics.totalUsers}
           // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Active Users"
          value="567"
           // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Engagement Rate"
          value={`${engagementRate}%`}
          engagementRate={engagementRate}
          comparisonValue={comparisonValue}
           // Pass darkMode to StatisticsBox if needed
        />
        <StatisticsBox
          title="Total Posts"
          value={statistics.totalPosts}
           // Pass darkMode to StatisticsBox if needed
        />
      </section>

      {/* interaction Chart Section */}
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
        <CustomLineChart data={getDataForTimeRange(timeRange)}  />
        </section>
      <section className={`flex flex-col rounded-3xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} border p-10 mb-6`}> {/* Apply dark mode classes */}
        <h2 className="font-semibold text-[28px] leading-[1.2] tracking-[-0.015em] mb-1">Total Posts Distribution</h2>
        <p className="mb-6 text-[14px] text-[#eeeeee]">A pie chart showing the distribution of different categories. Each slice represents the proportion of total interactions attributed to that category.</p>
        <CustomPieChart data={getCategoryCountsData()}  />
        </section>
      <section className={`flex flex-col justify-self-center rounded-3xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#EEEEEE]'} border p-10`}> {/* Apply dark mode classes */}
        <h2 className="font-semibold text-[28px] leading-[1.2] tracking-[-0.015em] mb-1">Profile Searching</h2>
        <p className="mb-6 text-[14px] text-[#eeeeee]">A bar chart displaying the interaction metrics for each month over the past year. Each bar represents the total interaction for that month.</p>
        <div className='flex mx-auto'>
        <CustomBarChart data={getDataForTimeRange('Last 1 Year')}  />
        </div>
      </section>
    </main>
  );
};
Dashboard.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Dashboard;