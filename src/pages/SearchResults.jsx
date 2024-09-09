import { useState } from 'react';
import { motion } from 'framer-motion';

// Example profiles
const profiles = [
  {
    user_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    
    address: "123 Main St, Anytown, USA",
    
    interests: ["Coding", "Music", "Travel"],
    job_status: "Employed",
    account_status: "Active",
    skills: ["JavaScript", "React"],
    imgSrc: "https://ui-avatars.com/api/?name=John+Doe&background=352872&color=fff"
  },
  {
    user_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    
    address: "456 Oak Rd, Sometown, USA",
    
    interests: ["Reading", "Photography", "Yoga"],
    job_status: "Freelancer",
    account_status: "Inactive",
    skills: ["Photoshop"],
    imgSrc: "https://ui-avatars.com/api/?name=Jane+Smith&background=34b3a0&color=fff"
  },
  {
    user_id: 3,
    first_name: "Alex",
    last_name: "Johnson",
    email: "alex.johnson@example.com",
    
    address: "789 Pine Ave, Othercity, USA",
    
    interests: ["Gaming", "Traveling", "Music"],
    job_status: "Student",
    account_status: "Active",
    skills: [ "AI"],
    imgSrc: "https://ui-avatars.com/api/?name=Alex+Johnson&background=ff5722&color=fff"
  },
  // Add more profiles as needed
];

const headerHeight = 60; // Adjust this value based on your header's height

const SearchResults = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [similarityPercentage, setSimilarityPercentage] = useState(null);

  const handleOpenDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseDetails = () => {
    setSelectedProfile(null);
  };

  // Define mock currentUserProfile
const currentUserProfile = {
  job: "Software Engineer",
  skills: ["Leadership", "Coding", "AI"]
};// Define mock viewedProfile
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


  return (
    <div className="relative p-4 bg-[#e6e2eb] min-h-screen">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-6 text-[#352872]">Search Results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.user_id}  // Use user_id
              className="bg-white shadow-lg rounded-3xl overflow-hidden border border-gray-300 p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Profile Picture */}
              <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
                <img
                  src={profile.imgSrc}
                  alt={`${profile.first_name} ${profile.last_name} Profile`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#352872] mb-2">{`${profile.first_name} ${profile.last_name}`}</h3>
                <p className="text-gray-600 mb-4 text-sm">{profile.email}</p>
                <button 
                  onClick={() => handleOpenDetails(profile)}
                  className="px-4 py-2 bg-[#352872] text-white rounded-lg hover:bg-[#5342a9] transition duration-300 text-sm font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
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
      
      <p className="text-gray-700 text-sm mb-3"><strong>Date of Birth:</strong> {new Date(selectedProfile.birth_date).toLocaleDateString()}</p>
      <p className="text-gray-700 text-sm mb-3"><strong>Interests:</strong> {selectedProfile.interests.join(', ')}</p>
      <p className="text-gray-700 text-sm mb-3"><strong>Job Status:</strong> {selectedProfile.job_status}</p>
      <p className="text-gray-700 text-sm mb-3"><strong>Skills:</strong></p>
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
    </div>
  );
};

export default SearchResults;


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// const headerHeight = 60; // Adjust this value based on your header's height

// const SearchResults = ({ searchTerm, filters }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null);
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

//         const response = await axios.get('/api/profiles/search', { params });
//         setProfiles(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [searchTerm, filters]);

//   const fetchProfileDetails = async (profileId) => {
//     try {
//       const response = await axios.get(`/api/profiles/${profileId}`);
//       setSelectedProfile(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const handleOpenDetails = async (profileId) => {
//     await fetchProfileDetails(profileId);
//   };

//   const handleCloseDetails = () => {
//     setSelectedProfile(null);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="relative p-4 bg-[#e6e2eb] min-h-screen">
//       <div className="mt-16">
//         <h1 className="text-4xl font-bold mb-6 text-[#352872]">Search Results</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {profiles.length ? (
//             profiles.map((profile) => (
//               <div
//                 key={profile.user_id}
//                 className="bg-white shadow-lg rounded-3xl overflow-hidden border border-gray-300 p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
//               >
//                 <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-[#352872] mb-4">
//                   <img
//                     src={profile.imgSrc}
//                     alt={`${profile.first_name} ${profile.last_name} Profile`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-[#352872] mb-2">{`${profile.first_name} ${profile.last_name}`}</h3>
//                   <p className="text-gray-600 mb-4 text-sm">{profile.email}</p>
//                   <button 
//                     onClick={() => handleOpenDetails(profile.user_id)}
//                     className="px-4 py-2 bg-[#352872] text-white rounded-lg hover:bg-[#5342a9] transition duration-300 text-sm font-semibold"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="flex flex-col items-center justify-center min-h-full">
//               <h2 className="text-2xl font-bold text-[#352872]">No profiles found</h2>
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedProfile && (
//         <motion.div
//           className="fixed top-0 right-0 w-full sm:w-1/3 md:w-1/4 h-full bg-white shadow-lg border-l border-gray-200 p-8 flex flex-col overflow-y-auto"
//           initial={{ x: '100%' }}
//           animate={{ x: 0 }}
//           exit={{ x: '100%' }}
//           transition={{ type: 'spring', stiffness: 50 }}
//           style={{ top: `${headerHeight}px` }} // Adjusting top position
//         >
//           <button 
//             onClick={handleCloseDetails}
//             className="text-[#352872] text-2xl font-bold absolute top-4 right-4 hover:text-[#5342a9] transition duration-300"
//           >
//             &times;
//           </button>
//           <div className="w-full flex flex-col items-center mt-14">
//             <div className="w-28 h-28 overflow-hidden rounded-full border-4 border-[#352872] mb-6">
//               <img
//                 src={selectedProfile.imgSrc}
//                 alt={`${selectedProfile.first_name} ${selectedProfile.last_name} Profile`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="text-2xl font-semibold text-[#352872] mb-2">{`${selectedProfile.first_name} ${selectedProfile.last_name}`}</h3>
//             <p className="text-gray-700 mb-4 text-m">{selectedProfile.email}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Address:</strong> {selectedProfile.address}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Gender:</strong> {selectedProfile.gender}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Date of Birth:</strong> {new Date(selectedProfile.birth_date).toLocaleDateString()}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Interests:</strong> {selectedProfile.interests.join(', ')}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Job Status:</strong> {selectedProfile.job_status}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Account Status:</strong> {selectedProfile.account_status}</p>
//             <p className="text-gray-700 mb-3 text-m"><strong>Skills:</strong></p>
//             <ul className="list-disc pl-5 mb-4">
//               {selectedProfile.skills.map((skill, index) => (
//                 <li key={index} className="text-gray-700">{skill}</li>
//               ))}
//             </ul>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// SearchResults.propTypes = {
//   searchTerm: PropTypes.string.isRequired,
//   filters: PropTypes.array.isRequired,
// };

// export default SearchResults;
