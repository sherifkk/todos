import React from "react";

const TaskForm = props => {
  const { handleSubmit } = props;

  return (
    <form className="form-inline todos-form-inline" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control todos-form-control"
        placeholder="What needs to be done?"
        name="title"
      />
    </form>
  );
};

export default TaskForm;
