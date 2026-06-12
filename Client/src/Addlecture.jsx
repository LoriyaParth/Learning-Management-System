import React from 'react';

const AddLecture = () => {
  // Mock data for the created lectures list
  const lectures = [
    { id: 1, title: 'Lecture - 1: Introduction to Mern Stack' },
    { id: 2, title: 'Lecture - 2: Basics of Mern Stack' },
  ];

  return (
    <div className="w-full max-w-5xl text-white-800 bg-gray-900 border border-white br-2 rounded-lg p-6 shadow-sm">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Lets Add <span className="text-[#4a90e2]">Lectures</span>
        </h1>
        <p className="text-sm text-white-500 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?
        </p>
      </div>

      {/* Input & Buttons Section */}
      <div className="mb-8">
        <label htmlFor="lectureTitle" className="block text-sm font-semibold mb-2">
          Title
        </label>
        <input 
          type="text" 
          id="lectureTitle"
          defaultValue="Basics of Mern Stack"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm mb-4 transition-shadow bg-gray-900"
        />
        
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            className="px-5 py-2.5 border border-gray-300 rounded-md font-medium text-white-700 hover:bg-gray-50 transition-colors text-sm bg-gray-900 shadow-sm"
          >
            Back to Course
          </button>
          <button 
            type="button" 
            className="px-5 py-2.5 bg-[#1a1f2b] text-white rounded-md font-medium hover:bg-gray-800 transition-colors text-sm shadow-sm"
          >
            Create Lecture
          </button>
        </div>
      </div>

      {/* Created Lectures List Section */}
      <div className="flex flex-col gap-3">
        {lectures.map((lecture) => (
          <div 
            key={lecture.id} 
            className="flex items-center justify-between bg-gray-900 border border-gray-200 rounded-md px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-semibold text-white-700">{lecture.title}</span>
            <button className="text-white-400 hover:text-white-700 transition-colors">
              {/* Edit Icon SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddLecture;