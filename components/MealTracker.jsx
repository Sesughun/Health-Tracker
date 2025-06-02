'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { getMeals, setMeals } from '../utils/storage';
import { recommendedMeals } from '../data/meals';
import { generateUUID } from '../utils/uuid';

export default function MealTracker({ profile, setCurrentPage }) {
  const [meals, setMealsState] = useState([]);
  const [mealName, setMealName] = useState('');
  const [portion, setPortion] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    setMealsState(getMeals());
  }, []);

  const handleAddMeal = (e) => {
    e.preventDefault();
    const newMeal = { id: generateUUID(), name: mealName, portion, notes, date };
    const updatedMeals = [...meals, newMeal];
    setMealsState(updatedMeals);
    setMeals(updatedMeals);
    setMealName('');
    setPortion('');
    setNotes('');
    setDate(new Date().toISOString().slice(0, 16));
  };

  const handleDeleteMeal = (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMealsState(updatedMeals);
    setMeals(updatedMeals);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Meal Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Log a Meal</h2>
            <form onSubmit={handleAddMeal}>
              <input
                type="text"
                placeholder="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Portion Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
              >
                Add Meal
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Recommended Meals</h2>
            {recommendedMeals[profile?.condition]?.map((meal, index) => (
              <div key={index} className="mb-4 flex items-center">
                <img src={meal.image} alt={meal.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h3 className="font-semibold">{meal.name}</h3>
                  <p>{meal.description}</p>
                  <p className="text-sm text-gray-600">Benefits: {meal.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Meal History</h2>
          {meals.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-purple-200">
                  <th className="p-2">Date</th>
                  <th className="p-2">Meal</th>
                  <th className="p-2">Portion</th>
                  <th className="p-2">Notes</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="border-b">
                    <td className="p-2">{new Date(meal.date).toLocaleString()}</td>
                    <td className="p-2">{meal.name}</td>
                    <td className="p-2">{meal.portion}</td>
                    <td className="p-2">{meal.notes}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
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
            <p>No meals logged yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
