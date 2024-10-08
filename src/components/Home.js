import React, { useEffect, useState } from 'react';
import { getBlogs } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();

  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = !!localStorage.getItem('accessToken');


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login/');
    }
  }, [isLoggedIn, navigate]);

  // Fetch blogs whenever currentPage changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs(currentPage); // Fetch blogs for the current page
        setBlogs(response.data.results); // Assuming response contains the blogs in 'results'
        setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 blogs per page
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    if (isLoggedIn) {
      fetchBlogs(); // Fetch blogs if user is logged in
    }
  }, [currentPage, isLoggedIn]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Change the page when user clicks pagination
  };

  // Navigate to create blog post page
  const handleCreatePost = () => {
    navigate('/create-blog'); 
  };

  return (
    <div className="container mt-5">
      <h2>All Blog Posts</h2>
      {isLoggedIn && ( // Show create post button only if logged in
        <button className="btn btn-primary mb-3" onClick={handleCreatePost}>
          Create New Blog Post
        </button>
      )}
      <div className="list-group">
        {blogs.map((blog) => (
          <div key={blog.id} className="list-group-item">
            <h5>{blog.title}</h5>
            <p>{blog.content}</p>
            <p><small>Posted on: {new Date(blog.created_at).toLocaleDateString()}</small></p>
            <a href={`/blog/${blog.id}`} className="btn btn-link">View</a>
          </div>
        ))}
        {blogs.length === 0 && <p>No blog posts available.</p>} {/* Handle empty blog list */}
      </div>
      <nav>
        <ul className="pagination mt-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
