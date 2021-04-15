import React from "react";

export default class TaskItem extends React.Component {
  render() {
    const { task, handleDeleteTask, handleSelectTask } = this.props;
    let _style = "line-through";
    if (!task.completed) {
      _style = "none";
    }

    return (
      <li className="todos-task__item">
        <div
          className="todos-checkbox"
          onClick={handleSelectTask.bind(null, task)}
        >
          <input type="checkbox" checked={task.completed} readOnly={true} />
          <label htmlFor="checkbox"></label>
          <span className="todos-task__text" style={{ textDecoration: _style }}>
            {task.title}
          </span>
          <button
            className="btn btn-delete pull-right"
            onClick={handleDeleteTask.bind(null, task)}
          >
            x
          </button>
        </div>
      </li>
    );
  }
}
