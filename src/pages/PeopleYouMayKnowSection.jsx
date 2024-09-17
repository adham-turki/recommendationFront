

// export default PeopleYouMayKnowSection;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const PeopleYouMayKnowSection = () => {
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchPeopleYouMayKnow = async () => {
      setLoading(true);
      try {
        if(user){
        const response = await fetch(
          `${
            import.meta.env.VITE_API
          }/similar-users/${user.user_id}?method-type=1&partner-id=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data && data.similar_users) {
          setPeopleYouMayKnow(data.similar_users);
        } else {
          console.error("Unexpected data structure:", data);
        }
      }
      } catch (err) {
        console.error("Error fetching 'People You May Know':", err);
        setError("Failed to fetch data, showing fallback.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeopleYouMayKnow();
  }, [user]);

  const formatInterests = (interests) => {
    if (!interests || Object.keys(interests).length === 0) {
      return "N/A";
    }

    return Object.values(interests)
      .map((interestObj) => Object.keys(interestObj)[0])
      .join(", ");
  };

  const viewDetails = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/user/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userDetails = await response.json();

      const formattedDetails = {
        firstName: userDetails.firstName || "N/A",
        lastName: userDetails.lastName || "N/A",
        email: userDetails.email || "N/A",
        phone: userDetails.phone_number || "N/A",
        address: userDetails.address || "N/A",
        gender: userDetails.gender || "N/A",
        birthDate: userDetails.birthDate || "N/A",
        profilePicture:
          userDetails.profilePicture || "https://via.placeholder.com/150",
        jobStatus: userDetails.jobStatus || "N/A",
        skills: userDetails.skills
          ? Object.values(userDetails.skills).join(", ")
          : "N/A",
        interests: userDetails.interests
          ? formatInterests(userDetails.interests)
          : "N/A",
      };

      setSelectedUser(formattedDetails);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <>
      <section className="mb-8 pt-20">
        <h1 className="text-3xl font-bold mb-4 text-[#352872]">
          People You are similar with
        </h1>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && peopleYouMayKnow.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {peopleYouMayKnow.map((profile) => profile.user_id != user.user_id &&( 
              
              <motion.div
                key={profile.user_id}
                className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-24 h-24 overflow-hidden text-white text-lg rounded-full border-4 bg-[#a295da] border-[#352872] mb-4 flex items-center justify-center">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt={`${profile.name || "No name"}`}
                      className="w-16 h-16 rounded-full object-cover "
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {getInitials(profile.name)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Similarity: {(profile.score * 100).toFixed(2)}%
                  </p>
                  <button
                    className="mt-2 px-4 py-2 bg-[#352872] text-white rounded hover:bg-[#352850]"
                    onClick={() => viewDetails(profile.user_id)}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-600">No profiles to show</p>
            </div>
          )
        )}
      </section>

      {/* Selected User Details Popup */}
      {selectedUser && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={handleClosePopup}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={
                  selectedUser.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="text-gray-600">{selectedUser.jobStatus}</p>
              </div>
            </div>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {selectedUser.address}
            </p>
            <p className="mb-2">
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            <p className="mb-2">
              <strong>Birth Date:</strong> {selectedUser.birthDate}
            </p>
            <p className="mb-2">
              <strong>Interests:</strong> {selectedUser.interests}
            </p>
            <p className="mb-4">
              <strong>Skills:</strong> {selectedUser.skills}
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PeopleYouMayKnowSection;
