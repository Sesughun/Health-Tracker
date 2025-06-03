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
import { getUser, setUser as storeUser, getProfile, setProfile as storeProfile } from '../utils/storage';

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
    storeUser(userData);
    setIsAuthenticated(true);
    setCurrentPage(getProfile() ? 'dashboard' : 'profile-setup');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    storeUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('profile-setup');
  };

  const handleProfileSetup = (profileData) => {
    setProfile(profileData);
    storeProfile(profileData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    storeUser(null);
    storeProfile(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const pages = {
    login: <Login onLogin={handleLogin} />,
    register: <Register onRegister={handleRegister} />,
    'profile-setup': <ProfileSetup onSetup={handleProfileSetup} />,
    dashboard: <Dashboard user={user} profile={profile} setCurrentPage={setCurrentPage} />,
    meals: <MealTracker profile={profile} setCurrentPage={setCurrentPage} />,
    metrics: <MetricsTracker profile={profile} setCurrentPage={setCurrentPage} />,
    reminders: <Reminders profile={profile} setCurrentPage={setCurrentPage} />,
    profile: <Profile user={user} profile={profile} setCurrentPage={setCurrentPage} />,
  };

  return (
    <div className="min-h-screen flex">
      {isAuthenticated && currentPage !== 'profile-setup' && (
        <Sidebar setCurrentPage={setCurrentPage} handleLogout={handleLogout} />
      )}
      <div className="flex-1 p-6">
        {pages[currentPage]}
      </div>
    </div>
  );
}
