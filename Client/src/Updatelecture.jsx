import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateLecture = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get parameters from URL query params
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');
  const lectureId = searchParams.get('lectureId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !lectureId) {
      alert("Missing parameters!");
      navigate('/admincourse');
      return;
    }

    const fetchLectureDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          // Find the lecture from course populated lectures array
          const lec = data.lectures?.find(l => l._id === lectureId);
          if (lec) {
            setTitle(lec.title || '');
            setDescription(lec.description || '');
            setVideoUrl(lec.videoUrl || '');
            setIsFree(lec.isFree || false);
          } else {
            alert("Lecture not found in this course!");
            navigate(`/addlecture?courseId=${courseId}`);
          }
        }
      } catch (error) {
        console.error("Error fetching lecture details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [courseId, lectureId, navigate]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show loading indicator since video conversion might take a brief second
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoUrl(reader.result);
        alert("Video loaded successfully (ready to save)!");
      };
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lectures/${lectureId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          isFree
        }),
      });

      if (response.ok) {
        alert("Lecture updated successfully!");
        navigate(`/addlecture?courseId=${courseId}`);
      } else {
        alert("Failed to update lecture.");
      }
    } catch (error) {
      console.error("Update lecture error:", error);
    }
  };

  const handleDeleteLecture = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this lecture?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lectures/${lectureId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Lecture deleted successfully!");
        navigate(`/addlecture?courseId=${courseId}`);
      } else {
        alert("Failed to delete lecture.");
      }
    } catch (error) {
      console.error("Delete lecture error:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center pt-20">Loading lecture settings...</div>;
  }

  return (
    <div className="w-full max-w-5xl text-white">
      
      {/* Page Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate(`/addlecture?courseId=${courseId}`)}
          className="p-2 bg-gray-900 rounded-full shadow-sm border border-gray-700 hover:bg-gray-800 transition-colors text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white">Update Your Lecture</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-gray-900 rounded-lg p-6 sm:p-8 shadow-sm border border-gray-700">
        
        {/* Card Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Edit Lecture</h2>
            <p className="text-sm text-gray-400 mt-1">
              Make changes and click save when done.
            </p>
          </div>
          <button 
            type="button" 
            onClick={handleDeleteLecture}
            className="bg-[#ef4444] hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm shadow-sm"
          >
            Remove Lecture
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Title
            </label>
            <input 
              type="text" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border border-gray-700 bg-gray-800 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white"
            ></textarea>
          </div>

          {/* Video File Input */}
          <div>
            <label htmlFor="video" className="block text-sm font-semibold mb-2">
              Video Source File
            </label>
            <div className="flex flex-col gap-3">
              {videoUrl && (
                <video
                  src={videoUrl}
                  className="max-w-md w-full rounded border border-gray-700 h-40 object-cover"
                  controls
                />
              )}
              <input 
                type="file" 
                id="video"
                accept="video/*"
                onChange={handleVideoUpload}
                className="block w-full max-w-md text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 border border-gray-700 rounded-md cursor-pointer"
              />
            </div>
          </div>

          {/* Free Video Toggle Switch */}
          <div className="flex items-center mt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-bold text-gray-300">Is this video FREE (preview allowed without enrollment)?</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => navigate(`/addlecture?courseId=${courseId}`)}
              className="px-5 py-2.5 border border-gray-700 bg-gray-800 rounded-md font-medium hover:bg-gray-700 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm shadow-sm"
            >
              Update Lecture
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateLecture;