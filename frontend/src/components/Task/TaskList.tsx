import React, { useState } from 'react';
import { Task } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5); // Number of tasks per page

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter by type function
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    // Implement filter logic based on selected filter type
    // Example: filter by dueDate, priority, or status
    switch (e.target.value) {
      case 'dueDate':
        // Sort tasks by dueDate
        break;
      case 'priority':
        // Sort tasks by priority
        break;
      case 'status':
        // Sort tasks by status
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination logic based on filtered and searched tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination for filtered tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      {/* Search input */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by title, description, or status"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Filter dropdown */}
        <select
          className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="">Filter by...</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>
      {/* Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Title</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Description</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td className="py-2 px-4 border-b">{task.title}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {filteredTasks.length > tasksPerPage && (
        <div className="mt-4">
          <ul className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md focus:outline-none ${
                    currentPage === index + 1 ? 'bg-gray-300 text-gray-700' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
