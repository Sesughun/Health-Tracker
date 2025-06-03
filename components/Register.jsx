'use client';

    import { useState } from 'react';
    import { setUser } from '../utils/storage';

    const Register = ({ onRegister }) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.endsWith('@cu.edu.ng')) {
          setError('Email must end with @cu.edu.ng');
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const user = { name, email, password };
        setUser(user);
        onRegister(user);
      };

      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-4">
              <img src="/images/cu-logo.png" alt="Covenant University" className="h-16" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button
                onClick={() => onRegister({ setCurrentPage: 'login' })}
                className="text-purple-600 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      );
    };

    export default Register;
