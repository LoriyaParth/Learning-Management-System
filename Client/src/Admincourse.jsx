import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Admincourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'instructor') {
      alert("Unauthorized access! Redirecting to home.");
      navigate('/');
      return;
    }

    const fetchInstructorCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses?instructor=${storedUser._id}`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching instructor courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorCourses();
  }, [navigate]);

  return (
    <div className="flex w-full min-h-screen font-sans bg-gray-100 rounded-2xl text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#f3f4f6] p-10 overflow-x-auto rounded-r-2xl">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Your Courses</h1>
          <Link to="/Addcourse">
            <button className="bg-[#4a90e2] hover:bg-[#357abd] text-white px-5 py-2.5 rounded shadow-sm font-medium transition-colors">
              Create Course
            </button>
          </Link>
        </div>

        {/* Table Area */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">You have not created any courses yet.</p>
              <Link to="/Addcourse">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors">
                  Create First Course
                </button>
              </Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-gray-400 font-semibold border-b border-gray-200">
                  <th className="pb-4 font-medium pl-2 w-1/2">Course</th>
                  <th className="pb-4 font-medium w-1/6">Price</th>
                  <th className="pb-4 font-medium w-1/6">Status</th>
                  <th className="pb-4 font-medium text-right pr-4 w-1/6">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-4">
                        <img 
                          src={course.thumbnail || 'https://placehold.co/120x80/2c3e50/FFFFFF?text=Course'} 
                          alt={course.title} 
                          className="w-[120px] h-[75px] object-cover rounded shadow-sm border border-gray-200"
                        />
                        <span className="text-gray-800 font-semibold">{course.title}</span>
                      </div>
                    </td>

                    <td className="py-4 text-gray-700 font-medium">
                      {course.price === 0 ? "Free" : `₹${course.price}`}
                    </td>

                    <td className="py-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${
                        course.status === 'Published' 
                          ? 'bg-[#e2f5ec] text-[#2ec071]' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>

                    <td className="py-4 text-right pr-4">
                      <button 
                        onClick={() => navigate(`/coursedetail?id=${course._id}`)}
                        className="text-blue-500 hover:text-blue-700 transition-colors inline-flex items-center gap-1 font-semibold"
                      >
                        <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admincourses;