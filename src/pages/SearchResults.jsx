// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Example profiles
// const initialProfiles = [
//   {
//     user_id: 1,
//     firstName: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     address: "123 Main St, Anytown, USA",
//     interests: ["Coding", "Music", "Travel"],
//     job_status: "Employed",
//     account_status: "Active",
//     skills: ["JavaScript", "React"],
//     imgSrc:
//       "https://ui-avatars.com/api/?name=John+Doe&background=352872&color=fff",
//   },
//   {
//     user_id: 2,
//     firstName: "Jane",
//     last_name: "Smith",
//     email: "jane.smith@example.com",
//     address: "456 Oak Rd, Sometown, USA",
//     interests: ["Reading", "Photography", "Yoga"],
//     job_status: "Freelancer",
//     account_status: "Inactive",
//     skills: ["Photoshop"],
//     imgSrc:
//       "https://ui-avatars.com/api/?name=Jane+Smith&background=34b3a0&color=fff",
//   },
//   {
//     user_id: 3,
//     firstName: "Alex",
//     last_name: "Johnson",
//     email: "alex.johnson@example.com",
//     address: "789 Pine Ave, Othercity, USA",
//     interests: ["Gaming", "Traveling", "Music"],
//     job_status: "Student",
//     account_status: "Active",
//     skills: ["AI"],
//     imgSrc:
//       "https://ui-avatars.com/api/?name=Alex+Johnson&background=ff5722&color=fff",
//   },
//   // Add more profiles as needed
// ];

// const SearchResults = ({ searchTerm, filters }) => {
//   const [profiles, setProfiles] = useState(initialProfiles);
//   const [selectedProfiles, setSelectedProfiles] = useState([]);
//   const [similarityResult, setSimilarityResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const params = {
//           Interests: filters,
//           skill: filters,
//           url: searchTerm,
//         };

//         const response = await axios.get(
//           "http://192.168.1.123:2505/profiles/search"
//         );
//         console.log(response.data);
//         setProfiles(response.data || []);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [searchTerm, filters]);

//   const handleProfileSelect = (profile) => {
//     if (selectedProfiles.includes(profile)) {
//       setSelectedProfiles((prev) =>
//         prev.filter((p) => p.user_id !== profile.user_id)
//       );
//     } else if (selectedProfiles.length < 2) {
//       setSelectedProfiles((prev) => [...prev, profile]);
//     }
//   };

//   const calculateSimilarity = (profile1, profile2) => {
//     const commonInterests = profile1.interests.filter((interest) =>
//       profile2.interests.includes(interest)
//     );
//     const commonSkills = profile1.skills.filter((skill) =>
//       profile2.skills.includes(skill)
//     );

//     const interestPercentage =
//       (commonInterests.length / profile1.interests.length) * 50;
//     const skillPercentage = (commonSkills.length / profile1.skills.length) * 50;

//     const similarityPercentage = interestPercentage + skillPercentage;

//     return {
//       similarityPercentage: Math.min(similarityPercentage, 100),
//       mostCommonInterest: commonInterests[0] || "No common interests",
//     };
//   };

//   const handleCalculateSimilarity = () => {
//     if (selectedProfiles.length === 2) {
//       const [profile1, profile2] = selectedProfiles;
//       const result = calculateSimilarity(profile1, profile2);
//       setSimilarityResult(result);
//     }
//   };

//   return (
//     <div className="relative p-4 bg-[#e6e2eb] min-h-screen">
//       <div className="mt-16">
//         <h1 className="text-4xl font-bold mb-6 text-[#352872]">
//           Search Results
//         </h1>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error.message}</p>}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {profiles.map((profile) => (
//             <div
//               key={profile.user_id}
//               className={`bg-white shadow-lg rounded-3xl overflow-hidden border border-gray-300 p-6 flex flex-col items-center text-center transition-transform transform ${
//                 selectedProfiles.includes(profile)
//                   ? "border-[#352872] scale-105"
//                   : "hover:scale-105 hover:shadow-xl"
//               }`}
//               onClick={() => handleProfileSelect(profile)}
//             >
//               <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
//                 <img
//                   src={profile.imgSrc}
//                   alt={`${profile.firstname} ${profile.lastName} Profile`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-[#352872] mb-2">{`${profile.firstName} ${profile.lastName}`}</h3>
//                 <p className="text-gray-600 mb-4 text-sm">{profile.email}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {selectedProfiles.length === 2 && (
//           <button
//             onClick={handleCalculateSimilarity}
//             className="mt-6 px-4 py-2 bg-[#352872] text-white rounded-lg hover:bg-[#5342a9] transition duration-300"
//           >
//             Calculate Similarity
//           </button>
//         )}
//         {similarityResult && (
//           <div className="mt-6">
//             <h2 className="text-2xl font-bold">
//               Similarity: {similarityResult.similarityPercentage}%
//             </h2>
//             <p className="text-lg">
//               Most Common Interest: {similarityResult.mostCommonInterest}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

