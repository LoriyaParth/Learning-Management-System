import React from 'react';

const CourseDetails = () => {
  return (
    <div className="w-full max-w-5xl text-white-800">
      
      {/* Top Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Add detail information regarding course</h1>
        <button className="text-sm font-medium hover:underline text-white-700">
          Go to lectures page
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-100">
        
        {/* Card Header & Top Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
          <div>
            <h2 className="text-lg font-bold">Basic Course Information</h2>
            <p className="text-sm text-white-500 mt-1">
              Make changes to your courses here. Click save when you're done.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#1a1f2b] hover:bg-gray-800 text-white px-5 py-2 rounded font-medium transition-colors text-sm">
              Publish
            </button>
            <button className="bg-[#ef4444] hover:bg-red-600 text-white px-5 py-2 rounded font-medium transition-colors text-sm">
              Remove Course
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-6">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
            <input 
              type="text" 
              id="title"
              defaultValue="MERN Stack Development"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-semibold mb-2">Subtitle</label>
            <input 
              type="text" 
              id="subtitle"
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          {/* Description (Rich Text Editor Mock) */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              {/* Toolbar */}
              <div className="bg-gray-900 border-b border-gray-300 px-3 py-2 flex items-center gap-4 overflow-x-auto">
                <select className="bg-gray-900 text-sm font-medium focus:outline-none cursor-pointer">
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                
                <div className="w-px h-5 bg-gray-300"></div> {/* Divider */}
                
                <div className="flex items-center gap-3 text-white-600">
                  <button type="button" className="font-bold hover:text-black">B</button>
                  <button type="button" className="italic hover:text-black font-serif">I</button>
                  <button type="button" className="underline hover:text-black">U</button>
                  {/* Link Icon */}
                  <button type="button" className="hover:text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  </button>
                  {/* Bullet List Icon */}
                  <button type="button" className="hover:text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </button>
                  {/* Ordered List Icon */}
                  <button type="button" className="hover:text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"></path></svg>
                  </button>
                  {/* Clear Format Icon */}
                  <button type="button" className="hover:text-black font-serif italic text-sm">
                    T<sub className="text-[10px]">x</sub>
                  </button>
                </div>
              </div>
              {/* Text Area */}
              <textarea 
                rows="4"
                className="w-full p-4 focus:outline-none resize-y text-sm text-white-700"
              ></textarea>
            </div>
          </div>

          {/* 3-Column Grid for Selects and Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2">Category</label>
              <div className="relative">
                <select 
                  id="category"
                  defaultValue="MERN Stack Development"
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm cursor-pointer"
                >
                  <option value="MERN Stack Development">MERN Stack Development</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white-500">
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
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm cursor-pointer"
                >
                  <option value="" disabled>Select a course level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white-500">
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
                defaultValue="199"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm"
              />
            </div>
            
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold mb-2">Course Thumbnail</label>
            <div className="flex items-center">
              <input 
                type="file" 
                id="thumbnail"
                className="block w-full text-sm text-white-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-md file:border-0 file:border-r file:border-gray-300 file:bg-gray-900 file:text-sm file:font-semibold hover:file:bg-gray-100 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button" 
              className="px-6 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#1a1f2b] text-white rounded font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CourseDetails;