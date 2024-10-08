import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post('http://127.0.0.1:8000/blog/', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      navigate('/home/'); 
    } catch (err) {
      setError(err.response?.data?.detail || 'Error creating blog post. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Blog Post</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;
