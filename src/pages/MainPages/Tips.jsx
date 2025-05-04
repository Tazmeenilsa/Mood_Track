// src/pages/Tips.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { moodTips } from '../../utils/Tips';
import Navbar from '../../components/layout/Navbar';

const Tips = () => {
  const moodHistory = useSelector((state) => state?.mood?.history || []);
  
  // Get recent moods (unique)
  const recentMoods = [...new Set(moodHistory.map((entry) => entry.mood))];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">Your Mood-Based Tips</h1>

        {recentMoods.length === 0 ? (
          <p className="text-gray-500">No mood data yet. Please check-in to see relevant tips.</p>
        ) : (
          recentMoods.map((mood) => (
            <motion.div
              key={mood}
              className="mb-6 bg-white p-4 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-lg font-semibold text-blue-600 mb-2">{mood} Mood Tips</h2>
              <ul className=" ml-6 text-gray-700">
                {(moodTips[mood] || []).map((tip, index) => (
                  <li key={index} className="mb-1">{tip}</li>
                ))}
              </ul>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
};

export default Tips;
