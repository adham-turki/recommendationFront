

// export default Users;
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';


const Users = ({ darkMode }) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://rsserviceplan-rsapp.azuremicroservices.io/users");
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message); // Set the error message in case of failure
      }
    }
    fetchData();
  }, []);


  const handleActivateDeactivate = async (userId, isEnabled) => {
    const url = isEnabled
      ? `http://192.168.1.123:2505/user/deactivate/${userId}`
      : `http://192.168.1.123:2505/user/activate/${userId}`;

    try {
      const res = await fetch(url, { method: 'PATCH' });
      if (!res.ok) {
        throw new Error(`Failed to ${isEnabled ? 'deactivate' : 'activate'} user`);
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, enabled: !isEnabled } : user
        )
      );
    } catch (err) {
      setError(err.message); // Handle errors
    }
  };

  // If error occurs, display error message
  if (error) {
    return (
      <div className={`layout-content-container flex flex-col max-w-[1960px] flex-1 ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
        <p className="text-red-500 p-4">Error: {error}</p>
      </div>
    );
  }

  if (!users) {
    return (
      <div className={`layout-content-container flex flex-col min-h-screen items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
        <ClipLoader speedMultiplier={0.7} color={darkMode ? "#ffffff" : "#000000"} loading={true} size={60} />
      </div>
    );
  }



  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`layout-content-container flex flex-col max-w-[1960px] flex-1 ${darkMode ? 'bg-gray-900 text-white' : ' text-black'}`}>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">Users</p>
      </div>
      <div className="pb-3">
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className={`text-neutral-500 flex border-none ${darkMode ? 'bg-gray-800' : 'bg-[#EEEEEE]'} items-center justify-center pl-4 rounded-l-xl border-r-0`}>
                {/* Search Icon */}
              </div>
              <input
                placeholder="Search users"
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#EEEEEE] text-black'} focus:border-none h-full placeholder:text-neutral-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className="px-4 py-3 @container">
          <div className={`flex overflow-hidden rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-[#E0E0E0] bg-white'}`}>
            <table className="flex-1">
              <thead>
                <tr className={darkMode ? 'bg-gray-700 text-white' : 'bg-white'}>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Profile</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Name</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Email</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Phone</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Likes</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Shares</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-sm font-normal leading-normal"><img src={user.image} alt={user.username} className="w-10 h-10 rounded-full" /></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.username}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"> <span>{user.email}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"> <span>{user.phone}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.likes}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.shares}</span></td>
                    <td>
                      <button
                        className={`px-4 py-2 rounded-full text-white ${user.enabled ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={() => handleActivateDeactivate(user.id, user.enabled)}
                      >
                        {user.enabled ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#dbd7d7] text-black'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#dbd7d7] text-black'} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


Users.propTypes = {
  darkMode: PropTypes.bool,
};

export default Users;
