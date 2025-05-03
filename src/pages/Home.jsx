import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 md:px-8 py-12">
      <motion.h1
        className="text-4xl font-semibold text-center text-indigo-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        MindTrack: Track Your Mental Wellness
      </motion.h1>
      
      <motion.p
        className="text-lg text-gray-600 mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        A simple, interactive way to track your mood and emotional journey.
      </motion.p>

      <motion.div
        className="mt-8 space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Link to="/mood">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Start Logging
          </button>
        </Link>
        <Link to="/tracker">
          <button className="bg-transparent border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition">
            Explore Trends
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
