import { useState, useEffect } from "react";
import { useCountries } from "use-react-countries";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("Edit Profile"); // For tracking active sidebar section
  const [userInfo, setUserInfo] = useState(null); // Initialize with null to simulate fetching data
  const [editData, setEditData] = useState(null); // Separate state to track editable form data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle fetch errors
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const { countries } = useCountries();
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
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
    <div className={`flex flex-col min-h-screen relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#e6e2eb] text-black'}`}>
      <div className={`flex-grow w-full flex flex-col items-center p-8 pt-32 ${darkMode ? 'bg-gray-900' : 'bg-[#e6e2eb]'}`}>
        {!isEditing ? (
          <div className={`w-full max-w-6xl p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-12 mb-12">
              <div className="relative">
                {userInfo.profilePicture ? (
                  <img
                    src={userInfo.profilePicture}
                    alt="Profile"
                    className={`w-32 h-32 rounded-full border-4 ${!darkMode ? 'border-[#14044c]': 'border-gray-100'} shadow-lg object-cover`}
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#14044c] text-white text-3xl flex items-center justify-center rounded-full border-4 border-[#14044c] shadow-lg">
                    {getInitials(userInfo.firstName, userInfo.lastName)}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-6 mt-6 md:mt-0">
                <h2 className={`text-3xl font-bold text-center md:text-left ${darkMode ? 'text-white' : 'text-[#14044c]'}`}>
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span> {userInfo.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Country:</span> {userInfo.address}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Job Status:</span> {userInfo.jobStatus}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Birthdate:</span> {userInfo.birthDate}
                  </p>
                  <p className="text-sm col-span-1 sm:col-span-2">
                    <span className="font-semibold">Account Created:</span> {userInfo.created_at}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-between mb-6">
              <button
                onClick={handleEditClick}
                className={`py-2 px-6 rounded-full shadow-md transition duration-300 ${darkMode ? 'bg-white text-black hover:bg-gray-600 hover:text-white' : 'bg-[#14044c] text-white hover:bg-[#e6e2eb] hover:text-[#14044c]'}`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={`flex md:hidden justify-around ${darkMode ? 'bg-gray-800' : 'bg-white'} py-4 shadow-lg rounded-lg mb-6 w-full max-w-6xl`}>
              <button
                onClick={() => setActiveSection("Edit Profile")}
                className={`text-lg font-semibold ${activeSection === "Edit Profile" ? 'font-bold' : ''} transition duration-300 p-2 block rounded-lg ${darkMode ? 'text-white' : 'text-[#14044c]'}`}
              >
                <FiUser className="inline mr-2" /> Edit Profile
              </button>

              <button
                onClick={() => navigate("/edit-skills")}
                className={`text-lg font-semibold ${activeSection === "Skilled" ? 'font-bold' : ''} transition duration-300 p-2 block rounded-lg ${darkMode ? 'text-white' : 'text-[#14044c]'}`}
              >
                <FiBriefcase className="inline mr-2" /> Edit Skills
              </button>
            </div>

            <div className="flex flex-col md:flex-row w-full max-w-6xl">
              <div className={`hidden md:block w-full md:w-1/4 p-6 rounded-lg shadow-lg mb-6 md:mb-0 ${darkMode ? 'bg-gray-800' : 'bg-[#f7f7f8]'}`}>
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#14044c]'} mb-4`}>Profile Settings</h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="#"
                      onClick={() => setActiveSection("Edit Profile")}
                      className={`text-lg font-semibold ${activeSection === "Edit Profile" ? 'font-bold' : ''} transition duration-300 block rounded-lg p-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-[#14044c] hover:bg-[#e6e2eb]'}`}
                    >
                      <FiUser className="inline mr-2" /> Edit Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/edit-skills"
                      className={`text-lg font-semibold ${activeSection === "Skilled" ? 'font-bold' : ''} transition duration-300 block rounded-lg p-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-[#14044c] hover:bg-[#e6e2eb]'}`}
                    >
                      <FiBriefcase className="inline mr-2" /> Edit Skills
                    </a>
                  </li>
                </ul>
              </div>

              <div className={`w-full md:w-3/4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg p-8`}>
                

                  
                <h2 className="text-2xl font-bold text-[#14044c] mb-6">
                  Edit Profile
                </h2>
                <div>
                    <label className="block mb-2 text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-200 border border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-200 border border-gray-300'}`}
                    />
                  </div>
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


                <div className="flex justify-between">
                  <button
                    onClick={handleSaveChanges}
                    className={`py-2 px-6 rounded-full shadow-md transition duration-300 ${darkMode ? 'bg-white text-black hover:bg-gray-600 hover:text-white' : 'bg-[#14044c] text-white hover:bg-[#e6e2eb] hover:text-[#14044c]'}`}
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={handleCancel}
                    className={`py-2 px-6 rounded-full shadow-md transition duration-300 ${darkMode ? 'bg-gray-600 text-white hover:bg-white hover:text-black' : 'bg-gray-300 text-black hover:bg-gray-100 hover:text-black'}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default ProfilePage;
