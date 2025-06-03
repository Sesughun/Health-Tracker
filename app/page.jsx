'use client';

    import { useState, useEffect } from 'react';
    import Login from '../components/Login';
    import Register from '../components/Register';
    import ProfileSetup from '../components/ProfileSetup';
    import Dashboard from '../components/Dashboard';
    import Sidebar from '../components/Sidebar';
    import MealTracker from '../components/MealTracker';
    import MetricsTracker from '../components/MetricsTracker';
    import Reminders from '../components/Reminders';
    import Profile from '../components/Profile';
    import { getUser, setUser, getProfile, setProfile } from '../utils/storage';

    export default function Home() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [currentPage, setCurrentPage] = useState('login');
      const [user, setUser] = useState(null);
      const [profile, setProfile] = useState(null);

      useEffect(() => {
        const storedUser = getUser();
        const storedProfile = getProfile();
        if (storedUser) {
          setUser(storedUser);
          setProfile(storedProfile);
          setIsAuthenticated(true);
          setCurrentPage(storedProfile ? 'dashboard' : 'profile-setup');
        }
      }, []);

      const handleLogin = (userData) => {
        setUser(userData);
        setUser(userData);
        setIsAuthenticated(true);
        setCurrentPage(getProfile() ? 'dashboard' : 'profile-setup');
      };

      const handleRegister = (userData) => {
        setUser(userData);
        setUser(userData);
        setIsAuthenticated(true);
        setCurrentPage('profile-setup');
      };

      const handleProfileSetup = (profileData) => {
        setProfile(profileData);
        setProfile(profileData);
        setCurrentPage('dashboard');
      };

      const handleLogout = () => {
        setUser(null);
        setProfile(null);
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        setCurrentPage('login');
      };

      return (
        <div className="min-h-screen flex">
          {isAuthenticated && currentPage !== 'profile-setup' && (
            <Sidebar setCurrentPage={setCurrentPage} handleLogout={handleLogout} />
          )}
          <div className="flex-1 p-6">
            {currentPage === 'login' && <Login onLogin={handleLogin} />}
            {currentPage === 'register' && <Register onRegister={handleRegister} />}
            {currentPage === 'profile-setup' && (
              <ProfileSetup onSetup={handleProfileSetup} />
            )}
            {currentPage === 'dashboard' && (
              <Dashboard user={user} profile={profile} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'meals' && (
              <MealTracker profile={profile} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'metrics' && (
              <MetricsTracker profile={profile} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'reminders' && (
              <Reminders profile={profile} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'profile' && (
              <Profile user={user} profile={profile} setCurrentPage={setCurrentPage} />
            )}
          </div>
        </div>
      );
    }
