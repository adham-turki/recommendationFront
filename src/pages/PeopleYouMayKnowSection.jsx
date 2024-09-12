import React, { useEffect, useState } from "react";

const PeopleYouMayKnowSection = () => {
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user details

  useEffect(() => {
    const fetchPeopleYouMayKnow = async () => {
      setLoading(true);
      try {
        console.log("Fetching 'People You May Know' data...");
        const response = await fetch(
          "http://192.168.1.136:8089/similar-users/2?method-type=1&partner-id=1"
        );
        console.log("Response status:", response.status); // Log response status

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data

        // Check the structure of the fetched data
        if (data && data.similar_users) {
          console.log("Similar users:", data.similar_users); // Log similar users array
          setPeopleYouMayKnow(data.similar_users); // Fetch similar users
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (err) {
        console.error("Error fetching 'People You May Know':", err);
        setError("Failed to fetch data, showing fallback.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeopleYouMayKnow();
  }, []);

  // Function to view detailed information about a user
  const viewDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://192.168.1.136:8089/profile/${userId}`
      ); // Replace this URL with your actual user detail API
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userDetails = await response.json();
      setSelectedUser(userDetails); // Store detailed info in state
      console.log("User details:", userDetails);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  return (
    <>
      {/* People You May Know Section */}
      <section className="mb-8 pt-20">
        <h1 className="text-2xl font-bold mb-4 text-[#352872]">
          People You May Know
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && peopleYouMayKnow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {peopleYouMayKnow.map((profile) => (
              <div
                key={profile.user_id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${profile.user_id}.jpg`}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-gray-600">
                      Similarity: {(profile.score * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
                <button
                  className="mt-2 px-4 py-2 bg-[#352872] text-white rounded hover:bg-[#352850]0"
                  onClick={() => viewDetails(profile.user_id)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selected User Details Section */}
      {selectedUser && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p>
              <strong>Name:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Interests:</strong> {selectedUser.interests.join(", ")}
            </p>
            <p>
              <strong>Skills:</strong> {selectedUser.skills.join(", ")}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default PeopleYouMayKnowSection;
