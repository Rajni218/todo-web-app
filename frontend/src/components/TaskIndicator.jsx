import React from "react";
import { NavLink } from "react-router-dom";

function TaskIndicator() {
  return (
    <div className="flex justify-center my-6">
      <nav>
        <ul className="flex gap-4 bg-gray-100 rounded-xl shadow-md p-2">
          {[
            { name: "All Boards", path: "/" },
            { name: "Active", path: "/active" },
            { name: "Completed", path: "/completed" },
          ].map((tab, idx) => (
            <li key={idx}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-400 via-pink-300 to-pink-400 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-200 hover:text-purple-600"
                  }`
                }
              >
                {tab.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default TaskIndicator;
