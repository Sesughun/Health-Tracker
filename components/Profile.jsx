'use client';

    const Profile = ({ user, profile, setCurrentPage }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-800">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {profile.age}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{' '}
              {profile.gender === 'male' ? '🧑' : '👩'}
            </p>
            <p>
              <span className="font-semibold">Condition:</span> {profile.condition}
            </p>
          </div>
        </div>
      );
    };

    export default Profile;
