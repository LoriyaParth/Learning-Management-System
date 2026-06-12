import React from 'react';

const AddCourse = () => {
  return (
    <div className="w-full max-w-5xl bg-gray-900 border border-white br-2 rounded-lg p-6 shadow-sm">

        
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white-800 mb-2">
          Lets Add <span className="text-[#4a90e2]">Courses</span>
        </h1>
        <p className="text-white-600 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?
        </p>
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-6">
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
            Title
          </label>
          <input 
            type="text" 
            id="title"
            placeholder="Your Course Name" 
            className="w-full border border-gray-300  rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow"
          />
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-white-700 mb-2">
            Category
          </label>
          <div className="relative w-64">
            <select 
              id="category"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-white-600 bg-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Select a category</option>
              <option value="development">Web Development</option>
              <option value="design">UI/UX Design</option>
              <option value="marketing">Digital Marketing</option>
            </select>
            {/* Custom dropdown arrow to match standard UI */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white-500">
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
            className="px-6 py-2.5 border border-gray-300 rounded shadow-sm text-white-700 font-medium hover:bg-gray-50 transition-colors bg-gray-900"
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