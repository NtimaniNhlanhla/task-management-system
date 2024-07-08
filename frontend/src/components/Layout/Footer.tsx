import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 text-center">
      &copy; {new Date().getFullYear()} Task Management App. All rights reserved.
    </footer>
  );
};

export default Footer;
