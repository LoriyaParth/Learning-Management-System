import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  // Get the current URL path
  const location = useLocation();
  const currentPath = location.pathname;

  // Define our base classes and our active/inactive classes
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-lg font-semibold";
  const activeClasses = "bg-[#1a1f2b] text-white shadow-inner";
  const inactiveClasses = "hover:bg-gray-700 hover:text-white text-gray-300";

  return (
    <div className="w-64 bg-[#2b3240] text-gray-300 flex flex-col py-6 shadow-xl z-10 flex-shrink-0 min-h-screen">
      <div className="flex flex-col gap-2 px-4">
        
        {/* Dashboard Link */}
        <Link 
          to="/Admindashboard" 
          className={`${baseClasses} ${currentPath === '/Admindashboard' ? activeClasses : inactiveClasses}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </Link>

        {/* Course Link */}
        <Link 
          to="/Admincourse" 
          className={`${baseClasses} ${currentPath === '/Admincourse' ? activeClasses : inactiveClasses}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Course
        </Link>
        
      </div>
    </div>
  );
};

export default Sidebar;