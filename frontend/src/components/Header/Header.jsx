import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TokenContext from "../../context/TokenContext.js";

function Header() {
  const token = localStorage.getItem("authToken");
  const { user } = useContext(TokenContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-xl flex justify-between items-center px-6 py-3 md:py-4 transition-all duration-300">
        
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger only on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between w-6 h-6 md:hidden focus:outline-none"
          >
           </button>

          {/* Logo */}
         <div className="text-2xl md:text-3xl font-extrabold cursor-pointer bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent hover:from-purple-500 hover:via-pink-400 hover:to-red-400 transition-all duration-300 shadow-md">
  <NavLink to="/">Todo Web App</NavLink>
</div>

        </div>

        {/* Right: Desktop & Mobile Links */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 px-3 py-1 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <p className="text-gray-700 font-medium capitalize">{user?.name}</p>
              </div>
              {/* Logout */}
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:scale-105 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-all"
                    : "text-gray-700 hover:text-purple-500 transition-all duration-300"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-1 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Slide Menu (only for logged-in user options if needed) */}
      {menuOpen && token && (
        <div className="md:hidden mt-16 bg-white shadow-xl rounded-b-lg py-4 flex flex-col items-center gap-4 animate-slideDown">
          <p className="text-gray-700 text-lg capitalize">{user?.name}</p>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}

      {/* Outlet */}
      <div className="pt-20">
        <Outlet />
      </div>

      {/* Slide Down Animation */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Header;
