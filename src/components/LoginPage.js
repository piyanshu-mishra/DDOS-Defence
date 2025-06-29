import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-poppins flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">DDoS Defence</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-green-400 border border-green-600 rounded focus:outline-none focus:border-green-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-green-400 border border-green-600 rounded focus:outline-none focus:border-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-black py-2 rounded hover:bg-green-500 transition-colors">
            <a href="/dashboard">Login</a>
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-400 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

