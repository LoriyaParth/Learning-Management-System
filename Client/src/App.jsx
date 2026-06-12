import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Home";
import Courses from "./Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Aboutcourse from "./Aboutcourse";
import Admindashboard from "./Admindashboard.jsx";
import Admincourse from "./Admincourse.jsx";
import AddCourse from "./Addcourse.jsx";
import CourseDetails from "./Coursedetail.jsx"; 
import Addlecture from "./Addlecture.jsx";
import Updatelecture from "./Updatelecture.jsx";
import Editprofile from "./components/Editprofile.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white w-full ">
      {/* Navbar stays at the top */}
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      {/* FIX: added flex-grow and h-full properties here */}
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-[#000000]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/aboutcourse" element={<Aboutcourse />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/admincourse" element={<Admincourse />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/coursedetail" element={<CourseDetails />} />
          <Route path="/addlecture" element={<Addlecture />} />
          <Route path="/updatelecture" element={<Updatelecture />} />

        </Routes>
      </main>

      {/* Footer stays at the bottom */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
