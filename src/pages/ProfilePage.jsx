import { useState, useEffect } from "react";
import { useCountries } from "use-react-countries";
import {
  FiUser,
  FiLogOut,
  FiBriefcase,
  FiGlobe,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import Footer from "../components/Footer";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("Edit Profile"); // For tracking active sidebar section
  const [userInfo, setUserInfo] = useState(null); // Initialize with null to simulate fetching data
  const [editData, setEditData] = useState(null); // Separate state to track editable form data
  const [loading, setLoading] = useState(true); // For loading state

  const { countries } = useCountries();

  // Simulate fetching user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                firstName: "Noor",
                lastName: "Hamayel",
                email: "noor@example.com",
                country: "Palestine",
                jobStatus: "Employed",
                birthdate: "2002-07-31",
                accountCreationDate: "2023-01-01",
                profilePictureUrl: null, // No profile picture, default to initials
              }),
            1000
          )
        );
        setUserInfo(data);
        setEditData(data); // Set edit data to the same as user info initially
      } catch (error) {
        console.error("Failed to fetch user data", error);
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

  const handleSaveChanges = () => {
    setUserInfo(editData); // Update userInfo with editData when saving
    setIsEditing(false); // Exit edit mode
    // TODO: Send updated userInfo to the backend API
  };

  const handleCancel = () => {
    setEditData(userInfo); // Reset editData back to original userInfo
    setIsEditing(false); // Exit edit mode without saving
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <div className="flex flex-col min-h-screen relative">

      <div className="flex-grow w-full flex flex-col items-center p-8 pt-32 bg-[#e6e2eb]">
        {!isEditing ? (
          <div className="w-full max-w-6xl p-16 bg-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-12 mb-12">
              <div className="relative">
                {userInfo.profilePictureUrl ? (
                  <img
                    src={userInfo.profilePictureUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-[#14044c] shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#14044c] text-white text-3xl flex items-center justify-center rounded-full border-4 border-[#14044c] shadow-lg">
                    {getInitials(userInfo.firstName, userInfo.lastName)}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-[#14044c]">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Email:</span>{" "}
                    {userInfo.email}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Country:</span>{" "}
                    {userInfo.country}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Job Status:</span>{" "}
                    {userInfo.jobStatus}
                  </p>
                  <p className="text-sm text-[#14044c]">
                    <span className="font-semibold">Birthdate:</span>{" "}
                    {userInfo.birthdate}
                  </p>
                  <p className="text-sm text-[#14044c] col-span-2">
                    <span className="font-semibold">Account Created:</span>{" "}
                    {userInfo.accountCreationDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <button
                onClick={handleEditClick}
                className="bg-[#14044c] text-white py-2 px-6 rounded-full shadow-md hover:bg-[#e6e2eb] hover:text-[#14044c] transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-6xl">
            <div className="w-1/4 p-6 bg-[#f7f7f8] rounded-lg shadow-lg">
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
                  >
                    <FiUser className="inline mr-2" /> Edit Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveSection("Linked Accounts")}
                    className={`text-lg font-semibold ${
                      activeSection === "Linked Accounts"
                        ? "bg-[#e6e2eb] font-bold"
                        : "hover:bg-[#e6e2eb]"
                    } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
                  >
                    <FiGlobe className="inline mr-2" /> Linked Accounts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveSection("Interests")}
                    className={`text-lg font-semibold ${
                      activeSection === "Interests"
                        ? "bg-[#e6e2eb] font-bold"
                        : "hover:bg-[#e6e2eb]"
                    } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
                  >
                    <FiStar className="inline mr-2" /> Interests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setActiveSection("Skilled")}
                    className={`text-lg font-semibold ${
                      activeSection === "Skilled"
                        ? "bg-[#e6e2eb] font-bold"
                        : "hover:bg-[#e6e2eb]"
                    } text-[#14044c] transition duration-300 p-2 block rounded-lg`}
                  >
                    <FiBriefcase className="inline mr-2" /> Skilled
                  </a>
                </li>

                <li className="mt-3 border-t pt-3">
                  <a
                    href="#"
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FiTrash2 className="inline mr-2" /> Delete Account
                  </a>
                </li>
              </ul>
            </div>

            {/* Edit Form Section */}
            <div className="w-3/4 p-12 bg-white rounded-lg shadow-lg ml-6">
              <h2 className="text-2xl font-bold text-[#14044c] mb-6">
                Edit Profile
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#14044c] text-white text-3xl flex items-center justify-center rounded-full border-4 border-[#14044c] shadow-lg">
                      {getInitials(editData.firstName, editData.lastName)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#14044c]">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#14044c] focus:border-[#14044c] text-[#14044c]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#14044c]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#14044c] focus:border-[#14044c] text-[#14044c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#14044c]">
                    Country
                  </label>
                  <select
                    name="country"
                    value={editData.country}
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

                <div className="flex justify-between mt-6">
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
          </div>
        )}
      </div>

      {/* Full-width Footer */}
      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default ProfilePage;
