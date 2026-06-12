import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const navigate = useNavigate();

  // 1. Get the user from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // 2. Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    window.location.href = "/login"; 
  };

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-4 gap-4">
      {/* Logo & Name */}
      <div className="flex items-center gap-2 ">
        <div className="flex items-center gap-2 text-2xl text-white">
          <GiGraduateCap className="text-5xl" />
          <span className="font-bold">NewLarn</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center justify-between gap-4">
        <ul className="flex items-center gap-5 ">
          
          <li className="list-none">
           <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          </li>
          
          <li className="list-none">
           <Link to="/courses" className="text-white hover:text-gray-400">Courses</Link>
          </li>

          {/* =========================================
              NEW: ROLE-BASED ADMIN LINK 
          ========================================= */}
          {storedUser && storedUser.role === 'instructor' && (
            <li className="list-none">
             <Link to="/Admindashboard" className="text-blue-400 font-bold hover:text-blue-300">
               Admin
             </Link>
            </li>
          )}

          <li className="list-none">
            {/* CONDITIONAL RENDERING FOR LOGIN/AVATAR */}
            {storedUser ? (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/dashboard">
                  {storedUser.profileImage ? (
                    <img 
                      src={storedUser.profileImage} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-blue-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white uppercase shadow-md">
                      {storedUser.name ? storedUser.name.charAt(0) : 'U'}
                    </div>
                  )}
                </Link>
                <button onClick={handleLogout} className="btn btn-neutral btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary btn-sm">Login</button>
              </Link>
            )}
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
