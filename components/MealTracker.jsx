'use client';

    import { useState } from 'react';
    import recommendedMeals from '../data/meals';

    const MealTracker = ({ profile, setCurrentPage }) => {
      const [mealName, setMealName] = useState('');
      const [portionSize, setPortionSize] = useState('');
      const [meals, setMeals] = useState(JSON.parse(localStorage.getItem('meals')) || []);

      const handleSubmit = (e) => {
        e.preventDefault();
        const newMeal = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString(),
          mealName,
          portionSize,
        };
        const updatedMeals = [...meals, newMeal];
        setMeals(updatedMeals);
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
        setMealName('');
        setPortionSize('');
      };

      const handleDelete = (id) => {
        const updatedMeals = meals.filter((meal) => meal.id !== id);
        setMeals(updatedMeals);
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
      };

      const conditionMeals = profile ? recommendedMeals[profile.condition] : [];

      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-800">Track Your Meals</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700">Meal Name</label>
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter meal name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700">Portion Size</label>
              <select
                value={portionSize}
                onChange={(e) => setPortionSize(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select portion size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Log Meal
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-800">Meal History</h3>
            {meals.length === 0 ? (
              <p>No meals logged yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Time</th>
                    <th className="border p-2 text-left">Meal Name</th>
                    <th className="border p-2 text-left">Portion Size</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal) => (
                    <tr key={meal.id}>
                      <td className="border p-2">{meal.date}</td>
                      <td className="border p-2">{meal.time}</td>
                      <td className="border p-2">{meal.mealName}</td>
                      <td className="border p-2">{meal.portionSize}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleDelete(meal.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {conditionMeals.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-800">
                Recommended Meals for {profile.condition}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conditionMeals.map((meal) => (
                  <div key={meal.name} className="p-4 bg-purple-100 rounded-lg flex items-center">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{meal.name}</h4>
                      <p className="text-sm text-gray-600">{meal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    export default MealTracker;
