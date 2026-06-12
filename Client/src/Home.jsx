import React from "react";
import LMS from "./assets/LMS_IMAGE.jpg";

const Home = () => {
  return (
    /* Side-by-side grid container */
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
      
      {/* LEFT COLUMN: Texts and Search Group */}
      <div className="flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Explore our wide range of courses and start your learning journey today!
          </h1>
          <p className="text-gray-400 text-lg">
            Join our community of learners and unlock your potential with NewLarn.
          </p>
        </div>

        {/* Search Bar Input Group */}
        <div className="flex justify-start">
          <div className="join border border-gray-700 rounded-lg overflow-hidden w-full max-w-md shadow-lg">
            <input 
              type="text" 
              placeholder="Find Your Course here !"  
              className="input input-bordered join-item bg-gray-800 text-white px-4 py-3 outline-none flex-grow"
            />
            <button className="btn btn-neutral join-item bg-blue-600 hover:bg-blue-700 border-none text-white px-6 font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Image Asset Display */}
      <div className="flex justify-center w-full">
        <img 
          src={LMS} 
          alt="Learning Illustration" 
          className="w-full h-auto rounded-2xl shadow-2x object-cover" 
        />
      </div>

    </div>
  );
};

export default Home;