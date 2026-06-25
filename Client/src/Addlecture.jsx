import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddLecture = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get courseId from query params
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');

  const [course, setCourse] = useState(null);
  const [lectureTitle, setLectureTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCourseLectures = async () => {
    if (!courseId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        alert("Course not found!");
        navigate('/admincourse');
      }
    } catch (error) {
      console.error("Error fetching course lectures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseLectures();
  }, [courseId]);

  const handleCreateLecture = async () => {
    if (!lectureTitle.trim()) {
      alert("Please enter a lecture title!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lectures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: lectureTitle,
          description: "New lecture",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Default placeholder video
          isFree: false
        }),
      });

      if (response.ok) {
        alert("Lecture added successfully!");
        setLectureTitle('');
        fetchCourseLectures(); // Refresh list
      } else {
        alert("Failed to add lecture.");
      }
    } catch (error) {
      console.error("Add lecture error:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center pt-20">Loading lectures dashboard...</div>;
  }

  return (
    <div className="w-full max-w-5xl text-white bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-sm">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Let's Add <span className="text-[#4a90e2]">Lectures</span>
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Course: <span className="text-white font-semibold">{course?.title}</span>
        </p>
      </div>

      {/* Input & Buttons Section */}
      <div className="mb-8 bg-gray-800 p-5 rounded-lg border border-gray-700">
        <label htmlFor="lectureTitle" className="block text-sm font-semibold mb-2">
          Lecture Title
        </label>
        <input 
          type="text" 
          id="lectureTitle"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="e.g. Setting up Express Server"
          className="w-full border border-gray-700 rounded-md px-4 py-3 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm mb-4 text-white"
        />
        
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(`/coursedetail?id=${courseId}`)}
            className="px-5 py-2.5 border border-gray-700 rounded-md font-medium hover:bg-gray-700 transition-colors text-sm bg-gray-800 shadow-sm"
          >
            Back to Course
          </button>
          <button 
            type="button" 
            onClick={handleCreateLecture}
            className="px-5 py-2.5 bg-[#4a90e2] hover:bg-[#357abd] text-white rounded-md font-medium transition-colors text-sm shadow-sm"
          >
            Create Lecture
          </button>
        </div>
      </div>

      {/* Created Lectures List Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold">Uploaded Lectures ({course?.lectures?.length || 0})</h3>
        {course?.lectures && course.lectures.length > 0 ? (
          course.lectures.map((lecture, index) => (
            <div 
              key={lecture._id} 
              className="flex items-center justify-between bg-gray-850 border border-gray-700 rounded-md px-4 py-3 shadow-sm hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-semibold">{index + 1}.</span>
                <span className="text-sm font-semibold text-white">{lecture.title}</span>
                {lecture.isFree && (
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded ml-2">Free Preview</span>
                )}
              </div>
              <button 
                onClick={() => navigate(`/updatelecture?courseId=${courseId}&lectureId=${lecture._id}`)}
                className="text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-semibold"
              >
                {/* Edit Icon SVG */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-sm">No lectures created yet. Add your first lecture above.</p>
        )}
      </div>

    </div>
  );
};

export default AddLecture;