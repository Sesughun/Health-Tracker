'use client';

    const Sidebar = ({ setCurrentPage, handleLogout }) => {
      const navItems = [
        { name: 'Dashboard', page: 'dashboard' },
        { name: 'Meal Tracker', page: 'meals' },
        { name: 'Metrics Tracker', page: 'metrics' },
        { name: 'Reminders', page: 'reminders' },
        { name: 'Profile', page: 'profile' },
      ];

      return (
        <div className="w-64 bg-purple-200 h-screen p-4">
          <h2 className="text-xl font-bold mb-6 text-purple-800">CU Health Tracker</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className="w-full text-left p-2 rounded-md hover:bg-purple-300 text-purple-800"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 rounded-md hover:bg-purple-300 text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      );
    };

    export default Sidebar;
