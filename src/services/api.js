// src/services/api.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';  // Your Django API URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User registration
export const registerUser = async (email, password) => {
    return api.post('auth/register/', { email, password });
};

// User login
export const loginUser = async (email, password) => {
    return api.post('auth/login/', { email, password });
};

// User logout
export const logoutUser = async () => {
    return api.post('auth/logout/');
};

// Create a new blog post
export const createBlog = async (formData) => {
    return api.post('blogs/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
    });
};

// Get all blogs with pagination
export const getBlogs = async (page = 1) => {
    return api.get(`blogs/?page=${page}`);
};

export default api;
