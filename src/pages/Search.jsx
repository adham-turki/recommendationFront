// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { FaGlobe, FaBriefcase, FaSearch } from "react-icons/fa";
// import Header from "./Header";
// import Footer from "./Footer";
// import { motion } from "framer-motion";
// import SearchResults from "./SearchResults";

// const FilterCard = ({ title, icon, options, onFilterChange, reset }) => {
//   const [selectedOptions, setSelectedOptions] = React.useState([]);
//   const [isOpen, setIsOpen] = React.useState(true);

//   React.useEffect(() => {
//     if (reset) {
//       setSelectedOptions([]);
//     }
//   }, [reset]);

//   const handleToggle = (option) => {
//     const updatedOptions = selectedOptions.includes(option)
//       ? selectedOptions.filter((item) => item !== option)
//       : [...selectedOptions, option];
//     setSelectedOptions(updatedOptions);
//     onFilterChange(updatedOptions);
//   };

//   return (
//     <div className="w-full bg-[#e6e2eb] backdrop-blur-lg p-3 rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105">
//       <div
//         className="flex items-center gap-2 text-[#352872] cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="text-xl">{icon}</div>
//         <h2 className="text-sm font-semibold">{title}</h2>
//         <div
//           className={`ml-auto transition-transform duration-200 ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           <FaSearch />
//         </div>
//       </div>
//       {isOpen && (
//         <div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={() => handleToggle(option)}
//                 className={`cursor-pointer py-1 px-1 rounded-lg text-xs border transition duration-200 text-center ${
//                   selectedOptions.includes(option)
//                     ? "bg-gradient-to-r from-[#352872] to-[#5342a9] text-white shadow-md"
//                     : "bg-white text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// FilterCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.element.isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onFilterChange: PropTypes.func.isRequired,
//   reset: PropTypes.bool.isRequired,
// };

// const Search = () => {
//   const [activeFilters, setActiveFilters] = React.useState([]);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [showResults, setShowResults] = React.useState(false);
//   const [resetFilters, setResetFilters] = React.useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [similarityPercentage, setSimilarityPercentage] = useState(null);
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Define mock currentUserProfile
//   const currentUserProfile = {
//     job: "Software Engineer",
//     skills: ["Leadership", "Coding", "AI"],
//   };

//   // Define fallback data
//   const fallbackProfiles = [
//     { id: 1, name: "John Doe", jobTitle: "Software Engineer" },
//     { id: 2, name: "Jane Smith", jobTitle: "Product Manager" },
//     { id: 3, name: "Emily Johnson", jobTitle: "UX Designer" },
//   ];

//   // Function to calculate similarity (mock logic)
//   const calculateSimilarity = () => {
//     let similarity = 0;

//     if (currentUserProfile.job === viewedProfile.job) {
//       similarity += 30;
//     }

//     const commonSkills = currentUserProfile.skills.filter((skill) =>
//       viewedProfile.skills.includes(skill)
//     );
//     similarity += commonSkills.length * 20;

//     return Math.min(similarity, 100);
//   };

//   const handleSeeSimilarity = () => {
//     const similarity = calculateSimilarity();
//     setSimilarityPercentage(similarity);
//   };

//   const handleFilterChange = (filters) => {
//     setActiveFilters(filters);
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Replace with your actual API request
//       const response = await fetch("http://192.168.1.123:2505/profiles/search");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setProfiles(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setProfiles(fallbackProfiles); // Use fallback data if fetch fails
//       setError("Failed to fetch profiles, showing fallback data.");
//     } finally {
//       setLoading(false);
//       setShowResults(true);
//     }
//   };

//   const clearAllFilters = () => {
//     setActiveFilters([]);
//     setSearchTerm("");
//     setShowResults(false);
//     setResetFilters(true);
//     setTimeout(() => setResetFilters(false), 0);
//   };

//   const handleProfileDetails = (profile) => {
//     setSelectedProfile(profile);
//   };

