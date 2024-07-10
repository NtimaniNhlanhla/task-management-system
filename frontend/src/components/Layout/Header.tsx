import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice' 

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user.name;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/auth/login'; 
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-lg font-bold">Task Management</div>
      {isAuthenticated && (
        <div className="flex items-center">
          <span className="mr-4">{user.name}</span>
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
