import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";


const initialProfiles = [
  {
    user_id: 1,
    firstName: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    interests: ["Coding", "Music", "Travel"],
    job_status: "Employed",
    account_status: "Active",
    skills: ["JavaScript", "React"],
    imgSrc:
      "https://ui-avatars.com/api/?name=John+Doe&background=352872&color=fff",
  },
  {
    user_id: 2,
    firstName: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    address: "456 Oak Rd, Sometown, USA",
    interests: ["Reading", "Photography", "Yoga"],
    job_status: "Freelancer",
    account_status: "Inactive",
    skills: ["Photoshop"],
    imgSrc:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=34b3a0&color=fff",
  },
  {
    user_id: 3,
    firstName: "Alex",
    last_name: "Johnson",
    email: "alex.johnson@example.com",
    address: "789 Pine Ave, Othercity, USA",
    interests: ["Gaming", "Traveling", "Music"],
    job_status: "Student",
    account_status: "Active",
    skills: ["AI"],
    imgSrc:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=ff5722&color=fff",
  },
  // Add more profiles as needed
];

<<<<<<< HEAD
const SearchResults = ({ interests, skills }) => {
  const [profiles, setProfiles] = useState(initialProfiles);
=======
const SearchResults = ({ profiles, onProfileClick }) => {
>>>>>>> 700ce94306b2be8a5390c723b66de3cd481838f7
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [similarityResult, setSimilarityResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold the selected profile for modal
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

<<<<<<< HEAD
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        
        console.log(interests)
        console.log(skills)

      // Construct the URL with query parameters for interests and skills
      const url = `${import.meta.env.VITE_API}/profiles/search`

      // Fetch the filtered profiles
      const response = await fetch(url, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            skills: skills,
            interests: interests
          }),
        }
      );
      const data = await response.json();
      setProfiles(data || []);
      console.log(data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [interests, skills]);

  //   useEffect(() => {
  //     const fetchProfiles = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);

  //         const { interests, skills } = filters;

  //         // Construct the search URL based on interests and skills
  //         const url = `http://192.168.1.123:2505/profiles/search?interests=${interests}&skills=${skills}`;

  //         // Make the API request
  //         const response = await axios.get(url);

  //         console.log(response.data);

  //         // Set profiles based on the response data
  //         setProfiles(response.data || []);
  //       } catch (err) {
  //         setError(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     // Trigger the profile fetching only when filters change or searchTerm is updated
  //     fetchProfiles();
  //   }, [searchTerm, filters]);
=======
  if (!profiles || profiles.length === 0) {
    return (
      <div className="p-4">
        <p>No results found.</p>
      </div>
    );
  }
