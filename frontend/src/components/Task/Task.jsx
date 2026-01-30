import React, { useContext } from 'react';
import moment from 'moment';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';

function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_TASK",
      id
    });
  };

  const handleMarkDone = () => {
    dispatch({
      type: "MARK_DONE",
      id
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 ${task.completed ? 'border-pink-600' : 'border-pink-300'} hover:shadow-xl transition transform hover:-translate-y-1`}>
      
      {/* Checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-5 h-5 accent-pink-500 cursor-pointer"
          onChange={handleMarkDone}
          checked={task.completed}
        />

        {/* Task info */}
        <div className="flex-1">
          <h4 className={`text-lg font-semibold capitalize ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </h4>
          <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {task.description}
          </p>
          <p className='text-xs italic opacity-60 mt-1'>
            {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
          </p>
        </div>
      </div>

      {/* Delete button */}
      <div className="mt-3 sm:mt-0 flex-shrink-0">
        <button
          onClick={handleRemove}
          className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full shadow-md transition transform hover:scale-110"
        >
          <DeleteIcon style={{ fontSize: 22 }} />
        </button>
      </div>
    </div>
  );
}

export default Task;
