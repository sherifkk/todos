import React from "react";
import TaskItem from "./TaskItem";

const TaskList = props => {
  const { tasks, handleDeleteTask, handleSelectTask } = props;
  return (
    <ul className="todos-task__list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleSelectTask={handleSelectTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
