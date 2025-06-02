'use client';

import { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import ProfileSetup from '../components/ProfileSetup';
import Dashboard from '../components/Dashboard';
import MealTracker from '../components/MealTracker';
import MetricsTracker from '../components/MetricsTracker';
import Reminders from '../components/Reminders';
import Profile from '../components/Profile';
import { getUser, setUser } from '../utils/storage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUserState] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUserState(storedUser);
      setIsLoggedIn(true);
      setCurrentPage(storedUser.profile ? 'dashboard' : 'profileSetup');
    }
  }, []);

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  return (
    <div className="bg-ankara min-h-screen">
      {currentPage === 'login' && <Login setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} setUser={setUserState} />}
      {currentPage === 'register' && <Register setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} setUser={setUserState} />}
      {currentPage === 'profileSetup' && <ProfileSetup setProfile={setProfile} setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard user={user} profile={profile} setCurrentPage={setCurrentPage} />}
      {currentPage === 'meals' && <MealTracker profile={profile} setCurrentPage={setCurrentPage} />}
      {currentPage === 'metrics' && <MetricsTracker profile={profile} setCurrentPage={setCurrentPage} />}
      {currentPage === 'reminders' && <Reminders profile={profile} setCurrentPage={setCurrentPage} />}
      {currentPage === 'profile' && <Profile user={user} profile={profile} setCurrentPage={setCurrentPage} />}
    </div>
  );
}
