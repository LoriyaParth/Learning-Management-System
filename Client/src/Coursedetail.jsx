import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get course ID from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'development',
    level: 'beginner',
    price: 0,
    thumbnail: '',
    status: 'Draft',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      alert("No Course ID provided!");
      navigate('/admincourse');
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            category: data.category || 'development',
            level: data.level || 'beginner',
            price: data.price || 0,
            thumbnail: data.thumbnail || '',
            status: data.status || 'Draft',
          });
        } else {
          alert("Course not found!");
          navigate('/admincourse');
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: reader.result,
        }));
      };
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Course details saved successfully!");
      } else {
        const err = await response.json();
        alert(err.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Save course details error:", error);
      alert("Error connecting to server");
    }
  };

  const handleTogglePublish = async () => {
    const nextStatus = formData.status === 'Published' ? 'Draft' : 'Published';
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (response.ok) {
        setFormData((prev) => ({ ...prev, status: nextStatus }));
        alert(`Course successfully set to ${nextStatus}!`);
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this course and all its lectures?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Course deleted successfully!");
        navigate('/admincourse');
      } else {
        alert("Failed to delete course.");
      }
    } catch (error) {
      console.error("Delete course error:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center pt-20">Loading course detail editor...</div>;
  }

  return (
    <div className="w-full max-w-5xl text-white">
      {/* Top Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Edit course detail information</h1>
        <button 
          onClick={() => navigate(`/addlecture?courseId=${courseId}`)}
          className="text-sm font-medium text-blue-400 hover:underline"
        >
          Go to lectures page &rarr;
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-700">
        
        {/* Card Header & Top Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
          <div>
            <h2 className="text-lg font-bold">Basic Course Information</h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure your course status, settings, pricing, and lectures list.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={handleTogglePublish}
              className={`px-5 py-2 rounded font-medium transition-colors text-sm text-white ${
                formData.status === 'Published' 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {formData.status === 'Published' ? 'Set to Draft' : 'Publish Course'}
            </button>
            <button 
              type="button"
              onClick={handleDeleteCourse}
              className="bg-[#ef4444] hover:bg-red-600 text-white px-5 py-2 rounded font-medium transition-colors text-sm"
            >
              Remove Course
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
            <input 
              type="text" 
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-700 bg-gray-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-semibold mb-2">Subtitle</label>
            <input 
              type="text" 
              id="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              className="w-full border border-gray-700 bg-gray-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
            <textarea 
              id="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of course topics, syllabus, and what students will learn..."
              className="w-full border border-gray-700 bg-gray-800 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white resize-y"
            ></textarea>
          </div>

          {/* 3-Column Grid for Category, Level, and Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2">Category</label>
              <div className="relative">
                <select 
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-md px-4 py-2.5 bg-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm cursor-pointer text-white"
                >
                  <option value="development">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="marketing">Digital Marketing</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Course Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-semibold mb-2">Course Level</label>
              <div className="relative">
                <select 
                  id="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-md px-4 py-2.5 bg-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm cursor-pointer text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold mb-2">Price in (INR)</label>
              <input 
                type="number" 
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-700 bg-gray-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm text-white"
                min="0"
                required
              />
            </div>
            
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold mb-2">Course Thumbnail</label>
            <div className="flex items-center gap-4">
              {formData.thumbnail && (
                <img 
                  src={formData.thumbnail} 
                  alt="Thumbnail Preview" 
                  className="w-24 h-16 object-cover rounded border border-gray-700" 
                />
              )}
              <input 
                type="file" 
                id="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 border border-gray-700 rounded-md cursor-pointer"
              />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => navigate('/admincourse')}
              className="px-6 py-2 border border-gray-700 bg-gray-800 rounded font-medium hover:bg-gray-700 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CourseDetails;