import { useState, useEffect } from 'react';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/AuthPages/Login';
import Dashboard from './pages/MainPages/Dashboard';
import CheckIn from './pages/MainPages/CheckIn';
import Tips from './pages/MainPages/Tips';
import Signup from './pages/AuthPages/Signup';

// Custom Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);

  // Check if token exists in Redux or localStorage (for persistence)
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth && storedAuth.token) {
      // If the token is in localStorage, we should update Redux state (if not already).
      // This ensures that the token is persisted across app reloads.
    }
  }, []);

  if (token || JSON.parse(localStorage.getItem('auth'))) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Use ProtectedRoute for secured pages */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/check-in" element={<ProtectedRoute element={<CheckIn />} />} />
      <Route path="/tips" element={<ProtectedRoute element={<Tips />} />} />
    </Routes>
  );
}

export default App;