//   const handleCloseDetails = () => {
//     setSelectedProfile(null);
//   };

//   const viewedProfile = selectedProfile || {
//     job: "Product Manager",
//     skills: ["Leadership", "Public Speaking", "Team Management"],
//   };

//   return (
//     <div>
//       <div className="w-full max-w-8xl p-4 bg-[#e6e2eb] min-h-screen flex flex-col">
//         <Header />

//         <main className="relative flex flex-1 bg-[#e6e2eb]">
//           {/* Sidebar */}
//           <div className="w-1/4 p-6 bg-white backdrop-blur-lg shadow-lg rounded-xl min-h-screen sticky top-0 overflow-y-auto mt-20 mb-8">
//             <div className="w-full max-w-md p-4 bg-[#e6e2eb] rounded-xl shadow-lg transition hover:shadow-2xl hover:scale-105">
//               <h1 className="text-lg font-extrabold mb-3 text-[#352872]">
//                 Search
//               </h1>
//               <div className="relative mb-4">
//                 <input
//                   type="text"
//                   placeholder="Search for people"
//                   className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#352872]/50 transition-shadow"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <FaSearch className="absolute right-3 top-3 text-[#352872]" />
//               </div>
//               <button
//                 className="w-full py-2 bg-gradient-to-r from-[#352872] to-[#c293dd] text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm hover:scale-105"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>
//             </div>

//             {/* Filters Section */}
//             <div className="mt-6">
//               <h1 className="text-lg font-bold mb-3 text-[#352872]">Filters</h1>
//               <FilterCard
//                 title="Skills"
//                 icon={<FaBriefcase />}
//                 options={[
//                   "Coding",
//                   "Design",
//                   "Database",
//                   "Management",
//                   "Mobile",
//                   "Networking",
//                   "DevOps",
//                   "AI",
//                   "Cloud",
//                   "Security",
//                   "Debugging",
//                   "Business",
//                   "Music",
//                   "Writing",
//                   "Marketing",
//                   "Languages",
//                   "Engineering",
//                   "Travel",
//                 ]}
//                 onFilterChange={handleFilterChange}
//                 reset={resetFilters}
//               />
//               <FilterCard
//                 title="Interest"
//                 icon={<FaGlobe />}
//                 options={[
//                   "Music",
//                   "Movies",
//                   "Books",
//                   "Tech",
//                   "Travel",
//                   "Fitness",
//                   "Gaming",
//                   "Photography",
//                   "Art",
//                   "Cooking",
//                   "Fashion",
//                   "Science",
//                   "Health",
//                   "Nature",
//                   "Business",
//                   "animal",
//                 ]}
//                 onFilterChange={handleFilterChange}
//                 reset={resetFilters}
//               />

