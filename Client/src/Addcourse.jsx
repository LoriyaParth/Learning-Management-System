import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    if (!title || !category) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          instructorId: storedUser._id
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Course created successfully!");
        // Navigate to the Course details page to continue adding details
        navigate(`/coursedetail?id=${data.course._id}`);
      } else {
        alert(data.message || "Failed to create course");
      }
    } catch (error) {
      console.error("Course creation error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gray-900 border border-white rounded-lg p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Let's Add <span className="text-[#4a90e2]">Courses</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Create a draft of your new course. You can set the price, subtitle, thumbnail, and add lectures after creating it.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
            Title
          </label>
          <input 
            type="text" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Course Name (e.g. MERN Stack for Beginners)" 
            className="w-full border border-gray-700 bg-gray-800 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow"
            required
          />
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-white mb-2">
            Category
          </label>
          <div className="relative w-64">
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-700 rounded-md px-4 py-2.5 text-white bg-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow cursor-pointer"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="development">Web Development</option>
              <option value="design">UI/UX Design</option>
              <option value="marketing">Digital Marketing</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <button 
            type="button" 
            onClick={() => navigate('/admincourse')}
            className="px-6 py-2.5 border border-gray-700 rounded shadow-sm text-gray-300 font-medium hover:bg-gray-800 transition-colors bg-gray-900"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-[#4a90e2] text-white rounded shadow-sm font-medium hover:bg-[#357abd] transition-colors"
          >
            Create
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCourse;