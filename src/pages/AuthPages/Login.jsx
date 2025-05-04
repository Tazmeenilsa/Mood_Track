// src/pages/Login.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { setAuth } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = existingUsers.find(user =>
      user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      dispatch(setAuth({ user: { name: foundUser.name, email: foundUser.email }, token: foundUser.token }));
      localStorage.setItem('auth', JSON.stringify({ user: foundUser, token: foundUser.token }));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6 tracking-tight">
          Mood Track
        </h1>
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>
        <h3 className="text-xl font-semibold mb-4 text-center">Log In</h3>
        
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Log In
            </motion.button>

            <div className="text-center mt-4 text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-indigo-600 hover:underline font-medium transition duration-200"
              >
                Sign Up
              </Link>
            </div>
          </Form>
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default Login;
