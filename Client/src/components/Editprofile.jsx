import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "", bio: "", profileImage: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        role: storedUser.role || "student",
        bio: storedUser.bio || "",
        profileImage: storedUser.profileImage || "",
        password: "", 
      });
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  // Standard handler for text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NEW: Special handler specifically for the image file
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Grab the file the user selected
    
    if (file) {
      const reader = new FileReader(); // Built-in JavaScript tool
      reader.readAsDataURL(file);      // Convert the image to a Base64 text string
      
      reader.onloadend = () => {
        // Once it finishes converting, save the giant string into our formData
        setFormData({ ...formData, profileImage: reader.result });
      };
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

     if (response.ok) {
        // 1. Save the fresh data to Local Storage
        localStorage.setItem("user", JSON.stringify(data.user));
        
        alert("Profile Updated Successfully!");
        
        // 2. FORCE A PAGE RELOAD instead of using navigate
        // REMOVE THIS LINE: navigate("/"); 
        // ADD THIS LINE:
        window.location.href = "/"; 
        
      } else {
        alert(data.message);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) return <div className="text-white text-center pt-20">Loading...</div>;

  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Edit Your Profile</h2>
        
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          
          {/* --- NEW FILE UPLOAD SECTION --- */}
          <div className="flex flex-col items-center mb-4">
            {/* Show a preview of the image if they select one */}
            {formData.profileImage ? (
              <img 
                src={formData.profileImage} 
                alt="Preview" 
                className="w-24 h-24 rounded-full object-cover mb-3 ring-4 ring-blue-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mb-3">
                No Image
              </div>
            )}
            
            <label className="text-gray-400 text-sm mb-1 block w-full text-left">Upload Profile Picture</label>
            {/* type="file" creates the "Browse PC" button */}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>
          {/* -------------------------------- */}

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">New Password (Optional)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:border-blue-500 h-28"></textarea>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              &larr; Back to Dashboard
            </Link>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;