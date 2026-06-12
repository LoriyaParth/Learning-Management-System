import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    try {
      // Send the data to your Node/Express backend
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Convert React state to JSON
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data.message);

        // 1. SAVE THE USER TO LOCAL STORAGE
        // We turn the user object into a string so the browser can store it
        localStorage.setItem("user", JSON.stringify(data.user));

        // 2. Redirect to home
       window.location.href = "/";
      } else {
        console.error("Error:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Login to NewLarn
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email-alternative"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 outline-none"
            placeholder="name@company.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label
            htmlFor="password-alternative"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password-alternative"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember Me / Agreement */}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember-alternative"
              type="checkbox"
              className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <label
            htmlFor="remember-alternative"
            className="ms-2 text-sm font-medium text-gray-300 select-none"
          >
            I agree with the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-colors"
        >
          Submit
        </button>
        <div>
          <p className="text-sm text-gray-400 text-center">
            Don't have an acoount?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
