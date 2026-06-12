import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // 1. Set up state to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // default value
  });

  // 2. Handle input changes as the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Handle what happens when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    try {
      // Send the data to your Node/Express backend
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert React state to JSON
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully! Check your database.');
        console.log("Success:", data);
        // Here you could redirect the user to the login page
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-2 text-white">Create Account</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Join NewLarn to start your journey</p>
      
      {/* Add the onSubmit handler to the form */}
      <form onSubmit={handleSubmit}>
        
        {/* Full Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" // Added name attribute to match state
            value={formData.name} // Connected to state
            onChange={handleChange} // Added onChange handler
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 outline-none" 
            placeholder="John Doe" 
            required 
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 outline-none" 
            placeholder="name@company.com" 
            required 
          />
        </div>
        
        {/* Password Field */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Your password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 outline-none" 
            placeholder="••••••••" 
            required 
          />
        </div>

        {/* Role Selection (Radio Buttons) */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-300">I am signing up as a:</label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input 
                id="role-student" 
                type="radio" 
                name="role" 
                value="student" 
                onChange={handleChange}
                checked={formData.role === 'student'} // Tied to state
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 cursor-pointer" 
              />
              <label htmlFor="role-student" className="ms-2 text-sm font-medium text-gray-300 cursor-pointer">
                Student
              </label>
            </div>
            <div className="flex items-center">
              <input 
                id="role-instructor" 
                type="radio" 
                name="role" 
                value="instructor"
                onChange={handleChange}
                checked={formData.role === 'instructor'} // Tied to state
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 cursor-pointer" 
              />
              <label htmlFor="role-instructor" className="ms-2 text-sm font-medium text-gray-300 cursor-pointer">
                Instructor
              </label>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-colors mb-4"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup