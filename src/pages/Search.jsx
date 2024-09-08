import React from 'react';
import PropTypes from 'prop-types';
import { FaGlobe, FaBriefcase, FaSearch } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchResults from './SearchResults';

const FilterCard = ({ title, icon, options, onFilterChange, reset }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    if (reset) {
      setSelectedOptions([]);
    }
  }, [reset]);

  const handleToggle = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onFilterChange(updatedOptions);
  };

  return (
    <div className="w-full bg-[#e6e2eb] backdrop-blur-lg p-3 rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105">
      <div className="flex items-center gap-2 text-[#352872] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-xl">{icon}</div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <FaSearch />
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleToggle(option)}
                className={`cursor-pointer py-1 px-1 rounded-lg text-xs border transition duration-200 text-center ${
                  selectedOptions.includes(option)
                    ? 'bg-gradient-to-r from-[#352872] to-[#5342a9] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

FilterCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired, // Add this line
};

const Search = () => {
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const [resetFilters, setResetFilters] = React.useState(false);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
    setShowResults(false);
    setResetFilters(true); // Trigger the reset
    setTimeout(() => setResetFilters(false), 0); // Reset the flag immediately after
  };

  return (
    <div className="w-full max-w-8xl p-4 bg-[#e6e2eb] min-h-screen flex flex-col">
      {<Header /> }

      <main className="relative flex flex-1 bg-[#e6e2eb]">
        {/* Sidebar */}
        <div className="w-1/4 p-6 bg-white backdrop-blur-lg shadow-lg rounded-xl min-h-screen sticky top-0 overflow-y-auto mt-20 mb-8">
          <div className="w-full max-w-md p-4 bg-[#e6e2eb] rounded-xl shadow-lg transition hover:shadow-2xl hover:scale-105">
            <h1 className="text-lg font-extrabold mb-3 text-[#352872]">Search</h1>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for people "
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#352872]/50 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-[#352872]" />
            </div>
            <button
              className="w-full py-2 bg-gradient-to-r from-[#352872] to-[#c293dd] text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm hover:scale-105"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Filters Section */}
          <div className="mt-6">
            <h1 className="text-lg font-bold mb-3 text-[#352872]">Filters</h1>
            <FilterCard
              title="Skills"
              icon={<FaBriefcase />}
              options={['Coding','Design','Database','Management','Mobile' ,'Networking','DevOps', 'AI', 'Cloud', 'Security','Debugging',
  'Business','Music', 'Writing', 'Marketing' ,'Languages' ,'Engineering' , 'Travel' ]}
              onFilterChange={handleFilterChange}
              reset={resetFilters}
            />
            <FilterCard
              title="Interest"
              icon={<FaGlobe />}
              options={['Music', 
  'Movies', 
  'Books', 
  'Tech', 
  'Travel', 
  'Fitness', 
  'Gaming', 
  'Photography', 
  'Art', 
  'Cooking', 
  'Fashion', 
  'Science', 
  'Health', 
  'Nature', 
  'Business','animal']}
              onFilterChange={handleFilterChange}
              reset={resetFilters}
            />
            
            {activeFilters.length > 0 && (
              <div className="mt-4">
                <button
                  className="w-full py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 flex flex-col bg-[#e6e2eb]">
          <div className="relative flex-1">
            {showResults ? (
              <SearchResults searchTerm={searchTerm} filters={activeFilters} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-full">
                <h2 className="text-2xl font-bold text-[#352872]">Your search results will appear here</h2>
              </div>
            )}
          </div>
        </div>
      </main>

      { <Footer /> }
    </div>
  );
};

export default Search;