const SearchResults = ({ searchTerm, filters }) => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [similarityResult, setSimilarityResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold the selected profile for modal
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          Interests: filters,
          skill: filters,
          url: searchTerm,
        };

        const response = await axios.get(
          "https://rsserviceplan-rsapp.azuremicroservices.io/users"
        );
        console.log(response.data);
        setProfiles(response.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchTerm, filters]);

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

  return (
    <div className={`relative p-4 min-h-screen ${darkMode ? "bg-gray-800 text-gray-200" : "bg-[#e6e2eb] text-[#352872]"}`}>
      <div className="mt-16">
        <h1 className={`text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-[#352872]"}`}>
          Search Results
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.user_id}
              className={`bg-${darkMode ? "gray-900" : "white"} shadow-lg rounded-3xl overflow-hidden border ${darkMode ? "border-gray-700" : "border-gray-300"} p-6 flex flex-col items-center text-center transition-transform transform ${selectedProfiles.includes(profile)
                ? "border-[#352872] scale-105"
                : "hover:scale-105 hover:shadow-xl"
                }`}
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
                <img
                  src={profile.imgSrc}
                  alt={`${profile.firstName} ${profile.lastName} Profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-[#352872]"}`}>
                  {`${profile.firstName} ${profile.lastName}`}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {profile.email}
                </p>                <button
                  onClick={() => viewDetails(profile)}
                  className={`mt-2 px-4 py-2 rounded ${darkMode ? "bg-[#c293dd] " : "bg-[#352872] hover:bg-[#352850]"} text-white transition duration-300`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProfiles.length === 2 && (
          <button
            onClick={handleCalculateSimilarity}
            className={`mt-6 px-4 py-2 rounded-lg ${darkMode ? "bg-[#9e61c1] " : "bg-[#352872] hover:bg-[#5342a9]"} text-white transition duration-300`}
          >
            Calculate Similarity
          </button>
        )}
        {similarityResult && (
          <div className="mt-6">
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#352872]"}`}>
              Similarity: {similarityResult.similarityPercentage}%
            </h2>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
              Most Common Interest: {similarityResult.mostCommonInterest}
            </p>
          </div>
        )}
        {/* Modal for displaying selected profile details */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`bg-${darkMode ? "gray-800" : "white"} rounded-lg p-6 w-96 relative`}>
              <button
                className={`absolute top-2 right-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#352872] mb-4">
                  <img
                    src={selectedProfile.image}
                    alt={`${selectedProfile.username} Profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-[#352872]"}`}>
                  {selectedProfile.firstName} {selectedProfile.lastName}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedProfile.email}
                </p>                  <div className="text-left w-full">
                    <p>
                      <strong>Address:</strong> {selectedProfile.address || "N/A"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {selectedProfile.gender || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedProfile.phone || "N/A"}
                    </p>
                    <p>
                      <strong>email</strong> {selectedProfile.email}
                    </p>
                  </div>
                  <button
                    className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-[#352872] hover:bg-[#5342a9]"} text-white transition duration-300`}
                    onClick={closeModal}
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

export default SearchResults;

// {/* Detailed Profile Information */}
// {selectedProfile && (
//   <div className="mt-8 p-6 bg-white shadow-lg rounded-3xl border border-gray-300">
//     <h2 className="text-2xl font-bold text-[#352872] mb-4">Profile Details</h2>
//     <div className="flex items-center mb-4">
//       <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#352872]">
//         <img
//           src={selectedProfile.imgSrc}
//           alt={`${selectedProfile.firstName} ${selectedProfile.lastName} Profile`}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="ml-4">
//         <h3 className="text-2xl font-semibold text-[#352872]">
//           {`${selectedProfile.firstName} ${selectedProfile.lastName}`}
//         </h3>
//         <p className="text-gray-600">{selectedProfile.email}</p>
//       </div>
//     </div>
//     <div className="text-gray-800">
//       <p><strong>Address:</strong> {selectedProfile.address}</p>
//       <p><strong>JobStatus:</strong> {selectedProfile.job_status}</p>
//       <p><strong>Account Status:</strong> {selectedProfile.account_status}</p>
//       <p><strong>Interests:</strong> {selectedProfile.interests.join(', ')}</p>
//       <p><strong>Skills:</strong> {selectedProfile.skills.join(', ')}</p>
//     </div>
//     <button
//       onClick={() => setSelectedProfile(null)}
//       className="mt-4 px-4 py-2 bg-[#352872] text-white rounded hover:bg-[#352850] transition duration-300"
//     >
//       Close
//     </button>
//   </div>
