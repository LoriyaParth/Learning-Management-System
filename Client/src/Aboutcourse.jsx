import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Aboutcourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // 1. Get Course ID from URL
  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get("id");

  // 2. Get User from Local Storage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchCourseDetails = async () => {
    if (!courseId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);

        // Check if user is enrolled
        if (storedUser) {
          const enrolled = data.enrolledStudents && data.enrolledStudents.includes(storedUser._id);
          const isInstructor = data.instructor && data.instructor._id === storedUser._id;
          setIsEnrolled(enrolled || isInstructor);
        }

        // Set default video
        if (data.lectures && data.lectures.length > 0) {
          // Find first free video or use first video if enrolled
          const accessibleVideo = data.lectures.find(l => l.isFree || (storedUser && (data.enrolledStudents.includes(storedUser._id) || data.instructor._id === storedUser._id)));
          if (accessibleVideo) {
            setCurrentVideo(accessibleVideo.videoUrl);
            setCurrentVideoTitle(accessibleVideo.title);
          } else {
            setCurrentVideo(data.lectures[0].videoUrl);
            setCurrentVideoTitle(data.lectures[0].title);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!storedUser) {
      alert("Please login to enroll in this course!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: storedUser._id }),
      });

      if (response.ok) {
        alert("Enrolled successfully!");
        fetchCourseDetails();
      } else {
        const errData = await response.json();
        alert(errData.message || "Failed to enroll");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll in the course");
    }
  };

  if (loading) {
    return <div className="text-white text-center pt-20">Loading course details...</div>;
  }

  if (!course) {
    return <div className="text-white text-center pt-20">Course not found.</div>;
  }

  return (
    <div className="bg-gray-800 min-h-screen pb-12 font-sans text-white rounded-2xl w-full max-w-6xl">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        {/* Top Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-xl hover:text-blue-400">← Back</button>
            <h1 className="text-2xl font-bold">{course.title}</h1>
          </div>

          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Enroll Now
            </button>
          ) : (
            <span className="bg-green-600 text-white font-semibold py-2 px-6 rounded-md cursor-default">
              Enrolled & Unlocked
            </span>
          )}
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Left: Video Player or Thumbnail */}
          <div className="w-full md:w-1/2">
            <div className="bg-slate-900 rounded-xl aspect-[4/3] flex flex-col justify-center items-center text-white shadow-md border-4 border-slate-800 relative overflow-hidden">
              {currentVideo && (isEnrolled || course.lectures.find(l => l.videoUrl === currentVideo)?.isFree) ? (
                <video
                  className="w-full h-full object-cover"
                  src={currentVideo}
                  controls
                  autoPlay
                  key={currentVideo}
                />
              ) : (
                <div className="relative w-full h-full flex flex-col justify-center items-center">
                  <img
                    src={course.thumbnail || "https://placehold.co/600x400/1e293b/ffffff?text=LMS"}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-center">
                    <span className="text-4xl mb-2">🔒</span>
                    <p className="text-sm font-semibold">This course content is locked.</p>
                    <p className="text-xs text-gray-400 mt-1">Enroll to unlock all lectures</p>
                  </div>
                </div>
              )}
            </div>
            {currentVideoTitle && (
              <p className="text-sm text-gray-400 mt-2 italic text-center">
                Playing: {currentVideoTitle}
              </p>
            )}
          </div>

          {/* Right: Course Details & Pricing */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-2">
              {course.subtitle || "Master this course with hands-on labs and lectures"}
            </h2>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {course.description || "No full description added yet."}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-gray-300 text-sm font-medium">
                (4.8) | Course Level: <span className="uppercase text-blue-400">{course.level}</span>
              </span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-500">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </span>
              {course.price > 0 && (
                <span className="text-gray-400 line-through text-lg mb-1">
                  ₹{course.price + 500}
                </span>
              )}
            </div>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> {course.lectures?.length || 0} Video lectures included
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> Full lifetime access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> Access on mobile and PC
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Curriculum */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Course Curriculum</h3>
              <div className="flex flex-col gap-3">
                {course.lectures && course.lectures.length > 0 ? (
                  course.lectures.map((lecture, index) => {
                    const hasAccess = isEnrolled || lecture.isFree;
                    return (
                      <div
                        key={lecture._id}
                        onClick={() => {
                          if (hasAccess) {
                            setCurrentVideo(lecture.videoUrl);
                            setCurrentVideoTitle(lecture.title);
                          } else {
                            alert("This lecture is locked. Please enroll to view.");
                          }
                        }}
                        className={`p-4 rounded-md flex items-center justify-between border transition-all ${
                          hasAccess
                            ? "bg-gray-700 hover:bg-gray-600 cursor-pointer border-gray-600"
                            : "bg-gray-900 border-gray-800 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400 font-semibold">{index + 1}.</span>
                          <span className="font-medium text-white">{lecture.title}</span>
                          {lecture.isFree && (
                            <span className="bg-green-600 text-xs px-2 py-0.5 rounded text-white font-bold ml-2">
                              FREE PREVIEW
                            </span>
                          )}
                        </div>
                        <span>{hasAccess ? "▶ Play" : "🔒 Locked"}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 italic">No lectures uploaded for this course yet.</p>
                )}
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Instructor</h3>
              <div className="flex items-start gap-4">
                {course.instructor?.profileImage ? (
                  <img
                    className="w-16 h-16 rounded-full object-cover border border-gray-600"
                    src={course.instructor.profileImage}
                    alt="Instructor"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white uppercase text-2xl">
                    {course.instructor?.name ? course.instructor.name.charAt(0) : "I"}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white">{course.instructor?.name || "LMS Instructor"}</h4>
                  <p className="text-sm text-gray-400 mb-2">Instructor / Expert Educator</p>
                  <p className="text-sm text-gray-300">
                    {course.instructor?.bio || "Expert instructor passionate about sharing high-quality educational content."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Details Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="card bg-gray-900 w-full shadow-sm border border-gray-700 rounded-lg p-5 text-white">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Course Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Category:</span>
                  <p className="font-semibold capitalize text-blue-400">{course.category}</p>
                </div>
                <div>
                  <span className="text-gray-400">Difficulty Level:</span>
                  <p className="font-semibold capitalize text-blue-400">{course.level}</p>
                </div>
                <div>
                  <span className="text-gray-400">Total Enrolled:</span>
                  <p className="font-semibold text-blue-400">
                    {course.enrolledStudents ? course.enrolledStudents.length : 0} students
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <p className="font-semibold text-blue-400">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
