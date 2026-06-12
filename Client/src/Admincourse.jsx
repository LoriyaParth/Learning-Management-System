import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AddCourse from './Addcourse';

const Admincourses = () => {
  const courses = [
    {
      id: 1,
      title: 'MongoDB for Experts',
      price: '₹399',
      status: 'Published',
      img: 'https://placehold.co/120x80/2c3e50/FFFFFF?text=MongoDB',
    },
    {
      id: 2,
      title: 'Error Debugging fixed',
      price: '₹399',
      status: 'Published',
      img: 'https://placehold.co/120x80/e74c3c/FFFFFF?text=Debugging',
    },
    {
      id: 3,
      title: 'HTML Full Course For Beginners',
      price: '₹199',
      status: 'Published',
      img: 'https://placehold.co/120x80/e67e22/FFFFFF?text=HTML5',
    },
    {
      id: 4,
      title: 'Node Js Tutorial',
      price: '₹299',
      status: 'Published',
      img: 'https://placehold.co/120x80/27ae60/FFFFFF?text=Node.js',
    },
    {
      id: 5,
      title: 'Express Js Tutorial',
      price: '₹199',
      status: 'Published',
      img: 'https://placehold.co/120x80/34495e/FFFFFF?text=Express',
    },
  ];

  return (
    // Added 'w-full' to ensure it takes up the entire available width
    <div className="flex w-full min-h-screen font-sans bg-gray-100 rounded-2xl">
      
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 bg-[#f3f4f6] p-10 overflow-x-auto rounded-r-2xl">
        <Link to="/Addcourse">
        <div className="mb-8">
          <button className="bg-[#4a90e2] hover:bg-[#357abd] text-white px-5 py-2.5 rounded shadow-sm font-medium transition-colors">
            Create Course
          </button>
        </div>
        </Link>

        {/* Table Area */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-400 font-semibold border-b border-gray-200">
                {/* Added specific widths to headers to fix the squished text */}
                <th className="pb-4 font-medium pl-2 w-1/2">Course</th>
                <th className="pb-4 font-medium w-1/6">Price</th>
                <th className="pb-4 font-medium w-1/6">Status</th>
                <th className="pb-4 font-medium text-right pr-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  
                  {/* Fixed flex layout by wrapping content in a div instead of placing it directly on the td */}
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-4">
                      <img 
                        src={course.img} 
                        alt={course.title} 
                        className="w-[120px] h-[75px] object-cover rounded shadow-sm"
                      />
                      <span className="text-gray-700 font-medium">{course.title}</span>
                    </div>
                  </td>

                  <td className="py-4 text-gray-700 font-medium">
                    {course.price}
                  </td>

                  <td className="py-4">
                    <span className="bg-[#e2f5ec] text-[#2ec071] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                      {course.status}
                    </span>
                  </td>

                  <td className="py-4 text-right pr-4">
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Admincourses;