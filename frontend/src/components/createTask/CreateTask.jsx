import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";

function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/task/addTask", { title, description }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: "ADD_TASK",
      title,
      description
    });

    setTitle("");
    setDescription("");
  }

  return (
    <div className="min-h-[60vh] flex justify-center items-start px-4 md:px-0 mt-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8 border border-pink-200">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 text-center mb-6">
          Create New Task
        </h2>

        {/* Form */}
        <form onSubmit={handleAdd} className="space-y-5">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-1 font-medium text-pink-600">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 md:py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-pink-600">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write task description..."
              style={{ resize: "none" }}
              className="w-full px-4 py-2 md:py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 md:px-8 py-2 md:py-3 rounded-md shadow-md transition-all duration-200"
            >
              + Add Task
            </button>
          </div>
        </form>

        {/* Optional Toast */}
        <div className="toast hidden bg-green-600 text-white p-3 rounded-md shadow-md text-center mt-4" id='toast'>
          <p>Task added successfully!</p>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
