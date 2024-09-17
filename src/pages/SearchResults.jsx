import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

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
    profilePicture:
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
    profilePicture:
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
    profilePicture:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=ff5722&color=fff",
  },
  // Add more profiles as needed
];

const SearchResults = ({ profiles, onProfileClick }) => {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [similarityResult, setSimilarityResult] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false initially to avoid displaying loader on component load
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold the selected profile for modal
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [showSimilarityModal, setShowSimilarityModal] = useState(false);
  if (!profiles || profiles.length === 0) {
    return (
      <div className="p-4">
        <p>No results found.</p>
      </div>
    );
  }

  const handleProfileSelect = (profile) => {
    if (selectedProfiles.includes(profile)) {
      setSelectedProfiles((prev) =>
        prev.filter((p) => p.user_id !== profile.user_id)
      );
    } else if (selectedProfiles.length < 2) {
      setSelectedProfiles((prev) => [...prev, profile]);
    }

    // Call the similarity calculation when two profiles are selected
    if (selectedProfiles.length === 2) {
      handleCalculateSimilarity();
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

  // useEffect to trigger similarity calculation when exactly two profiles are selected
  const handleCalculateSimilarity = async () => {
    const [profile1, profile2] = selectedProfiles;

    // Log selected profiles
    console.log("Selected Profiles:", profile1, profile2);

    // Check if user_ids are valid
    if (!profile1.user_id || !profile2.user_id) {
      console.error("Invalid user_id values for profiles", profile1, profile2);
      return;
    }

    // Construct the URL
    const url = `${import.meta.env.VITE_API}/similar-users/${
      profile1.user_id
    }?method-type=2&partner-id=${profile2.user_id}`;

    // Log the constructed URL
    console.log("Constructed API URL:", url);

    try {
      setLoading(true);
      setError(null);

      // Make the API request
      const response = await axios.get(url);

      // Log the API response
      console.log("API Response:", response.data);

      // Check if similar users exist and update the state with the similarity result
      if (
        response.data.similar_users &&
        response.data.similar_users.length > 0
      ) {
        const similarUser = response.data.similar_users[0];
        setSimilarityResult({
          similarityPercentage: similarUser.score * 100, // Assuming score is a decimal, convert to percentage
          mostCommonInterest: similarUser.most_common_interest,
          name: similarUser.name, // Add any other useful information from the response
        });

        // Log the similarity result
        console.log("Similarity Result:", {
          similarityPercentage: similarUser.score * 100,
          mostCommonInterest: similarUser.most_common_interest,
          name: similarUser.name,
        });
      } else {
        console.error("No similar users found.");
        setError("No similar users found.");
      }
    } catch (err) {
      // Log any errors
      console.error("Error fetching similarity:", err);
      setError(err);
    } finally {
      // Log that the loading has ended
      console.log("Loading finished.");
      setLoading(false);
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
  const generateRandomColor = () => {
    const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#6366F1"]; // Example colors
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const ProfilePicture = ({ profile }) => {
    const initials = `${(profile.firstName?.[0] || "").toUpperCase()}${(
      profile.lastName?.[0] || ""
    ).toUpperCase()}`;

    return profile.profilePicture ? (
      <img
        src={profile.profilePicture}
        alt={`${profile.firstName || "No name"} ${profile.lastName || ""}`}
        className="w-full h-full object-cover"
      />
    ) : (
      <div
        className="flex items-center justify-center w-full h-full"
        style={{
          backgroundColor: generateRandomColor(),
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {initials || "NA"} {/* Show "NA" if initials are not available */}
      </div>
    );
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
          className={`text-lg mb-4 font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span
            className={`text-xl font-bold ${
              darkMode ? "text-[#c293dd]" : "text-[#352872]"
            }`}
          >
            Choose 2 profiles
          </span>{" "}
          to see how similar they are.
        </p>
        {selectedProfiles.length === 2 && (
          <button
            onClick={() => {
              handleCalculateSimilarity(); // Call your similarity calculation function
              setShowSimilarityModal(true); // Show the modal
            }}
            className={`mt-6 px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-[#9e61c1] hover:bg-[#8c4b9d]"
                : "bg-[#352872] hover:bg-[#5342a9]"
            } text-white transition duration-300`}
          >
            Calculate Similarity
          </button>
        )}

        {/* Show loading or error message if applicable */}
        {/* {loading && <p>Loading...</p>} */}
        {/* {error && <p>Error: {error.message}</p>} */}

        {!profiles.length ? (
          <p>No profiles available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4">
            {profiles.map((profile) => (
              <div
                key={profile.user_id}
                className={`bg-${
                  darkMode ? "gray-900" : "white"
                } shadow-lg rounded-3xl overflow-hidden border p-6 flex flex-col items-center text-center transition-transform transform ${
                  selectedProfiles.includes(profile)
                    ? "border-[#352872] shadow-2xl scale-105"
                    : "border-gray-300 hover:shadow-xl hover:scale-105"
                }`}
                onClick={() => handleProfileSelect(profile)}
              >
                <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
                  {/* Replace ProfilePicture component with an appropriate component */}
                  <img
                    src={
                      profile.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
                    alt={`${profile.firstName || "No name"} ${
                      profile.lastName || ""
                    }`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-[#352872]"
                    }`}
                  >
                    {profile.firstName || "No name"} {profile.lastName || ""}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {profile.email || "No email"}
                  </p>
                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className={`mt-2 px-4 py-2 rounded ${
                      darkMode
                        ? "bg-[#c293dd] hover:bg-[#a06cb5]"
                        : "bg-[#352872] hover:bg-[#5342a9]"
                    } text-white transition duration-300`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* {similarityResult && (
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
        )} */}

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
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#352872] mb-4">
                  <img
                    src={
                      selectedProfile.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
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
                  {selectedProfile.jobStatus || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Similarity Modal */}
        {showSimilarityModal && (
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
                onClick={() => setShowSimilarityModal(false)}
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="text-center">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-[#352872]"
                  }`}
                >
                  Similarity Results
                </h2>
                {similarityResult ? (
                  <>
                    <p
                      className={`text-lg mt-4 ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      Similarity: {similarityResult.similarityPercentage}%
                    </p>
                    <p
                      className={`text-lg ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      Most Common Interest:{" "}
                      {similarityResult.mostCommonInterest}
                    </p>
                  </>
                ) : (
                  <p
                    className={`text-lg ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    No similarity result available.
                  </p>
                )}
                <button
                  onClick={() => {
                    setSelectedProfiles([]);
                    setSimilarityResult(null);
                    setShowSimilarityModal(false);
                  }}
                  className={`mt-4 px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-[#9e61c1] hover:bg-[#8c4b9d]"
                      : "bg-[#352872] hover:bg-[#5342a9]"
                  } text-white transition duration-300`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
// PropTypes validation
SearchResults.propTypes = {
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  darkMode: PropTypes.bool.isRequired,
  handleProfileSelect: PropTypes.func.isRequired,
  selectedProfiles: PropTypes.array.isRequired,
  calculateSimilarity: PropTypes.func.isRequired,
  similarityResult: PropTypes.object,
  selectedProfile: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  formatInterests: PropTypes.func.isRequired,
};

export default SearchResults;
