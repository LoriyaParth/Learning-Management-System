import React from 'react';

const UpdateLecture = () => {
  return (
    <div className="w-full max-w-5xl text-white-800">
      
      {/* Page Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 bg-gray-900 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors text-white-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white-900">Update Your Lecture</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-gray-900 rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
        
        {/* Card Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white-900">Edit Lecture</h2>
          <p className="text-sm text-white-500 mt-1 mb-4">
            Make changes and click save when done.
          </p>
          <button 
            type="button" 
            className="bg-[#ef4444] hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm shadow-sm"
          >
            Remove Lecture
          </button>
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2 text-white-800">
              Title
            </label>
            <input 
              type="text" 
              id="title"
              defaultValue="Introduction to Mern Stack"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          {/* Video File Input */}
          <div>
            <label htmlFor="video" className="block text-sm font-semibold mb-2 text-white-800">
              Video <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input 
                type="file" 
                id="video"
                accept="video/*"
                className="block w-full max-w-md text-sm text-white-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-md file:border-0 file:border-r file:border-gray-300 file:bg-gray-800 file:text-sm file:font-medium hover:file:bg-gray-100 border border-gray-300 rounded-md cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* Free Video Toggle Switch */}
          <div className="flex items-center mt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-900 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a1f2b]"></div>
              <span className="ml-3 text-sm font-bold text-white-800">Is this video FREE</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="bg-[#1a1f2b] hover:bg-gray-800 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm shadow-sm"
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