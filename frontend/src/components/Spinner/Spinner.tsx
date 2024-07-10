import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;
