import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MoodHistoryGraph = ({ moodData }) => {
  const moodMap = {
    Excited: 6,
    Happy: 5,
    Anxious: 4,
    Neutral: 3,
    Angry: 2,
    Sad: 1,
  };

  const reverseMoodMap = Object.fromEntries(
    Object.entries(moodMap).map(([k, v]) => [v, k])
  );

  const moodColors = {
    Excited: '#ff69b4', // pink
    Happy: '#facc15',   // yellow
    Anxious: '#818cf8', // indigo
    Neutral: '#9ca3af', // gray
    Angry: '#f87171',   // red
    Sad: '#60a5fa',     // blue
  };

  const moodLabels = moodData.map((item) => item.date);
  const moodValues = moodData.map((item) => moodMap[item.mood] || 0);
  const moodTypes = moodData.map((item) => item.mood);

  const data = {
    labels: moodLabels,
    datasets: [
      {
        label: 'Moods Over Time',
        data: moodValues,
        borderColor: '#6366f1', // A neutral line color (e.g., indigo)
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: moodTypes.map((mood) => moodColors[mood] || '#000'), // color each point
        pointBorderColor: '#fff',
        fill: false,
        tension: 0.3,
      },
    ],
  };


  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Mood History</h2>
      <Line
        data={data}
        options={{

          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return reverseMoodMap[value] || value;
                },
                stepSize: 1,
              },
              min: 1,
              max: 6,
            },
          },
          plugins: {
            datalabels: {
              align: 'top',
              anchor: 'end',
              formatter: function (value, context) {
                const index = context.dataIndex;
                return moodTypes[index]; // Show mood label like Happy, Sad
              },
              color: function (context) {
                const index = context.dataIndex;
                const mood = moodTypes[index];
                return moodColors[mood] || '#000'; // Match label color to point
              },
              font: {
                weight: 'bold',
                size: 12,
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const moodValue = context.raw;
                  const moodLabel = reverseMoodMap[moodValue] || moodValue;
                  return `Mood: ${moodLabel}`;
                },
              },
            },
          },
          legend: {
            onClick: function (e, legendItem) {
              const index = legendItem.datasetIndex;
              const meta = this.chart.getDatasetMeta(index);
              meta.hidden = !meta.hidden; // Toggle visibility
              this.chart.update(); // Update chart after visibility change
            },
            labels: {
              fontSize: 14,
              usePointStyle: true,
            },
          },
        }}
      />
    </div>
  );
};

export default MoodHistoryGraph;