//               {activeFilters.length > 0 && (
//                 <div className="mt-4">
//                   <button
//                     className="w-full py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm"
//                     onClick={clearAllFilters}
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="relative p-4 bg-[#e6e2eb] min-h-screen">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#352872]"></div>
//               </div>
//             ) : error ? (
//               <div className="text-center text-red-500">
//                 <p>{error}</p>
//               </div>
//             ) : showResults ? (
//               <SearchResults
//                 profiles={profiles}
//                 onProfileClick={handleProfileDetails}
//                 onSeeSimilarity={handleSeeSimilarity}
//                 similarityPercentage={similarityPercentage}
//                 currentProfile={currentUserProfile}
//                 viewedProfile={viewedProfile}
//               />
//             ) : (
//               <p className="text-center text-[#352872]">
//                 Search for profiles to see results.
//               </p>
//             )}
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaGlobe, FaBriefcase, FaSearch } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import SearchResults from "./SearchResults";
import PeopleYouMayKnowSection from "./PeopleYouMayKnowSection";

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
      <div
        className="flex items-center gap-2 text-[#352872] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-xl">{icon}</div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <div
          className={`ml-auto transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
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
                    ? "bg-gradient-to-r from-[#352872] to-[#5342a9] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-300"
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
  reset: PropTypes.bool.isRequired,
};

const Search = () => {
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [resetFilters, setResetFilters] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [similarityPercentage, setSimilarityPercentage] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define fallback data
  const fallbackProfiles = [
    { id: 1, name: "John Doe", jobTitle: "Software Engineer" },
    { id: 2, name: "Jane Smith", jobTitle: "Product Manager" },
    { id: 3, name: "Emily Johnson", jobTitle: "UX Designer" },
  ];

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API request for search results
      const response = await fetch(
        "https://rsserviceplan-rsapp.azuremicroservices.io/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setProfiles(fallbackProfiles); // Use fallback data if fetch fails
      setError("Failed to fetch profiles, showing fallback data.");
    } finally {
      setLoading(false);
      setShowResults(true);
    }
  };
  // const handleSearch = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Create the query parameters based on the active filters
  //     const interests = activeFilters.includes("Interest") ? activeFilters.filter(f => f !== "Skills").join(",") : "";
  //     const skills = activeFilters.includes("Skills") ? activeFilters.filter(f => f !== "Interest").join(",") : "";

  //     // Construct the URL with query parameters for interests and skills
  //     const url = `http://192.168.1.123:2505/profiles/search?interests=${interests}&skills=${skills}`;

  //     // Fetch the filtered profiles
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setProfiles(data);
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     setProfiles(fallbackProfiles); // Use fallback data if fetch fails
  //     setError("Failed to fetch profiles, showing fallback data.");
  //   } finally {
  //     setLoading(false);
  //     setShowResults(true);
  //   }
  // };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setShowResults(false);
    setResetFilters(true);
    setTimeout(() => setResetFilters(false), 0);
  };

  const handleProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div>
      <div className="w-full max-w-8xl p-4 bg-[#e6e2eb] min-h-screen flex flex-col">
        <Header />

        <main className="relative flex flex-1 bg-[#e6e2eb]">
          {/* Sidebar */}
          <div className="lg:w-1/4 w-full p-6 bg-white backdrop-blur-lg shadow-lg rounded-xl lg:min-h-screen lg:sticky lg:top-0 overflow-y-auto mt-20 mb-8">
            <div className="w-full max-w-md p-4 bg-[#e6e2eb] rounded-xl shadow-lg transition hover:shadow-2xl hover:scale-105">
              <h1 className="text-lg font-extrabold mb-3 text-[#352872]">
                Search
              </h1>
              <div className="relative mb-4">
                {/* <input
                  type="text"
                  placeholder="Search for people"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#352872]/50 transition-shadow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
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
              <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#352872]">
                Filters
              </h1>

              <FilterCard
                title="Skills"
                icon={<FaBriefcase />}
                options={[
                  "Coding",
                  "Design",
                  "Database",
                  "Management",
                  "Mobile",
                  "Networking",
                  "DevOps",
                  "AI",
                  "Cloud",
                  "Security",
                  "Debugging",
                  "Business",
                  "Music",
                  "Writing",
                  "Marketing",
                  "Languages",
                  "Engineering",
                  "Travel",
                ]}
                onFilterChange={handleFilterChange}
                reset={resetFilters}
              />
              <FilterCard
                title="Interest"
                icon={<FaGlobe />}
                options={[
                  "Music",
                  "Movies",
                  "Books",
                  "Tech",
                  "Travel",
                  "Fitness",
                  "Gaming",
                  "Photography",
                  "Art",
                  "Cooking",
                  "Fashion",
                  "Science",
                  "Health",
                  "Nature",
                  "Business",
                  "Animal",
                ]}
                onFilterChange={handleFilterChange}
                reset={resetFilters}
              />
              <button
                className="w-full py-2 mt-4 bg-[#c293dd] text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm hover:scale-105"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 min-h-screen">
            <PeopleYouMayKnowSection />

            {/* Search Results Section */}
            {showResults && (
              <SearchResults
                profiles={profiles}
                onProfileClick={handleProfileDetails}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Search;
