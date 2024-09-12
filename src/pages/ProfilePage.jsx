import { useState, useEffect } from "react";
import { useCountries } from "use-react-countries";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("Edit Profile"); // For tracking active sidebar section
  const [userInfo, setUserInfo] = useState(null); // Initialize with null to simulate fetching data
  const [editData, setEditData] = useState(null); // Separate state to track editable form data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle fetch errors

  const { countries } = useCountries();
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://192.168.1.123:2505/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log(data);

        setUserInfo(data);
        setEditData([]); // Set edit data to the same as user info initially
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Toggle edit mode on
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      console.log(editData); // For debugging purposes

      const response = await fetch("http://192.168.1.123:2505/profile", {
        method: "PATCH", // Change to PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const responseBody = await response.text(); // Log the response for debugging
        console.error("Failed to save changes:", responseBody);
        throw new Error("Failed to save changes");
      }

      const updatedUserData = await response.json();
      setUserInfo(updatedUserData); // Update with the latest data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancel = () => {
    setEditData(userInfo); // Reset editData back to original userInfo
    setIsEditing(false); // Exit edit mode without saving
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Display error message if data fetch fails
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex-grow w-full flex flex-col items-center p-8 pt-32 bg-[#e6e2eb]">
        {!isEditing ? (
          <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
            {/* Responsive code for profile image and info */}
            {/* Stack content for small screens */}
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-12 mb-12">
              <div className="relative">
                {userInfo.profilePicture ? (
                  <img
                    src={userInfo.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-[#14044c] shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#14044c] text-white text-3xl flex items-center justify-center rounded-full border-4 border-[#14044c] shadow-lg">
                    {getInitials(userInfo.firstName, userInfo.lastName)}
                  </div>
                )}
              </div>

              {/* Stack user info in small screens */}
              <div className="flex-1 space-y-6 mt-6 md:mt-0">
                <h2 className="text-3xl font-bold text-center md:text-left text-[#14044c]">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                {/* Ensure that the data stacks vertically on small screens */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {" "}
                  {/* Small screens: 1 column, larger screens: 2 columns */}
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Email:</span>{" "}
                    {userInfo.email}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Country:</span>{" "}
                    {userInfo.address}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Job Status:</span>{" "}
                    {userInfo.jobStatus}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Birthdate:</span>{" "}
                    {userInfo.birthDate}
                  </p>
                  <p className="text-sm text-[#14044c] col-span-1 sm:col-span-2">
                    {" "}
                    {/* Ensure full width on small screens */}
                    <span className="font-semibold">Account Created:</span>{" "}
                    {userInfo.created_at}
                  </p>
                </div>
              </div>
            </div>

            {/* Responsive button */}
            <div className="flex justify-center md:justify-between mb-6">
              <button
                onClick={handleEditClick}
                className="bg-[#14044c] text-white py-2 px-6 rounded-full shadow-md hover:bg-[#e6e2eb] hover:text-[#14044c] transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Icons for "Edit Profile" and "Edit Skills" on top for small screens */}
            <div className="flex md:hidden justify-around bg-white py-4 shadow-lg rounded-lg mb-6 w-full max-w-6xl">
              <button
                onClick={() => setActiveSection("Edit Profile")}
                className={`text-lg font-semibold ${
                  activeSection === "Edit Profile"
                    ? "bg-[#e6e2eb] font-bold"
                    : "hover:bg-[#e6e2eb]"
                } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
              >
                <FiUser className="inline mr-2" /> Edit Profile
              </button>

              <button
                onClick={() => navigate("/edit-skills")}
                className={`text-lg font-semibold ${
                  activeSection === "Skilled"
                    ? "bg-[#e6e2eb] font-bold"
                    : "hover:bg-[#e6e2eb]"
                } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
              >
                <FiBriefcase className="inline mr-2" /> Edit Skills
              </button>
            </div>

            <div className="flex flex-col md:flex-row w-full max-w-6xl">
              {/* Sidebar for larger screens */}
              <div className="hidden md:block w-full md:w-1/4 p-6 bg-[#f7f7f8] rounded-lg shadow-lg mb-6 md:mb-0">
                <h2 className="text-lg font-bold text-[#14044c] mb-4">
                  Profile Settings
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      onClick={() => setActiveSection("Edit Profile")}
                      className={`text-lg font-semibold ${
                        activeSection === "Edit Profile"
                          ? "bg-[#e6e2eb] font-bold"
                          : "hover:bg-[#e6e2eb]"
                      } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
                      style={{ textDecoration: "none" }}
                    >
                      <FiUser className="inline mr-2" /> Edit Profile
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/edit-skills")}
                      className={`text-lg font-semibold ${
                        activeSection === "Skilled"
                          ? "bg-[#e6e2eb] font-bold"
                          : "hover:bg-[#e6e2eb]"
                      } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
                      style={{ textDecoration: "none" }}
                    >
                      <FiBriefcase className="inline mr-2" /> Edit Skills
                    </a>
                  </li>
                </ul>
              </div>

              {/* Form section */}
              <div className="w-full md:w-3/4 p-12 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-[#14044c] mb-6">
                  Edit Profile
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#14044c]">
                      Country
                    </label>
                    <select
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#14044c] focus:border-[#14044c] text-[#14044c]"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#14044c]">
                      Job Status
                    </label>
                    <select
                      name="jobStatus"
                      value={editData.jobStatus}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#14044c] focus:border-[#14044c] text-[#14044c]"
                    >
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0">
                  <button
                    onClick={handleCancel} // Reset form data on cancel
                    className="border border-[#14044c] text-[#14044c] py-2 px-6 rounded-full shadow-md hover:bg-[#e6e2eb] hover:text-[#14044c] transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-[#14044c] text-white py-2 px-6 rounded-full shadow-md hover:bg-[#e6e2eb] hover:text-[#14044c] transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default ProfilePage;
