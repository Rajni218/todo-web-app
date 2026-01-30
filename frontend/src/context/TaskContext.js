import { createContext, useReducer } from "react";
import TaskReducer from "../reducer/taskReducer";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks: state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
