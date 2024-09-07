import { useState } from 'react';
import PropTypes from 'prop-types';


const Users = ({ darkMode }) => {
 
  const initialUsers = [
    { username: 'Adham Turki', email: 'adhamturki321@gmail.com', phone: '0597936306', posts: 10, likes: 150, shares: 30, image:'https://media.istockphoto.com/id/1503297213/photo/elderly-man-profile-and-thinking-about-future-retirement-and-pension-with-headshot-mockup.jpg?s=2048x2048&w=is&k=20&c=KaK4Zc79n9_J63MxL3naL0MhfbzhNB7Q8pIn_Jjw7cw='},
    { username: 'Sarah Ahmed', email: 'sarah.ahmed@gmail.com', phone: '0597936311', posts: 8, likes: 100, shares: 20 ,image:'https://media.istockphoto.com/id/1303206630/photo/portrait-of-smiling-caucasian-businesswoman-pose-in-office.jpg?s=2048x2048&w=is&k=20&c=yY_iusrwTkxnEtu7FBQAaMc83iQEm2icnoKze5vcgFA='},
    { username: 'John Doe', email: 'john.doe@gmail.com', phone: '0597936322', posts: 15, likes: 200, shares: 40 ,image:'https://plus.unsplash.com/premium_photo-1682088122308-448e4af02945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { username: 'Jane Smith', email: 'jane.smith@gmail.com', phone: '0597936333', posts: 12, likes: 180, shares: 35, image:'https://images.unsplash.com/photo-1675358742476-6ad595824519?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { username: 'Michael Brown', email: 'michael.brown@gmail.com', phone: '0597936344', posts: 5, likes: 60, shares: 10 ,image: 'https://images.unsplash.com/photo-1602178856779-d57888ae2f8f?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { username: 'Emily Davis', email: 'emily.davis@gmail.com', phone: '0597936355', posts: 20, likes: 300, shares: 50 , image :'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',},
    { username: 'Chris Johnson', email: 'chris.johnson@gmail.com', phone: '0597936366', posts: 18, likes: 250, shares: 45,image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { username: 'Amanda Wilson', email: 'amanda.wilson@gmail.com', phone: '0597936377', posts: 22, likes: 350, shares: 60,image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { username: 'Daniel Lee', email: 'daniel.lee@gmail.com', phone: '0597936388', posts: 7, likes: 90, shares: 15 ,image:'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on search term
  const filteredUsers = initialUsers.filter(user =>
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
    <div className={`layout-content-container flex flex-col max-w-[1960px] flex-1 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">Users</p>
      </div>
      <div className="pb-3">
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className={`text-neutral-500 flex border-none ${darkMode ? 'bg-gray-800' : 'bg-[#EEEEEE]'} items-center justify-center pl-4 rounded-l-xl border-r-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
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
                <tr className={darkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Profile</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Name`</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Email</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Phone</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Likes</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Shares</th>
                  <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-[#EEEEEE]'}`}>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-sm font-normal leading-normal">
                      <img
                        src={user.image}
                        alt={`${user.username}'s profile`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.username}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.email}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.phone}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.likes}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal"><span>{user.shares}</span></td>
                    <td className="px-4 py-3 text-sm font-normal leading-normal">
                      <button className="bg-[#f4242f] text-white py-2 px-4 rounded-full">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between py-3">
            <button
              className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${currentPage === 1 ? 'bg-gray-500' : darkMode ? 'bg-gray-700 text-white' : 'bg-[#EEEEEE]'} text-sm font-medium leading-normal`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`flex min-w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${currentPage === index + 1 ? (darkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white') : darkMode ? 'bg-gray-700 text-white' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${currentPage === totalPages ? 'bg-gray-500' : darkMode ? 'bg-gray-700 text-white' : 'bg-[#EEEEEE]'} text-sm font-medium leading-normal`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
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
  darkMode: PropTypes.bool.isRequired,
};

export default Users;