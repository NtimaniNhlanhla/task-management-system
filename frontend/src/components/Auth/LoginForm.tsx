'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { useRouter } from 'next/navigation';
import { FaSignInAlt } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleLogin = async () => {
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-200 flex items-center justify-center"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </button>
        {authState.loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {authState.error && <p className="mt-4 text-red-600">Error: {authState.error}</p>}
        <p className="mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-black underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
