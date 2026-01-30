import React from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

function Active() {
  const { tasks } = useContext(TaskContext);

  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="p-4 min-h-[60vh]">
      {activeTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              id={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            No Active Tasks Found
          </h1>
          <p className="text-gray-500 text-lg">
            Create a new task or check completed tasks.
          </p>
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-5365.jpg?w=740&t=st=1706697242~exp=1706697842~hmac=1b563ae4a59b5d9c667f1cdd7a6d14e77de35b2c52fa8cf6f8a18ed42618e609"
            alt="No Task"
            className="w-1/2 mt-6"
          />
        </div>
      )}
    </div>
  );
}

export default Active;
