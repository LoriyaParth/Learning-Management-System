import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Admindashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'instructor') {
      alert("Unauthorized access!");
      navigate('/');
      return;
    }
    setUserData(storedUser);

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses?instructor=${storedUser._id}`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (!userData) {
    return <div className="text-center pt-20">Loading dashboard...</div>;
  }

  // Calculate metrics
  const totalCourses = courses.length;
  const totalEnrolled = courses.reduce((acc, course) => acc + (course.enrolledStudents ? course.enrolledStudents.length : 0), 0);
  const publishedCourses = courses.filter(c => c.status === 'Published').length;
  const draftCourses = totalCourses - publishedCourses;

  return (
    <div className="flex w-full min-h-screen bg-[#f8f9fa] font-sans rounded-2xl text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 w-full p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-[#3b82f6] rounded-xl p-8 text-white shadow-sm flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {userData.name}!</h1>
              <p className="text-sm opacity-90">Manage your students, lectures, and published content here.</p>
            </div>
            <Link to="/courses">
              <button className="bg-white text-[#3b82f6] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm">
                View Student Portal
              </button>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{totalCourses}</h2>
              <p className="text-sm text-gray-500 mt-1">Total Courses Created</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{totalEnrolled}</h2>
              <p className="text-sm text-gray-500 mt-1">Total Students Enrolled</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{publishedCourses}</h2>
              <p className="text-sm text-gray-500 mt-1">Published Courses</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{draftCourses}</h2>
              <p className="text-sm text-gray-500 mt-1">Draft Courses</p>
            </div>
          </div>

          {/* Instructor Courses Overview */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Courses Overview</h3>
            {loading ? (
              <p className="text-gray-500">Loading courses overview...</p>
            ) : courses.length === 0 ? (
              <p className="text-gray-500">No courses to display. Create one using the menu!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course) => {
                  const enrollCount = course.enrolledStudents ? course.enrolledStudents.length : 0;
                  return (
                    <div key={course._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2 line-clamp-1">{course.title}</h4>
                        <p className="text-xs text-gray-500 mb-4">{course.status}</p>
                        
                        {/* Progress Bar (Representing enrollment popularity vs target of 50 students) */}
                        <div className="text-xs text-gray-600 mb-1 flex justify-between">
                          <span>Students enrolled:</span>
                          <span>{enrollCount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                          <div 
                            className="bg-[#3b82f6] h-2 rounded-full" 
                            style={{ width: `${Math.min((enrollCount / 20) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => navigate(`/coursedetail?id=${course._id}`)}
                        className="w-full bg-[#3b82f6] text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Edit Details
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;