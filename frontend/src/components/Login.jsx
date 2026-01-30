import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../Axios/axios.js";
import TokenContext from "../context/TokenContext.js";

function Login() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/login", formData);
      tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
      userDispatch({ type: "SET_USER", payload: result.data.user });
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
    } catch (error) {
      console.log(error);
      setError({ message: error.response?.data?.message || "Login failed" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
      {userToken && <Navigate to="/" />}

      <section className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-b from-purple-400 via-pink-300 to-red-300">
          <img
            src="https://img.freepik.com/premium-vector/girl-working-online-via-internet-with-laptop-vector-illustration-flat-style_676989-159.jpg"
            alt="Work Illustration"
            className="w-4/5 h-auto p-6 animate-fadeIn"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800 text-center md:text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>

          {error && (
            <div className="text-center border-2 border-red-600 p-2 mb-4 rounded-md bg-red-100 text-red-700 shadow-md animate-fadeIn">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition duration-300"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition duration-300"
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgotPassword"
                className="text-sm text-purple-600 hover:text-pink-500 transition duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold hover:underline"
              >
                Register
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

export default Login;
