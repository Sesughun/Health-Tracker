'use client';

    import { useState } from 'react';
    import { setProfile } from '../utils/storage';

    const ProfileSetup = ({ onSetup }) => {
      const [age, setAge] = useState('');
      const [gender, setGender] = useState('');
      const [condition, setCondition] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!age || !gender || !condition) {
          setError('All fields are required');
          return;
        }
        const profileData = { age, gender, condition };
        setProfile(profileData);
        onSetup(profileData);
      };

      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
              Setup Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700">Age</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select your age</option>
                  {Array.from({ length: 11 }, (_, i) => i + 15).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700">
                  Health Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select your condition</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="ulcers">Ulcers</option>
                  <option value="hypertension" disabled title="Only Diabetes and Ulcers are supported">
                    Hypertension
                  </option>
                </select>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      );
    };

    export default ProfileSetup;
