'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { useRouter } from 'next/navigation';
import { FaUserPlus } from 'react-icons/fa';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSignup = async () => {
    const result = await dispatch(signup({ name, email, password }));
    if (signup.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
          />
        </div>
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
          onClick={handleSignup}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-200 flex items-center justify-center"
        >
          <FaUserPlus className="mr-2" />
          Sign Up
        </button>
        {authState.loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {authState.error && <p className="mt-4 text-red-600">Error: {authState.error}</p>}
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/auth/login" className="text-black underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
