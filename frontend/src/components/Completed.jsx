import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";

function Completed() {
  const { tasks } = useContext(TaskContext);

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-[60vh] px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-200">
      {completedTasks.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTasks.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 border-l-8 border-gradient-to-b from-green-400 via-teal-400 to-blue-400 p-6"
            >
              <CompletedTask task={task} id={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 animate-pulse mb-4">
            No Completed Task Found
          </h1>
          <p className="text-gray-500 text-lg">
            Complete some tasks to see them here!
          </p>
          <img
            src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-5331.jpg?w=740&t=st=1706698040~exp=1706698640~hmac=172e308cb0d9cbeb6371a07ad0e39e84b8b3794a403e9de776dcd5c29ef464d3"
            alt="No Completed Task"
            className="w-1/2 mt-6"
          />
        </div>
      )}
    </div>
  );
}

export default Completed;
