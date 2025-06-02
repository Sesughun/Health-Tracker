'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login({ setIsLoggedIn, setCurrentPage, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'student@cu.edu.ng' && password === 'password123') {
      setUser({ email });
      setIsLoggedIn(true);
      setCurrentPage('profileSetup');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img src="/images/cu-logo.png" alt="CU Logo" className="mx-auto mb-6 w-24" />
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">CU Health Tracker</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email (e.g., student@cu.edu.ng)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700">Remember Me</label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link href="#" onClick={() => setCurrentPage('register')} className="text-purple-600 hover:underline">
            Sign Up
          </Link>
          {' | '}
          <Link href="#" className="text-purple-600 hover:underline">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}
