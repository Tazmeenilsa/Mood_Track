import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const moodColors = {
    Happy: 'bg-green-100 text-green-700',
    Sad: 'bg-blue-100 text-blue-700',
    Angry: 'bg-red-100 text-red-700',
    Anxious: 'bg-yellow-100 text-yellow-800',
    Neutral: 'bg-gray-100 text-gray-700',
    Excited: 'bg-pink-100 text-pink-800',

};

const MoodSummary = () => {
    const moodHistory = useSelector((state) => state?.mood?.history || []);
    const latestMood = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1] : null;

    const moodCounts = moodHistory.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {});

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Mood Summary</h2>

            {latestMood ? (
                <>
                    <div className={`inline-block px-4 py-2 rounded-full font-medium mb-4 ${moodColors[latestMood.mood] || 'bg-gray-200 text-gray-700'}`}>
                        Today's Mood: {latestMood.mood}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
                        {Object.entries(moodCounts).map(([mood, count]) => (
                            <div
                                key={mood}
                                className={`flex items-center px-3 py-2 rounded-md ${moodColors[mood] || 'bg-gray-200 text-gray-700'}`}
                            >
                                <span className="font-semibold mr-2">{mood}</span>
                                <span className="ml-auto">{count} {count === 1 ? 'time' : 'times'}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500">You haven't checked in yet. Your mood is Neutral by default.</p>
            )}
        </>
    );
};

export default MoodSummary;
