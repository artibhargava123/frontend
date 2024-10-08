import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import Home from './components/Home';
import Blog from './components/Blog';

function App() {
  return (
    <Router>
      <Routes> {/* Updated */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/create-blog" element={<Blog />}/>
      </Routes>
    </Router>
  );
}

export default App;
