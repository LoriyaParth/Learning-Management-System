import React from 'react'

const Courses = () => {
  return (
    <div className="absolute top-24 left-0 right-0 w-full px-6">
      
      {/* 1. Header Text Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center">
          Explore Our Courses
        </h1>
        <p className="text-gray-400 text-lg text-center mb-8 md:whitespace-nowrap tracking-wide">
          Explore our curated courses to boost your skills and career. Whether you are a beginner or an expert, we have something for everyone.
        </p>
      </div>

      {/* 2. FIXED LINE: Added pb-12 to create a safe scrolling gap before the footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full h-[65vh] overflow-y-auto pr-2 pb-12 custom-scrollbar">
        
        {/* --- Keep all your 6 Cards exactly the same inside here --- */}
        {/* Card - 1 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Card - 2 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Card - 3 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Card - 4 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Card - 5 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Card - 6 */}
        <div className="card bg-gray-800 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
              <button className="btn btn-primary my-4 bg-blue-600 border-none px-6 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>
          </div>
        </div>

      </div>
        
      </div> 
    
  )
}

export default Courses