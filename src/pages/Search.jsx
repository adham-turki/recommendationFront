import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaGlobe, FaBriefcase, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import SearchResults from "./SearchResults";
import PeopleYouMayKnowSection from "./PeopleYouMayKnowSection";
import { useSelector } from "react-redux";

const FilterCard = ({ title, icon, options, onFilterChange, reset }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

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
    <div
      className={`w-full p-3 rounded-lg shadow-lg border transition-transform duration-300 hover:scale-105 ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-300"
          : "bg-[#e6e2eb] border-gray-200 text-gray-900"
      }`}
    >
      {" "}
      <div
        className={`flex items-center gap-2 ${
          darkMode ? "text-[#a695f4]" : "text-[#352872]"
        }  cursor-pointer`}
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
                    ? "bg-gradient-to-r from-[#352872] to-[#352899] text-white shadow-md"
                    : `${
                        darkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-300"
                      }`
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
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [interest, setInterest] = useState("");
  const [skills, setSkills] = useState("");
  const [showPeopleYouMayKnow, setShowPeopleYouMayKnow] = useState(true); // Add this state

  // Define fallback data
  const fallbackProfiles = [
    { id: 1, name: "John Doe", jobTitle: "Software Engineer" },
    { id: 2, name: "Jane Smith", jobTitle: "Product Manager" },
    { id: 3, name: "Emily Johnson", jobTitle: "UX Designer" },
  ];

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // const handleSearch = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // Construct the URL for the search API
  //     const url = `https://rsserviceplan-rsapp.azuremicroservices.io/profiles/search`;

  //     // Fetch the filtered profiles
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         interests: activeFilters.filter((filter) =>
  //           // Check if the filter is included in the interests (replace with actual interests array)
  //           [
  //             "Music",
  //             "Movies",
  //             "Books",
  //             "Tech",
  //             "Travel",
  //             "Fitness",
  //             "Gaming",
  //             "Photography",
  //             "Art",
  //             "Cooking",
  //             "Fashion",
  //             "Science",
  //             "Health",
  //             "Nature",
  //             "Business",
  //             "Animal",
  //             "Sport",
  //           ].includes(filter)
  //         ),
  //         skills: activeFilters.filter((filter) =>
  //           // Check if the filter is included in the skills (replace with actual skills array)
  //           [
  //             "Coding",
  //             "Design",
  //             "Database",
  //             "Management",
  //             "Mobile",
  //             "Networking",
  //             "DevOps",
  //             "AI",
  //             "Cloud",
  //             "Security",
  //             "Debugging",
  //             "Business",
  //             "Music",
  //             "Writing",
  //             "Marketing",
  //             "Languages",
  //             "Engineering",
  //             "Travel",
  //           ].includes(filter)
  //         ),
  //       }),
  //     });

  //     console.log("Response Status:", response.status); // Log the status code

  //     if (!response.ok) {
  //       const errorText = await response.text(); // Read the response text
  //       console.error("Error Response:", errorText); // Log the error response
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Response Data:", data); // Log the response data
  //     setProfiles(data); // Update the profiles state with the search result
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     setProfiles(fallbackProfiles); // Use fallback data if fetch fails
  //     setError("Failed to fetch profiles, showing fallback data.");
  //   } finally {
  //     setLoading(false);
  //     setShowResults(true);
  //   }
  // };
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construct the URL for the search API
      const url = `https://rsserviceplan-rsapp.azuremicroservices.io/profiles/search`;

      // Log activeFilters to verify its content
      console.log("Active Filters:", activeFilters);

      // Construct the request payload
      const requestPayload = {
        interests: activeFilters.filter((filter) =>
          [
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
            "Sport",
          ].includes(filter)
        ),
        skills: activeFilters.filter((filter) =>
          [
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
          ].includes(filter)
        ),
      };

      // Log the request payload for debugging
      console.log("Request Payload:", JSON.stringify(requestPayload));

      // Fetch the filtered profiles
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestPayload),
      });

      console.log("Response Status:", response.status); // Log the status code

      if (!response.ok) {
        const errorText = await response.text(); // Read the response text
        console.error("Error Response:", errorText); // Log the error response
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response Data:", data); // Log the response data
      setProfiles(data); // Update the profiles state with the search result
    } catch (err) {
      console.error("Fetch error:", err);
      setProfiles(fallbackProfiles); // Use fallback data if fetch fails
      setError("Failed to fetch profiles, showing fallback data.");
    } finally {
      setLoading(false);
      setShowResults(true);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setShowResults(false);
    setResetFilters(true);
    setTimeout(() => setResetFilters(false), 0);
    setShowPeopleYouMayKnow(true); // Show the PeopleYouMayKnowSection
  };

  const handleProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-800 text-white" : "bg-[#e6e2eb]"
        }`}
      >
        <main
          className={`relative flex flex-1 ${
            darkMode ? "bg-gray-800 text-white  " : "bg-[#e6e2eb]"
          }`}
        >
          {/* Sidebar */}
          <div
            className={`lg:w-1/4 w-full p-6 shadow-lg  lg:min-h-screen lg:sticky lg:top-0 overflow-y-auto mt-20 mb-8 ${
              darkMode ? "bg-gray-900 text-gray-300 " : "bg-white text-gray-900"
            }`}
          >
            <div
              className={`w-full max-w-md p-4 rounded-xl shadow-lg transition hover:shadow-2xl hover:scale-105 ${
                darkMode
                  ? "bg-gray-900 text-gray-300"
                  : "bg-[#e6e2eb] text-[#352872]"
              }`}
            >
              <h1
                className={`text-lg font-extrabold mb-3 ${
                  darkMode ? "text-[#a695f4]" : "text-[#352872]"
                }`}
              >
                Search
              </h1>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for people"
                  className={`w-full px-4 py-2 rounded-lg border text-sm transition-shadow focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
                      : "bg-white border-gray-300 text-black focus:ring-[#352872]/50"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch
                  className={`absolute right-3 top-3 ${
                    darkMode ? "text-gray-400" : "text-[#352872]"
                  }`}
                />
              </div>
              <button
                className={`w-full py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none transition-all duration-300 text-sm hover:scale-105 bg-gradient-to-r from-[#352872] to-[#c293dd] hover:shadow-lg`}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Filters Section */}
            <div className="mt-6">
              <h1
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  darkMode ? "text-[#a695f4]" : "text-[#352872]"
                }`}
              >
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
                  "Sport",
                ]}
                onFilterChange={handleFilterChange}
                reset={resetFilters}
              />
              <button
                className="w-full py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 text-sm hover:scale-105"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 p-6">
            {showResults && (
              <div>
                <SearchResults profiles={profiles} />
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
              </div>
            )}
            {!showResults && showPeopleYouMayKnow && (
              <PeopleYouMayKnowSection />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;