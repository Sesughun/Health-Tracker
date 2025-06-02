'use client';

import { useState } from 'react';
import { setProfile as saveProfile } from '../utils/storage';

export default function ProfileSetup({ setProfile, setCurrentPage }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!age || !gender || !height || !weight || !condition) {
      setError('All fields are required');
      return;
    }
    const profileData = { age, gender, height, weight, condition, emoji: gender === 'Male' ? '🧑' : gender === 'Female' ? '👩' : '🧑‍🦰' };
    setProfile(profileData);
    saveProfile(profileData);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Profile Setup</h1>
        <form onSubmit={handleSave}>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Age</option>
            {[...Array(11).keys()].map((i) => (
              <option key={i} value={15 + i}>{15 + i}</option>
            ))}
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Health Condition</label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="condition"
                  value="diabetes"
                  onChange={(e) => setCondition(e.target.value)}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Diabetes</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="condition"
                  value="ulcers"
                  onChange={(e) => setCondition(e.target.value)}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Ulcers</span>
              </label>
              <label className="inline-flex items-center" title="Only Diabetes and Ulcers are supported">
                <input type="radio" name="condition" disabled className="form-radio text-gray-400" />
                <span className="ml-2 text-gray-400">Hypertension</span>
              </label>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
}
