import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setCheckInData } from '../../redux/slices/checkInSlice';
import { useNavigate } from 'react-router-dom';
import { addMoodEntry } from '../../redux/slices/moodSlice';
import Navbar from '../../components/layout/Navbar';

const moodOptions = [
  { label: '😊 Happy', value: 'Happy', color: 'bg-yellow-200' },
  { label: '😐 Neutral', value: 'Neutral', color: 'bg-gray-200' },
  { label: '😢 Sad', value: 'Sad', color: 'bg-blue-200' },
  { label: '😠 Angry', value: 'Angry', color: 'bg-red-300' },
  { label: '😰 Anxious', value: 'Anxious', color: 'bg-indigo-200' },
  { label: '🤩 Excited', value: 'Excited', color: 'bg-pink-200' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const CheckIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');

  return (
    <>
      <Navbar />

      <motion.div
        className="min-h-screen p-6 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6"
          {...fadeInUp}
        >
          <motion.h2
            className="text-2xl font-bold text-center"
            {...fadeInUp}
            transition={{ duration: 0.4 }}
          >
            📝 Daily Mood Check-In
          </motion.h2>

          <Formik
            initialValues={{
              mood: '',
              sleptWell: '',
              stress: '',
              energy: '',
              appetite: '',
              comments: '',
            }}
            onSubmit={(values) => {
              dispatch(addMoodEntry(values.mood));
              dispatch(setCheckInData(values));
              navigate('/dashboard');
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <motion.div {...fadeInUp}>
                  <label className="block font-semibold text-gray-700 mb-2">
                    How are you feeling today?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {moodOptions.map(({ label, value, color }) => (
                      <motion.div
                        key={value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-xl p-3 cursor-pointer text-center shadow-sm transition-all duration-200 ${
                          selectedMood === value ? 'ring-2 ring-blue-500 scale-105' : ''
                        } ${color}`}
                        onClick={() => {
                          setFieldValue('mood', value);
                          setSelectedMood(value);
                        }}
                      >
                        <span className="text-lg font-medium">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" {...fadeInUp}>
                  {[
                    { name: 'sleptWell', label: 'Did you sleep well?', options: ['Yes', 'No'] },
                    { name: 'stress', label: 'Are you feeling stressed?', options: ['Yes', 'No'] },
                    {
                      name: 'energy',
                      label: 'How is your energy level?',
                      options: ['High', 'Moderate', 'Low'],
                    },
                    {
                      name: 'appetite',
                      label: 'How is your appetite?',
                      options: ['Good', 'Normal', 'Poor'],
                    },
                  ].map(({ name, label, options }) => (
                    <motion.div key={name} {...fadeInUp}>
                      <label className="block font-medium mb-1">{label}</label>
                      <Field
                        as="select"
                        name={name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"

                      >
                        <option value="">Choose</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Field>
                    </motion.div>
                  ))}
                </motion.div>

                {/* <motion.div {...fadeInUp}>
                  <label className="block font-medium mb-1">Additional Comments</label>
                  <Field
                    as="textarea"
                    name="comments"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    rows={3}
                    placeholder="Write anything you'd like to reflect on..."
                  />
                </motion.div> */}

                <motion.button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Check-In
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CheckIn;
