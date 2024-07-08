"use client"

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import TaskForm from '../../../components/Task/TaskForm';
import { useRouter } from 'next/navigation';

const NewTaskPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-900 transition duration-200 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <TaskForm />
      </div>
    </div>
  );
};

export default NewTaskPage;
