import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-purple-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Your Profile</h2>

        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-xl shadow">
            <p className="text-gray-700"><strong>Name:</strong> {user?.name || 'N/A'}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl shadow">
            <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 italic">More profile options coming soon...</p>
      </div>
    </motion.div>
  );
};

export default Profile;