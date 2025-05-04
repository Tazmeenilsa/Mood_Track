import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setAuth } from '../../redux/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateToken = () => Math.random().toString(36).substr(2);

  const handleSignup = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = existingUsers.find(u => u.email === values.email);

    if (isUserExist) {
      alert('User already exists with this email!');
      return;
    }

    const newUser = { ...values, token: generateToken() };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    dispatch(setAuth({ user: { name: values.name, email: values.email }, token: newUser.token }));
    localStorage.setItem('auth', JSON.stringify({ user: newUser, token: newUser.token }));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-200 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6 tracking-tight">
          Mind Track
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Create Your Account</h2>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSignup}
        >
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Field
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Field
                name="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </motion.button>

            <div className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-medium transition duration-200"
              >
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
};

export default Signup;
