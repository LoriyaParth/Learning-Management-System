import React from "react";

export default function Aboutcourse() {
  return (
    // Main Background
    <div className="bg-gray-800 min-h-screen pb-12 font-sans text-white rounded-2xl">
      {/* Main Container - Keeps everything centered with a max width */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        {/* =========================================
            1. TOP HEADER AREA
        ========================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          {/* Back Arrow and Title */}
          <div className="flex items-center gap-3">
            <button className="text-xl hover:text-white">←</button>
            <h1 className="text-2xl font-bold">Ms Excel for Beginners</h1>
          </div>

          {/* Enroll Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">
            Enroll Now
          </button>
        </div>

        {/* =========================================
            2. HERO SECTION (Image & Price Info)
        ========================================= */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Left: Course Image Thumbnail */}
          <div className="w-full md:w-1/2">
            <div className="bg-slate-900 rounded-xl aspect-[4/3] flex flex-col justify-center items-center text-white shadow-md border-4 border-slate-800 relative overflow-hidden">
              {/* Fake Excel Graphic */}
              <figure className="px-6 pt-5">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl w-full h-78 object-cover"
                />
              </figure>
            </div>
          </div>

          {/* Right: Course Details & Pricing */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-2">
              Hey This Is The Subtitle For Trial Course
            </h2>
            <p className="text-white mb-4 text-sm font-mono">
              This is a sample description for the course. It gives a brief
              overview of what the course is about and what students can expect
              to learn.{" "}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-white text-sm font-medium">
                (4.8) | 1,200 reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-500">₹99</span>
              <span className="text-white line-through text-lg mb-1">₹599</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-white text-sm">
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> 30+ hours of video content
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Lifetime access to course
                materials
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Certificate of completion
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================
            3. BOTTOM SECTION (Two Columns)
        ========================================= */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT COLUMN: Main Information (Takes up 2/3 of the space) */}
          <div className="w-full md:w-2/3 space-y-10">
            {/* What You'll Learn */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                What You'll Learn
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white text-sm">
                <li>Build dynamic web applications with React and Node.js</li>
                <li>
                  Deploy websites with modern tools like Vercel and Netlify
                </li>
                <li>Understand REST APIs and database integration</li>
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Requirements
              </h3>
              <p className="text-white text-sm">
                Basic programming knowledge is helpful but not required.
              </p>
            </div>

            {/* Course Curriculum / Modules */}
            <div className="mt-8">
              {/* Playable Module */}
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-4 rounded-md mb-3 flex items-center gap-3 transition-colors border border-gray-200">
                <span className="text-white">▶</span>
                <span className="font-medium text-black">
                  Introduction to Ms Excel
                </span>
              </div>

              {/* Locked Module */}
              <div className="bg-gray-100 p-4 rounded-md flex items-center gap-3 border border-gray-200 opacity-70">
                <span className="text-white">🔒</span>
                <span className="font-medium text-black">
                  Basics of Ms Excel
                </span>
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-white mb-6">Instructor</h3>
              <div className="flex items-start gap-4">
                {/* Instructor Avatar */}
                <img
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="Instructor"
                />
                <div>
                  <h4 className="font-bold text-white">Rahul Singh</h4>
                  <p className="text-sm text-white mb-4">
                    Senior Full-Stack Developer
                  </p>
                  <p className="text-sm text-white">
                    Hey i am a senior accountant
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Preview Card (Takes up 1/3 of the space) */}
          <div className="w-full md:w-1/3">
            {/* Sticky keeps it on screen when scrolling down */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
              <figure className="px-6 pt-6">
                {/* Replaced img with video */}
                <video
                  className="rounded-xl w-full h-48 object-cover"
                  controls
                  muted
                  autoPlay
                  loop
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </figure>
              <div className="card-body items-center text-center p-4">
                <h2 className="card-title text-xl font-bold">Card Title</h2>
                <p className="text-sm text-white">
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
