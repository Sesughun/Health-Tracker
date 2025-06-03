'use client';

    import { useState } from 'react';
    import { getUser } from '../utils/storage';

    const Login = ({ onLogin }) => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.endsWith('@cu.edu.ng')) {
          setError('Email must end with @cu.edu.ng');
          return;
        }
        const user = getUser();
        if (user && user.email === email && user.password === password) {
          onLogin(user);
        } else {
          setError('Invalid email or password');
        }
      };

      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-4">
              <img src="/images/cu-logo.png" alt="Covenant University" className="h-16" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center">
              Don’t have an account?{' '}
              <button
                onClick={() => onLogin({ setCurrentPage: 'register' })}
                className="text-purple-600 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      );
    };

    export default Login;
