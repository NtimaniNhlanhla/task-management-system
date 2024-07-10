import React, { useState } from 'react';
import { Task } from '../../types/task';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit task
  const handleEdit = (taskId: number) => {
    router.push(`/tasks/edit/${taskId}`);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate number of outstanding tasks
  const outstandingTasks = tasks.filter((task) => task.status !== 'completed').length;

  // Handle delete task
  const handleDelete = async (taskId: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTaskToDelete(null);
      setShowDeleteConfirmation(false);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show delete confirmation popup
  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteConfirmation(true);
  };

  // Close delete confirmation popup
  const closeDeleteConfirmation = () => {
    setTaskToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="overflow-x-auto">
      {/* Outstanding tasks count */}
      <div className="mb-4">
        <p className="text-gray-500 mb-2">
          Outstanding Tasks: {outstandingTasks}
        </p>
        <input
          type="text"
          placeholder="Search by title, description, or status"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table */}
      {loading ? (
        <Spinner /> 
      ) : (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Title</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Description</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Due Date</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Status</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Priority</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Days Remaining</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => {
            const daysRemaining = differenceInDays(new Date(task.dueDate), new Date());
            return (
              <tr key={task.id}>
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.description}</td>
                <td className="py-2 px-4 border-b">{format(new Date(task.dueDate), 'dd MMM yyyy')}</td>
                <td className="py-2 px-4 border-b">{task.status}</td>
                <td className="py-2 px-4 border-b">{task.priority}</td>
                <td className="py-2 px-4 border-b">{daysRemaining >= 0 ? daysRemaining : 0}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button onClick={() => handleEdit(task.id ?? 0)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => confirmDelete(task)} className="text-red-500 hover:text-red-700">
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      )}

      {/* Delete confirmation popup */}
      {showDeleteConfirmation && taskToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this task?</h2>
            <p className="mb-4">Title: {taskToDelete.title}</p>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(taskToDelete.id ?? 0)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
