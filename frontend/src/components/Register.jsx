import React, { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "../Axios/axios.js";
import TokenContext from "../context/TokenContext.js";

function Register() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/register", formData);
      tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
      userDispatch({ type: "SET_USER", payload: result.data.user });
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
    } catch (error) {
      console.log(error);
      setError({ message: error.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
      {userToken && <Navigate to="/" />}

      <section className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-b from-purple-400 via-pink-300 to-red-300">
          <img
            src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.jpg?s=2048x2048&w=is&k=20&c=3ZAV9DqSymZphCLXFNP-2QjOlzdPyQLApCQdqKA46Zc="
            alt="Registration Illustration"
            className="w-4/5 h-auto p-6 animate-fadeIn"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800 text-center md:text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Create Account
          </h2>

          {error && (
            <div className="text-center border-2 border-red-600 p-2 mb-4 rounded-md bg-red-100 text-red-700 shadow-md animate-fadeIn">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition duration-300"
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition duration-300"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition duration-300"
            />

            {/* Remember me checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mr-2"
                defaultChecked
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Register;