>>>>>>> 700ce94306b2be8a5390c723b66de3cd481838f7

  const handleProfileSelect = (profile) => {
    if (selectedProfiles.includes(profile)) {
      setSelectedProfiles((prev) =>
        prev.filter((p) => p.user_id !== profile.user_id)
      );
    } else if (selectedProfiles.length < 2) {
      setSelectedProfiles((prev) => [...prev, profile]);
    }
  };

  const calculateSimilarity = (profile1, profile2) => {
    const commonInterests = profile1.interests.filter((interest) =>
      profile2.interests.includes(interest)
    );
    const commonSkills = profile1.skills.filter((skill) =>
      profile2.skills.includes(skill)
    );

    const interestPercentage =
      (commonInterests.length / profile1.interests.length) * 50;
    const skillPercentage = (commonSkills.length / profile1.skills.length) * 50;

    const similarityPercentage = interestPercentage + skillPercentage;

    return {
      similarityPercentage: Math.min(similarityPercentage, 100),
      mostCommonInterest: commonInterests[0] || "No common interests",
    };
  };

  const handleCalculateSimilarity = async () => {
    if (selectedProfiles.length === 2) {
      const [profile1, profile2] = selectedProfiles;

      // Check if user_ids are valid
      if (!profile1.user_id || !profile2.user_id) {
        console.error("Invalid user_id values");
        return;
      }

      // Construct the URL
      const url = `http://192.168.1.136:8089/similar-users/${profile1.user_id}?method-type=1&partner-id=${profile2.user_id}`;

      try {
        setLoading(true);
        setError(null);

        // Make the API request
        const response = await axios.get(url);
        console.log(response.data);

        // Update the state with the similarity result
        setSimilarityResult({
          similarityPercentage: response.data.similarityScore, // Adjust based on actual response format
          mostCommonInterest: response.data.mostCommonInterest, // Adjust based on actual response format
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const viewDetails = (profile) => {
    // Handle showing detailed profile information here
    console.log("Viewing details for:", profile);
    // You might want to show a modal or navigate to a details page
    setSelectedProfile(profile); // Open the modal with the selected profile
  };
  const closeModal = () => {
    setSelectedProfile(null); // Close the modal
  };
  const formatInterests = (interests) => {
    return interests
      .map((interestObj) => {
        const [interest, score] = Object.entries(interestObj)[0];
        return `${interest} `;
      })
      .join(", ");
  };
  return (
    <div
      className={`relative p-4 min-h-screen ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-[#e6e2eb] text-[#352872]"
      }`}
    >
      <div className="mt-16">
        <h1
          className={`text-4xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-[#352872]"
          }`}
        >
          Search Results
        </h1>
        <p
          className={`text-lg mb-4 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Choose 2 profiles to see how similar they are.
        </p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.user_id}
              className={`bg-${
                darkMode ? "gray-900" : "white"
              } shadow-lg rounded-3xl overflow-hidden border ${
                darkMode ? "border-gray-700" : "border-gray-300"
              } p-6 flex flex-col items-center text-center transition-transform transform ${
                selectedProfiles.includes(profile)
                  ? "border-[#352872] scale-105"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
                <img
                  src={profile.imgSrc || ""} // Handle missing profilePicture
                  alt={`${profile.firstName || "No name"} ${
                    profile.lastName || ""
                  }`} // Handle missing firstName or lastName
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-[#352872]"
                  }`}
                >
                  {`${profile.firstName || "No name"} ${
                    profile.lastName || ""
                  }`}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {profile.email || "No email"}
                </p>
                <button
                  onClick={() => viewDetails(profile)}
                  className={`mt-2 px-4 py-2 rounded ${
                    darkMode
                      ? "bg-[#c293dd] "
                      : "bg-[#352872] hover:bg-[#352850]"
                  } text-white transition duration-300`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProfiles.length === 2 && (
          <button
            onClick={calculateSimilarity}
            className={`mt-6 px-4 py-2 rounded-lg ${
              darkMode ? "bg-[#9e61c1]" : "bg-[#352872] hover:bg-[#5342a9]"
            } text-white transition duration-300`}
          >
            Calculate Similarity
          </button>
        )}

        {similarityResult && (
          <div className="mt-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-[#352872]"
              }`}
            >
              Similarity: {similarityResult.similarityPercentage}%
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Most Common Interest: {similarityResult.mostCommonInterest}
            </p>
          </div>
        )}

        {/* Modal for displaying selected profile details */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
              className={`bg-${
                darkMode ? "gray-800" : "white"
              } rounded-lg p-6 w-96 relative`}
            >
              <button
                className={`absolute top-2 right-2 ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#352872] mb-4">
                  <img
                    src={selectedProfile.imgSrc || ""} // Ensure you have the correct property name
                    alt={`${selectedProfile.firstName || "No name"} ${
                      selectedProfile.lastName || ""
                    }`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-[#352872]"
                  }`}
                >
                  {selectedProfile.firstName || "No name"}{" "}
                  {selectedProfile.lastName || ""}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <strong>Email:</strong> {selectedProfile.email || "N/A"}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <strong>Address:</strong> {selectedProfile.address || "N/A"}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <strong>Skills:</strong> {selectedProfile.skills.join(", ")}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <strong>Interests:</strong>{" "}
                  {formatInterests(selectedProfile.interests)}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <strong>Job Status:</strong>{" "}
                  {selectedProfile.job_status || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// PropTypes validation
SearchResults.propTypes = {
 
    skills: PropTypes.arrayOf(PropTypes.string).isRequired, // Filters should have an array of strings for skills
    interests: PropTypes.arrayOf(PropTypes.string).isRequired, // Filters should have an array of strings for interests
   // Mark filters as required
};

export default SearchResults;
