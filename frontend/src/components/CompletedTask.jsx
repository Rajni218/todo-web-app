import React from "react";
import moment from "moment";

function CompletedTask({ task }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 hover:shadow-2xl transition-shadow duration-300 border-l-4 border-green-500">
      
      {/* Task Info */}
      <div className="task-info flex-1">
        <h4 className="task-title text-lg capitalize text-gray-700 line-through font-semibold">
          {task.title}
        </h4>
        <p className="task-description text-gray-500 line-through mt-1">
          {task.description}
        </p>
        <p className="text-xs italic opacity-60 mt-1">
          {task?.createdAt ? moment(task.createdAt).fromNow() : "just now"}
        </p>
      </div>

      {/* Completed Badge */}
      <div className="flex-shrink-0">
        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Completed
        </span>
      </div>
    </div>
  );
}

export default CompletedTask;
