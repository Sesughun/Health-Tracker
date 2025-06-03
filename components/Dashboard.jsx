'use client';

    import { useState, useEffect } from 'react';
    import { Line } from 'react-chartjs-2';
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const Dashboard = ({ user, profile, setCurrentPage }) => {
      const meals = JSON.parse(localStorage.getItem('meals')) || [];
      const metrics = JSON.parse(localStorage.getItem('metrics')) || [];

      const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Blood Sugar (mg/dL)',
            data: [],
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.5)',
          },
        ],
      });

      useEffect(() => {
        const labels = metrics.map((metric) => `${metric.date} ${metric.time}`);
        const bloodSugarData = metrics.map((metric) => metric.bloodSugar);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Blood Sugar (mg/dL)',
              data: bloodSugarData,
              borderColor: 'rgb(147, 51, 234)',
              backgroundColor: 'rgba(147, 51, 234, 0.5)',
            },
          ],
        });
      }, []);

      const lastMeal = meals.length > 0 ? meals[meals.length - 1] : null;
      const lastMetric = metrics.length > 0 ? metrics[metrics.length - 1] : null;

      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-purple-800">
            Welcome, {user.name}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-purple-800">Your Profile</h2>
              <p>Age: {profile.age}</p>
              <p>Gender: {profile.gender === 'male' ? '🧑' : '👩'}</p>
              <p>Condition: {profile.condition}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-purple-800">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage('meals')}
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                  Log a Meal
                </button>
                <button
                  onClick={() => setCurrentPage('metrics')}
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                  Track Metrics
                </button>
                <button
                  onClick={() => setCurrentPage('reminders')}
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                  Set Reminder
                </button>
              </div>
            </div>
            {lastMeal && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2 text-purple-800">Last Meal</h2>
                <p>Meal: {lastMeal.mealName}</p>
                <p>Portion: {lastMeal.portionSize}</p>
                <p>Date: {lastMeal.date}</p>
                <p>Time: {lastMeal.time}</p>
              </div>
            )}
            {lastMetric && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2 text-purple-800">Last Metric</h2>
                <p>Blood Sugar: {lastMetric.bloodSugar} mg/dL</p>
                <p>Weight: {lastMetric.weight} kg</p>
                <p>Pain Level: {lastMetric.painLevel}</p>
                <p>Date: {lastMetric.date}</p>
                <p>Time: {lastMetric.time}</p>
              </div>
            )}
            {metrics.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
                <h2 className="text-lg font-semibold mb-2 text-purple-800">Blood Sugar Trend</h2>
                <Line data={chartData} />
              </div>
            )}
          </div>
        </div>
      );
    };

    export default Dashboard;
