import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function UpdateLecture() {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-4xl min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/admin/course/${id || '1'}/lecture`} className="p-2 border border-gray-200 rounded hover:bg-gray-50">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h2 className="text-xl font-bold text-gray-800">Update Your Lecture</h2>
      </div>

      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">Edit Lecture</h3>
          <p className="text-sm text-gray-500">Make changes and click save when done.</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium">
          Remove Lecture
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" defaultValue="Introduction to Mern Stack" className="w-full border border-gray-200 rounded-md p-2 focus:outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video *</label>
          <input type="file" className="w-full max-w-sm border border-gray-200 rounded p-2 focus:outline-none text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
        </div>

        <div className="flex items-center gap-3">
          {/* Simple toggle switch built with tailwind */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Is this video FREE</span>
          </label>
        </div>

        <button type="button" className="px-6 py-2 bg-gray-900 text-white rounded-md font-medium text-sm">
          Update Lecture
        </button>
      </form>
    </div>
  );
}