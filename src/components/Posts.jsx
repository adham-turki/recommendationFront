import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Posts = () => {



  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newPostUrl, setNewPostUrl] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostUrl, setEditPostUrl] = useState('');
  const [editPostCategory, setEditPostCategory] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);



  const postsPerPage = 5;
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${import.meta.env.VITE_API}/categories`);
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API}/contents`);
      const data = await res.json();
      setPosts(data);
    }
    fetchData();
  }, [posts]);

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditPostId(post.contentId);
      setEditPostUrl(post.url);
      setEditPostCategory(post.category);
      setEditImage(post.imageUrl);
      setEditBody(post.body);
      setEditTitle(post.title);
      setShowModal(true);
    } else {
      console.log("QERWTEfhgj")
      setEditPostId(null);
      setNewPostUrl('');
      setNewPostCategory('');
      setNewImage('');
      setNewBody('');
      setNewTitle('');
      setShowModal(true);
    }
  };
  const handleEditSubmit = async () => {
    const updatedPost = {
      title: editTitle,
      body: editBody,
      url: editPostUrl,
      category: editPostCategory,
      imageUrl: editImage,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/contents/${editPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      // Refresh posts data after successful update
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editPostId ? { ...post, ...updatedPost } : post
        )
      );
      

      // Clear form fields and close modal
      setEditPostUrl('');
      setEditPostCategory('');
      setEditImage('');
      setEditBody('');
      setEditTitle('');
      setEditPostId(null);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/contents/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      // Refresh posts data after successful deletion
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async () => {
    const newPost = {
      title: newTitle,
      body: newBody,
      url: newPostUrl,
      category: newPostCategory,
      imageUrl: newImage,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/contents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error('Failed to create new post');
      }

      // Refresh posts data after successful post creation
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Clear form fields and close modal
      setNewPostUrl('');
      setNewPostCategory('');
      setNewImage('');
      setNewBody('');
      setNewTitle('');
      handleCloseModal();
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  return (
    <div className={`layout-content-container flex flex-col max-w-[1960px] flex-1 ${darkMode ? 'bg-gray-900 text-gray-100' : 'text-black'}`}>
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">Posts</p>
        <button
          onClick={handleOpenModal}
          className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#EEEEEE] text-black'} text-sm font-medium leading-normal`}
        >
          <span className="truncate">New post</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className={`flex w-full flex-1 items-stretch rounded-xl h-full ${darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]'}`}>
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
        <div className={`flex flex-col overflow-x-auto rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-[#E0E0E0] bg-white'}`}>
          <table className="min-w-full">
            <thead>
              <tr className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Title</th>
                <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">Category</th>
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
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.likes}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.dislikes}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>{post.date}</td>
                  <td className={`px-4 py-2 text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                    <button className="text-blue-700 hover:text-blue-900 mr-2" onClick={() => handleOpenModal(post)}>
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(post.contentId)}>
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className={`relative max-w-lg w-full bg-white rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 text-gray-100' : 'text-black'}`}>
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-semibold">New Post</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Post URL</label>
                <input
                  type="text"
                  className={`form-input w-full rounded-md border ${darkMode ? 'bg-gray-800 text-gray-100' : 'border-gray-300'} px-3 py-2`}
                  value={editPostUrl}
                  onChange={(e) => setEditPostUrl(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className={`form-select w-full rounded-md border ${darkMode ? 'bg-gray-800 text-gray-100' : 'border-gray-300'} px-3 py-2`}
                  value={editPostCategory}
                  onChange={(e) => setEditPostCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">

                <label className="block text-sm font-medium mb-1">Image URL</label>

                <input
                  type="text"
                  className={`form-input w-full rounded-md border ${darkMode ? 'bg-gray-800 text-gray-100' : 'border-gray-300'} px-3 py-2`}
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />
                <label className="block text-sm font-medium mb-1">Title</label>

                <input
                  type="text"
                  className={`form-input w-full rounded-md border ${darkMode ? 'bg-gray-800 text-gray-100' : 'border-gray-300'} px-3 py-2`}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <label className="block text-sm font-medium mb-1">Description</label>

                <textarea
                  type="text"
                  className={`form-input w-full rounded-md border ${darkMode ? 'bg-gray-800 text-gray-100' : 'border-gray-300'} px-3 py-2`}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button onClick={editPostId ? handleEditSubmit : handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  {editPostId ? 'Update' : 'Submit'}
                </button>              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Posts.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Posts;
