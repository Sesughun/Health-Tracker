'use client';

import { clearUser } from '../utils/storage';

export default function Sidebar({ setCurrentPage }) {
  return (
    <div className="w-64 bg-purple-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">CU Health Tracker</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => setCurrentPage('dashboard')} className="block py-2 hover:bg-purple-700 rounded">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('meals')} className="block py-2 hover:bg-purple-700 rounded">
              Meal Tracker
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('metrics')} className="block py-2 hover:bg-purple-700 rounded">
              Health Metrics
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('reminders')} className="block py-2 hover:bg-purple-700 rounded">
              Alerts/Reminders
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('profile')} className="block py-2 hover:bg-purple-700 rounded">
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                clearUser();
                setCurrentPage('login');
              }}
              className="block py-2 hover:bg-purple-700 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
