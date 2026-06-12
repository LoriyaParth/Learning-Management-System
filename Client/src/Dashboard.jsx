import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SimpleDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1. Check local storage for the logged-in user
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserData(storedUser); // Save to React state
    } else {
      // If no user is found, kick them back to the login page!
      navigate('/login');
    }
  }, [navigate]);

  // If the data is still loading, show a blank screen or a spinner
  if (!userData) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
{/* =========================================
            1. THE PROFILE CARD
        ========================================= */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
          
          <div className="flex-shrink-0">
             {/* FIX 1: Check if profileImage exists. If yes, show image. If no, show blue circle! */}
             {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800" />
             ) : (
                <div className="w-28 h-28 rounded-full ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800 bg-blue-600 flex items-center justify-center text-5xl font-bold text-white uppercase">
                  {userData.name.charAt(0)}
                </div>
             )}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome, {userData.name}!</h1>
            <p className="text-white mb-1"><span className="font-bold">Email:</span> {userData.email}</p>
            <p className="text-white mb-1"><span className="font-bold">Role:</span> {userData.role || 'Student'}</p>
            
            {/* FIX 2: Actually display the user's bio here! */}
            <p className="text-white mb-4"><span className="font-bold">Bio:</span> {userData.bio || 'Edit your profile to add a bio.'}</p>
            
            <Link to="/editprofile">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* =========================================
            2. THE COURSES SECTION
        ========================================= */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-white mb-6">Your Enrolled Courses</h2>

          {/* The Grid container that holds the 3 cards side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* --- COURSE CARD 1: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


        {/* --- COURSE CARD 2: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


        {/* --- COURSE CARD 3: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


        {/* --- COURSE CARD 4: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


        {/* --- COURSE CARD 5: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


        {/* --- COURSE CARD 6: REACT --- */}
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-4 mx-auto text-white">
          <figure className="px-6 pt-6">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl w-full h-48 object-cover" />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-xl font-bold">Card Title</h2>
            <p className="text-sm text-gray-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
           
          </div>
        </div>


    

          </div>
        </div>

      </div>
    </div>
  );
}