'use client';

import Sidebar from './Sidebar';

export default function Profile({ user, profile, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-purple-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Your Information</h2>
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{profile?.emoji || '🧑'}</span>
            <div>
              <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Student ID:</strong> {user?.studentId || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            </div>
          </div>
          <p><strong>Age:</strong> {profile?.age || 'N/A'}</p>
          <p><strong>Gender:</strong> {profile?.gender || 'N/A'}</p>
          <p><strong>Height:</strong> {profile?.height || 'N/A'} cm</p>
          <p><strong>Weight:</strong> {profile?.weight || 'N/A'} kg</p>
          <p><strong>Condition:</strong> {profile?.condition || 'N/A'}</p>
          <button
            onClick={() => setCurrentPage('profileSetup')}
            className="mt-4 bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
