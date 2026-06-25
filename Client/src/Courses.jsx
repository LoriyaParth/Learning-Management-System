import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses?status=Published');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="absolute top-24 left-0 right-0 w-full px-6">
      {/* 1. Header Text Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center">
          Explore Our Courses
        </h1>
        <p className="text-gray-400 text-lg text-center mb-8 md:whitespace-nowrap tracking-wide">
          Explore our curated courses to boost your skills and career. Whether you are a beginner or an expert, we have something for everyone.
        </p>
      </div>

      {/* 2. Scrollable Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full h-[65vh] overflow-y-auto pr-2 pb-12 custom-scrollbar">
        {loading ? (
          <div className="col-span-full text-center text-white text-xl py-12">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-xl py-12">
            No published courses available right now. Check back later!
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white flex flex-col justify-between"
            >
              <div>
                <figure className="px-6 pt-6">
                  <img
                    src={course.thumbnail || "https://placehold.co/600x400/1e293b/ffffff?text=Course+Thumbnail"}
                    alt={course.title}
                    className="rounded-xl w-full h-48 object-cover border border-gray-700"
                  />
                </figure>
                <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-xl font-bold line-clamp-1">{course.title}</h2>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {course.subtitle || course.description || "No description provided."}
                  </p>
                  <p className="text-blue-400 font-bold mt-2 text-lg">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                  </p>
                </div>
              </div>
              <div className="card-actions flex justify-center pb-4">
                <button
                  onClick={() => navigate(`/aboutcourse?id=${course._id}`)}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none px-6 py-2 rounded text-white font-semibold transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;