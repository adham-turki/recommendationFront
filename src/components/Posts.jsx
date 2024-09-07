import { useState } from 'react';
import PropTypes from 'prop-types';


const Posts = ({ darkMode }) => { // Receive darkMode prop
  const initialPosts = [
    {
      title: "How to build a mobile app with Flutter",
      category: "Technology",
      status: "Published",
      views: 233,
      likes: 10,
      dislikes: 9,
      created: "2023-08-01",
    },
    {
      title: "Top 10 tips for effective time management",
      category: "Productivity",
      status: "Published",
      views: 128,
      likes: 20,
      dislikes: 3,
      created: "2023-07-28",
    },
    {
      title: "The ultimate guide to healthy meal prep",
      category: "Health & Fitness",
      status: "Published",
      views: 312,
      likes: 5,
      dislikes: 0,
      created: "2023-07-15",
    },
    {
      title: "5 proven strategies to boost your e-commerce sales",
      category: "Business",
      status: "Published",
      views: 197,
      likes: 7,
      dislikes: 0,
      created: "2023-07-05",
    },
    {
      title: "Mastering the art of public speaking: A step-by-step guide",
      category: "Education",
      status: "Published",
      views: 145,
      likes: 0,
      dislikes: 0,
      created: "2023-06-30",
    },
    {
      title: "Understanding AI and machine learning",
      category: "Technology",
      status: "Published",
      views: 278,
      likes: 13,
      dislikes: 2,
      created: "2023-08-10",
    },
    // Add more posts as needed...
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filter posts based on search term
  const filteredPosts = initialPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`layout-content-container flex flex-col max-w-[1960px] flex-1 ${darkMode ? 'bg-gray-900 text-gray-100' : ' text-black'}`}>
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">Posts</p>
        <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal`}>
          <span className="truncate">New post</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className={`flex w-full flex-1 items-stretch rounded-xl h-full ${darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]'}`}>
            {/* Search Icon */}
            <div className={`text-neutral-500 flex border-none ${darkMode ? 'bg-gray-600' : 'bg-[#EEEEEE]'} items-center justify-center pl-4 rounded-l-xl border-r-0`} data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              placeholder="Search posts"
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl ${darkMode ? 'bg-gray-600 text-gray-100 placeholder:text-neutral-400' : 'bg-[#EEEEEE] text-black placeholder:text-neutral-500'} focus:outline-0 focus:ring-0 border-none h-full px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Posts Table */}
      <div className="px-4 py-3 @container">
        <div className={`flex overflow-hidden rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-[#E0E0E0] bg-white'}`}>
          <table className="flex-1">
            <thead>
              <tr className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Title</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Category</th>
                <th className="px-4 py-3 text-left w-60 text-sm font-medium leading-normal">Status</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Views</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Likes</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Dislikes</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Created</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={index} className={`border-t ${darkMode ? 'border-gray-600' : 'border-t-[#E0E0E0]'}`}>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-100' : 'text-black'}`}>{post.title}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.category}</td>
                  <td className="px-4 py-2 text-sm font-normal leading-normal">
                    <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${darkMode ? 'bg-gray-600 text-gray-100' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal w-full`}>
                      <span className="truncate">{post.status}</span>
                    </button>
                  </td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.views}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.likes}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.dislikes}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.created}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                    <button className="text-blue-700 hover:text-blue-900 mr-2">
                      {/* Edit Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 21h4l13.293-13.293a1 1 0 0 0-1.414-1.414L6.586 19H4v2zM20.7 4.9c.1-.1.1-.3 0-.4l-2.1-2.1c-.1-.1-.3-.1-.4 0l-1.8 1.8 2.5 2.5 1.8-1.8z" />
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      {/* Delete Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18v2H3zm3 16c-1.1 0-2-.9-2-2V7h14v13c0 1.1-.9 2-2 2H6zM21 4H7l-1-1H2v2h19z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between py-3">
          <button
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl  h-8 px-4 ${currentPage === 1 ? 'bg-gray-500' : darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`flex min-w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${currentPage === index + 1 ? (darkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-600 text-gray-100' : 'bg-[#EEEEEE] text-black')} text-sm font-medium leading-normal`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${currentPage === totalPages ? 'bg-gray-400' : darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
Posts.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};
export default Posts;