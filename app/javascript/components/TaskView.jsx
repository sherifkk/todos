import React from "react";

const TaskForm = props => {
  const { selectedTask, handleTaskStatus, handleUpdateTask } = props;
  let _buttonText = "Done";

  if (!selectedTask) {
    return null;
  }

  if (selectedTask.completed) {
    _buttonText = "Undone";
  }

  return (
    <div className="todos-task__view">
      <div className="todos-task__item">
        <span className="todos-taskview_text">{selectedTask.title}</span>
      </div>
      <button
        className="btn btn-done pull-right"
        onClick={handleTaskStatus.bind(null, selectedTask)}
      >
        {_buttonText}
      </button>
      <form
        className="form-inline todos-form-inline"
        onSubmit={handleUpdateTask}
      >
        <input
          type="date"
          className="form-control todos-deadline"
          placeholder={selectedTask.deadline ? selectedTask.deadline : ""}
        />
        <input
          type="text"
          className="form-control todos-form-control"
          placeholder={
            selectedTask.description
              ? selectedTask.description
              : "Add description"
          }
        />
        <input type="file" name="file" />
        <button className="btn btn-done pull-right" type="submit">
          Update
        </button>
      </form>
      <a href={selectedTask.file ? selectedTask.file : ""} download>
        {selectedTask.file ? "Download Attached File..." : ""}
      </a>
    </div>
  );
};

export default TaskForm;
