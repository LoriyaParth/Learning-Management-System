import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Admindashboard = () => {
  return (
    // Added w-full and changed h-screen to min-h-screen
    <div className="flex w-full min-h-screen bg-[#f8f9fa] font-sans rounded-2xl">
      
      {/* Sidebar - Added flex-shrink-0 so it never squishes */}
    <Sidebar/>

      {/* Main Content Area - Added w-full */}
      <div className="flex-1 w-full p-8 overflow-y-auto ">
        {/* Note: max-w-6xl keeps the content from getting too stretched on huge monitors. 
            Change it to w-full if you want it to stretch edge-to-edge. */}
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-[#3b82f6] rounded-xl p-8 text-white shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Welcome back, Rohit Singh!</h1>
            <button className="bg-white text-[#3b82f6] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm">
              Browse New Courses
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">5</h2>
              <p className="text-sm text-gray-500 mt-1">Total Enrolled Courses</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">12</h2>
              <p className="text-sm text-gray-500 mt-1">Completed Assignments</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">3</h2>
              <p className="text-sm text-gray-500 mt-1">Pending Quizzes</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">2</h2>
              <p className="text-sm text-gray-500 mt-1">Purchased Courses</p>
            </div>
          </div>

          {/* Active Courses Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Active Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((courseNum) => (
                <div key={courseNum} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4">Course {courseNum}</h4>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-[#3b82f6] h-2 rounded-full" 
                      style={{ width: `${courseNum === 1 ? '15%' : courseNum === 2 ? '45%' : '80%'}` }}
                    ></div>
                  </div>
                  
                  <button className="w-full bg-[#3b82f6] text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="font-medium text-gray-700">Assignment 1</span>
                <span className="text-sm text-gray-500">Due: Jan 15, 2025</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="font-medium text-gray-700">Quiz 2</span>
                <span className="text-sm text-gray-500">Due: Jan 18, 2025</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admindashboard;