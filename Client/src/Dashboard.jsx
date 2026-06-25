import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SimpleDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    // 1. Check local storage for the logged-in user
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserData(storedUser); // Save to React state
      
      // Fetch enrolled courses
      const fetchEnrolledCourses = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/courses?enrolledStudentId=${storedUser._id}`);
          if (response.ok) {
            const data = await response.json();
            setEnrolledCourses(data);
          }
        } catch (error) {
          console.error("Error fetching enrolled courses:", error);
        } finally {
          setLoadingCourses(false);
        }
      };

      fetchEnrolledCourses();
    } else {
      // If no user is found, kick them back to the login page!
      navigate('/login');
    }
  }, [navigate]);

  // If the data is still loading, show a blank screen or a spinner
  if (!userData) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen p-4 md:p-8 font-sans w-full max-w-5xl">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* =========================================
            1. THE PROFILE CARD
        ========================================= */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-700 flex flex-col md:flex-row gap-6 items-center md:items-start">
          
          <div className="flex-shrink-0">
             {/* Check if profileImage exists. If yes, show image. If no, show initials */}
             {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800" />
             ) : (
                <div className="w-28 h-28 rounded-full ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800 bg-blue-600 flex items-center justify-center text-5xl font-bold text-white uppercase">
                  {userData.name.charAt(0)}
                </div>
             )}
          </div>

          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-blue-500 mb-2">Welcome, {userData.name}!</h1>
            <p className="text-gray-300 mb-1"><span className="font-bold text-white">Email:</span> {userData.email}</p>
            <p className="text-gray-300 mb-1"><span className="font-bold text-white">Role:</span> {userData.role || 'student'}</p>
            <p className="text-gray-300 mb-4"><span className="font-bold text-white">Bio:</span> {userData.bio || 'Edit your profile to add a bio.'}</p>
            
            <Link to="/editprofile">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* =========================================
            2. THE COURSES SECTION
        ========================================= */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Your Enrolled Courses</h2>

          {loadingCourses ? (
            <div className="text-center text-gray-400 py-8">Loading enrolled courses...</div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="mb-4">You have not enrolled in any courses yet.</p>
              <Link to="/courses">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Explore Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/aboutcourse?id=${course._id}`)}
                  className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={course.thumbnail || "https://placehold.co/600x400/1e293b/ffffff?text=Course"}
                      alt={course.title}
                      className="rounded-xl w-full h-40 object-cover border border-gray-800"
                    />
                  </figure>
                  <div className="card-body items-center text-center p-4">
                    <h3 className="card-title text-lg font-bold line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                      {course.subtitle || course.description || "Click to view lectures."}
                    </p>
                    <span className="text-blue-400 text-xs font-bold mt-2 uppercase tracking-wider block">
                      {course.lectures ? `${course.lectures.length} Lectures` : "0 Lectures"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}