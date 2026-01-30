import React, { useContext } from "react";
import Task from "./Task/Task";
import TaskContext from "../context/TaskContext";

function AllTask() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="min-h-[60vh] px-4 md:px-8 py-8">
      {tasks.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 border-l-4 border-pink-400 p-5"
            >
              <Task task={task} id={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[50vh] text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-3 animate-pulse">
            No Tasks Found
          </h1>
          <p className="text-gray-500 text-lg mb-4">
            Create a new task to get started!
          </p>
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-5365.jpg?w=740&t=st=1706697242~exp=1706697842~hmac=1b563ae4a59b5d9c667f1cdd7a6d14e77de35b2c52fa8cf6f8a18ed42618e609"
            alt="No Task"
            className="w-3/4 sm:w-1/2 lg:w-1/3 mt-4 rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default AllTask;
