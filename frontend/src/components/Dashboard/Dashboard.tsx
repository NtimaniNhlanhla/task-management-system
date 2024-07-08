'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TaskList from '../../components/Task/TaskList';
import { Task } from '../../types/task';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    // Fetch tasks on initial load
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = () => {
    router.push('/tasks/new');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Welcome to the Dashboard!</h1>
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Add New Task
          </button>
        </div>
        <TaskList tasks={tasks} /> {/* Pass tasks array as prop */}
      </div>
    </div>
  );
};

export default Dashboard;