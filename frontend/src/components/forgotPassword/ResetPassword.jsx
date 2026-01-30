import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../Axios/axios.js";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
    } else {
      try {
        const token = searchParams.get("token");
        const res = await axios.post("/forgotPassword/resetPassword", { token, password });
        setMessage(res.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-indigo-200">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Reset Password
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`px-5 py-3 rounded-lg font-semibold text-white transition ${
              isLoading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-md"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div className="mt-6 bg-green-600 text-white text-center py-2 rounded-lg shadow-md animate-fadeIn">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-600 text-white text-center py-2 rounded-lg shadow-md animate-fadeIn">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
