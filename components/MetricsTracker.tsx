'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from './Sidebar';
import { getMetrics, setMetrics } from '../utils/storage';
import { generateUUID } from '../utils/uuid';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MetricsTracker({ profile, setCurrentPage }) {
  const [metrics, setMetricsState] = useState([]);
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [painLevel, setPainLevel] = useState(1);

  useEffect(() => {
    setMetricsState(getMetrics());
  }, []);

  const handleAddMetric = (e) => {
    e.preventDefault();
    const newMetric = {
      id: generateUUID(),
      value: profile.condition === 'diabetes' ? value : painLevel,
      notes,
      date,
      type: profile.condition === 'diabetes' ? 'Blood Sugar (mg/dL)' : 'Pain Level (1-10)',
    };
    const updatedMetrics = [...metrics, newMetric];
    setMetricsState(updatedMetrics);
    setMetrics(updatedMetrics);
    setValue('');
    setPainLevel(1);
    setNotes('');
    setDate(new Date().toISOString().slice(0, 16));
  };

  const handleDeleteMetric = (id) => {
    const updatedMetrics = metrics.filter((metric) => metric.id !== id);
    setMetricsState(updatedMetrics);
    setMetrics(updatedMetrics);
  };

  const chartData = {
    labels: metrics.slice(-7).map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: profile.condition === 'diabetes' ? 'Blood Sugar (mg/dL)' : 'Pain Level (1-10)',
        data: metrics.slice(-7).map((m) => m.value),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-purple-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Health Metrics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Log a Metric</h2>
            <form onSubmit={handleAddMetric}>
              {profile.condition === 'diabetes' ? (
                <input
                  type="number"
                  placeholder="Blood Sugar (mg/dL)"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Pain Level (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={painLevel}
                    onChange={(e) => setPainLevel(e.target.value)}
                    className="w-full"
                  />
                  <span>{painLevel}</span>
                </div>
              )}
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Notes (e.g., Before breakfast, Spicy food)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
              >
                Add Metric
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Metrics Trend (Last 7 Days)</h2>
            {metrics.length > 0 ? (
              <Line data={chartData} />
            ) : (
              <p>No metrics logged yet</p>
            )}
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Metrics History</h2>
          {metrics.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-purple-200">
                  <th className="p-2">Date</th>
                  <th className="p-2">Metric</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Notes</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.id} className="border-b">
                    <td className="p-2">{new Date(metric.date).toLocaleString()}</td>
                    <td className="p-2">{metric.type}</td>
                    <td className="p-2">{metric.value}</td>
                    <td className="p-2">{metric.notes}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteMetric(metric.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No metrics logged yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
