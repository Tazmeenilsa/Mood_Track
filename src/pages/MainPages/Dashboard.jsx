import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import MoodHistoryGraph from '../../components/MoodHistoryGraph';
import MoodSummary from '../../components/MoodSummary';
import Navbar from '../../components/layout/Navbar';
import { Link } from 'react-router-dom';
import { moodTips } from '../../utils/Tips';
import { moodColors } from '../../utils/moodColors';



const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const mood = useSelector((state) => state?.mood?.history);
    const latestMood = useSelector((state) => state?.checkIn?.checkInData); // today's mood
    console.log({ latestMood })
    // Step 2: Get a random tip based on the latest mood
    const todayTip = useMemo(() => {
        if (latestMood && moodTips[latestMood]) {
            const tips = moodTips[latestMood];
            return tips[Math.floor(Math.random() * tips.length)];
        }
        return "Take a moment to check in with yourself today.";
    }, [latestMood]);

    return (
        <>
            <Navbar />
            <motion.div
                className="min-h-screen bg-gray-50 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || user?.email}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Daily Check-in */}
                    <motion.div className="bg-white p-4 rounded-xl shadow-md" initial={{ y: 20 }} animate={{ y: 0 }}>
                        <h2 className="text-lg font-semibold mb-2">Daily Check-in</h2>

                        <p className="text-gray-500 mb-2">Keep track of your mood by checking in daily.</p>
                        <Link to="/check-in" className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block">
                            Check In Now
                        </Link>
                    </motion.div>

                    {/* Mood Summary */}
                    {mood && mood.length > 0 ? (
                        <motion.div className="bg-white p-4 rounded-xl shadow-md" initial={{ y: 20 }} animate={{ y: 0 }}>
                            <MoodSummary />
                        </motion.div>
                    ) : (
                        <motion.div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-center items-center text-center text-gray-500" initial={{ y: 20 }} animate={{ y: 0 }}>
                            <p>No mood summary available yet.</p>
                            <p className="mt-2">Start by checking in above 👆</p>
                        </motion.div>
                    )}

                    {/* Mood History */}
                    {mood && mood.length > 0 ? (
                        <motion.div className="bg-white p-4 rounded-xl shadow-md" initial={{ y: 20 }} animate={{ y: 0 }}>
                            <MoodHistoryGraph moodData={mood} />
                        </motion.div>
                    ) : (
                        <motion.div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-center items-center text-center text-gray-500" initial={{ y: 20 }} animate={{ y: 0 }}>
                            <p>No mood history to show.</p>
                            <p className="mt-2">Track your mood by checking in regularly.</p>
                        </motion.div>
                    )}

                    {/* Mental Health Tip - Updated */}
                    <motion.div
                        className={`max-w-md mx-auto my-8 p-6 rounded-2xl shadow-xl text-center text-gray-800 transition-all duration-300 ${latestMood === 'Happy' ? 'bg-yellow-100' :
                            latestMood === 'Sad' ? 'bg-blue-100' :
                                latestMood === 'Angry' ? 'bg-red-100' :
                                    latestMood === 'Anxious' ? 'bg-indigo-100' :
                                        latestMood === 'Excited' ? 'bg-pink-100' :
                                            latestMood === 'Neutral' ? 'bg-gray-100' :
                                                'bg-white'
                            }`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-2">🌟 Today's Tip</h2>
                        <p className="text-lg italic mb-4">"{todayTip}"</p>

                        {latestMood && (
                            <div className="text-sm font-medium mt-2">
                                <span className="text-gray-600">Based on your mood: </span>
                                <span className="px-2 py-1 rounded bg-white/40 backdrop-blur-md shadow-inner inline-block">
                                    {latestMood?.mood === 'Happy' && 'Keep spreading positivity! 😊'}
                                    {latestMood.mood === 'Sad' && 'Take it slow today. You got this. 💙'}
                                    {latestMood.mood === 'Angry' && 'Take a deep breath and pause. 😌'}
                                    {latestMood.mood === 'Anxious' && 'Try a short meditation today. 🧘‍♂️'}
                                    {latestMood.mood === 'Excited' && 'Channel that energy into something great! 🤩'}
                                    {latestMood.mood === 'Neutral' && 'A calm day is a good day too. 😌'}
                                </span>
                            </div>
                        )}

                        <Link
                            to="/tips"
                            className="mt-6 inline-block text-blue-600 font-semibold hover:underline"
                        >
                            🔍 View All Tips
                        </Link>
                    </motion.div>


                </div>
            </motion.div>
        </>
    );
};

export default Dashboard;
