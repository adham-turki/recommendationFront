import React , { useState } from 'react';
import PropTypes from 'prop-types';
import { FaGlobe, FaBriefcase, FaSearch } from 'react-icons/fa';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SearchResults from './SearchResults';
import { motion } from 'framer-motion';

// Define the header height
const headerHeight = 60; // Adjust this value based on your header's height
const suggestedProfiles = [
  // Profiles as defined in your original code
  {
    user_id: 4,
    first_name: "Michael",
    last_name: "Jordan",
    email: "m.jordan@example.com",
    imgSrc: "https://ui-avatars.com/api/?name=Michael+Jordan&background=352872&color=fff",
    address: "123 Main St",
    
    interests: ["Basketball", "Golf"],
    job_status: "Employed",
    account_status: "Active",
    skills: ["Leadership", "Public Speaking", "Team Management"]
  },
  // More profiles
];
// Define mock currentUserProfile
const currentUserProfile = {
  job: "Software Engineer",
  skills: ["Leadership", "Coding", "AI"]
};

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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
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
  const [selectedProfile, setSelectedProfile] = useState(null); // To track the selected profile for the sidebar
  const [similarityPercentage, setSimilarityPercentage] = useState(null);


   // Define mock viewedProfile
   const viewedProfile = selectedProfile || {
    job: "Product Manager",
    skills: ["Leadership", "Public Speaking", "Team Management"]
  };

   // Function to calculate similarity (mock logic)
   const calculateSimilarity = () => {
    // Mock calculation (this is where you can add real logic)
    let similarity = 0;

    // Check if jobs are the same
    if (currentUserProfile.job === viewedProfile.job) {
      similarity += 30; // Job match percentage
    }

    // Check for skill overlap
    const commonSkills = currentUserProfile.skills.filter(skill => 
      viewedProfile.skills.includes(skill)
    );
    similarity += commonSkills.length * 20; // Add 20% per matching skill

    // Clamp similarity percentage to 100%
    return Math.min(similarity, 100);
  };

  // Handle button click
  const handleSeeSimilarity = () => {
    const similarity = calculateSimilarity();
    setSimilarityPercentage(similarity);
  };
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
  const handleProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseDetails = () => {
    setSelectedProfile(null);
  };

  return (
    <div>
      <div className="w-full max-w-8xl p-4 bg-[#e6e2eb] min-h-screen flex flex-col">
      <Header />

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
          <div className="relative p-4 bg-[#e6e2eb] min-h-screen">
      <div className="mt-16">
              {showResults ? (
                <SearchResults searchTerm={searchTerm} filters={activeFilters} />
              ) : (
                <div className="flex flex-col   min-h-full">
                  <h2 className="text-2xl font-bold text-[#352872] mb-6">People You May Know</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {suggestedProfiles.map((profile) => (
                      <div
                        key={profile.user_id}
                        className="bg-white shadow-lg rounded-3xl overflow-hidden border border-gray-300 p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                      >
                        <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
                          <img
                            src={profile.imgSrc}
                            alt={`${profile.first_name} ${profile.last_name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-[#352872] mb-2">
                          {`${profile.first_name} ${profile.last_name}`}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">{profile.email}</p>
                        <button
                          className="px-4 py-2 bg-[#352872] text-white rounded-lg text-sm hover:bg-[#5342a9] transition-all"
                          onClick={() => handleProfileDetails(profile)}
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


           {/* Detailed Profile Sidebar */}
{selectedProfile && (
  <motion.div
    className="fixed top-20 right-0 w-full sm:w-1/3 md:w-1/4 h-full bg-white shadow-lg border-l border-gray-200 p-8 flex flex-col overflow-y-auto"
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', stiffness: 50 }}
    
  >
    <button 
      onClick={handleCloseDetails}
      className="text-[#352872] text-2xl font-bold absolute top-4 right-4 hover:text-[#5342a9] transition duration-300"
    >
      &times;
    </button>
    <div className="w-full flex flex-col items-center mt-14">
      <div className="w-28 h-28 overflow-hidden rounded-full border-4 border-[#352872] mb-6">
        <img
          src={selectedProfile.imgSrc}
          alt={`${selectedProfile.first_name} ${selectedProfile.last_name} Profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-semibold text-[#352872] mb-2">{`${selectedProfile.first_name} ${selectedProfile.last_name}`}</h3>
      <p className="text-gray-700 text-sm mb-4">{selectedProfile.email}</p>
      <p className="text-gray-700 text-sm mb-3"><strong>Address:</strong> {selectedProfile.address}</p>
      
      <p className="text-gray-700 text-sm mb-3"><strong>Interests:</strong> {selectedProfile.interests.join(', ')}</p>
      <p className="text-gray-700 text-sm mb-3"><strong>Job Status:</strong> {selectedProfile.job_status}</p>
      <p className="text-gray-700 text-sm  mb-3"><strong>Skills:</strong></p>
      <ul className="list-disc pl-5 text-sm mb-4">
        {selectedProfile.skills.map((skill, index) => (
          <li key={index} className="text-gray-700">{skill}</li>
        ))}
      </ul>

      {/* See Similarity Button */}
      <button
        onClick={handleSeeSimilarity} // This function will calculate similarity
        className="mt-4 bg-gradient-to-r from-[#352872] to-[#c293dd] text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
      >
        See Similarity
      </button>

      {/* Display similarity percentage */}
      {similarityPercentage !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-lg font-semibold text-gray-700"
        >
          Similarity: {similarityPercentage}%
        </motion.div>
      )}
    </div>
  </motion.div>
)}

          
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Search;


