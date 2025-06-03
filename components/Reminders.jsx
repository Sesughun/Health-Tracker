'use client';

    import { useState } from 'react';

    const Reminders = ({ profile, setCurrentPage }) => {
      const [reminderText, setReminderText] = useState('');
      const [reminderTime, setReminderTime] = useState('');
      const [reminders, setReminders] = useState(JSON.parse(localStorage.getItem('reminders')) || []);

      const handleSubmit = (e) => {
        e.preventDefault();
        const newReminder = {
          id: Date.now().toString(),
          text: reminderText,
          time: reminderTime,
        };
        const updatedReminders = [...reminders, newReminder];
        setReminders(updatedReminders);
        localStorage.setItem('reminders', JSON.stringify(updatedReminders));
        setReminderText('');
        setReminderTime('');
      };

      const handleDelete = (id) => {
        const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
        setReminders(updatedReminders);
        localStorage.setItem('reminders', JSON.stringify(updatedReminders));
      };

      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-800">Set Reminders</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700">Reminder Text</label>
              <input
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter reminder text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700">Reminder Time</label>
              <input
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Set Reminder
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-800">Your Reminders</h3>
            {reminders.length === 0 ? (
              <p>No reminders set yet.</p>
            ) : (
              <ul className="space-y-2">
                {reminders.map((reminder) => (
                  <li key={reminder.id} className="p-4 bg-purple-100 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{reminder.text}</p>
                      <p className="text-sm text-gray-600">{new Date(reminder.time).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    };

    export default Reminders;
