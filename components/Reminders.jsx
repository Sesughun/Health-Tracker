'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { getReminders, setReminders } from '../utils/storage';
import { generateUUID } from '../utils/uuid';

export default function Reminders({ profile, setCurrentPage }) {
  const [reminders, setRemindersState] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    setRemindersState(getReminders());
  }, []);

  const handleAddReminder = (e) => {
    e.preventDefault();
    const newReminder = { id: generateUUID(), title, time, frequency };
    const updatedReminders = [...reminders, newReminder];
    setRemindersState(updatedReminders);
    setReminders(updatedReminders);
    setTitle('');
    setTime(new Date().toISOString().slice(0, 16));
    setFrequency('');
  };

  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setRemindersState(updatedReminders);
    setReminders(updatedReminders);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Alerts/Reminders</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Add Reminder</h2>
          <form onSubmit={handleAddReminder}>
            <input
              type="text"
              placeholder="Reminder Title (e.g., Check Blood Sugar)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
            >
              Add Reminder
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Active Reminders</h2>
          {reminders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-purple-200">
                  <th className="p-2">Title</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Frequency</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <tr key={reminder.id} className="border-b">
                    <td className="p-2">{reminder.title}</td>
                    <td className="p-2">{new Date(reminder.time).toLocaleString()}</td>
                    <td className="p-2">{reminder.frequency}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
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
            <p>No reminders set</p>
          )}
        </div>
      </div>
    </div>
  );
}
