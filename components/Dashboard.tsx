'use client';

import Sidebar from './Sidebar';
import { getMeals, getMetrics, getReminders } from '../utils/storage';

export default function Dashboard({ user, profile, setCurrentPage }) {
  const meals = getMeals();
  const metrics = getMetrics();
  const reminders = getReminders();

  return (
    <div className="min-h-screen bg-purple-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Welcome, {user?.name || 'Student'}! {profile?.emoji || ''}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Health Summary</h2>
            <p><strong>Managing:</strong> {profile?.condition || 'N/A'}</p>
            <p><strong>Last Meal:</strong> {meals.length > 0 ? meals[meals.length - 1].name : 'None'}</p>
            <p><strong>Last Metric:</strong> {metrics.length > 0 ? `${metrics[metrics.length - 1].value} ${metrics[metrics.length - 1].type}` : 'None'}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Recent Alerts</h2>
            {reminders.length > 0 ? (
              reminders.slice(0, 3).map((reminder, index) => (
                <p key={index}>{reminder.title} at {new Date(reminder.time).toLocaleString()}</p>
              ))
            ) : (
              <p>No recent alerts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
