import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

import TaskTitle from "./TaskTitle";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskView from "./TaskView";

const propTypes = {
  tasks: PropTypes.array,
  selectedTask: PropTypes.object,
  handleAddTask: PropTypes.func,
  handleUpdateTask: PropTypes.func,
  handleDeleteTask: PropTypes.func,
  handleSelectTask: PropTypes.func,
  handleTaskStatus: PropTypes.func,
};

const defaultProps = {
  tasks: [],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks,
      selectedTask: null,
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.handleTaskStatus = this.handleTaskStatus.bind(this);
  }

  makeAjaxCall(type, url, params, successCallback, errorMessage) {
    $.ajax({
      type: type,
      url: url,
      data: {
        task: params,
      },
      dataType: "json",
      success: function(data) {
        console.log("data: ", data);
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(errorMessage, error);
      },
    });
  }

  handleAddTask(event) {
    event.preventDefault();

    const that = this;
    const url = "/tasks";
    const params = {
      title: event.target[0].value,
      completed: false,
    };
    const errorMessage = "Failed to add a new task: ";
    const successCallback = data => {
      that.setState({
        tasks: that.state.tasks.concat([data]),
        selectedTask: data,
      });
      event.target[0].value = "";
    };

    that.makeAjaxCall("POST", url, params, successCallback, errorMessage);
  }

  handleDeleteTask(task) {
    let that = this;
    const taskId = task.id;
    const url = `/tasks/${taskId}`;
    const errorMessage = "Failed to delete a task: ";
    const successCallback = () => {
      that.setState({
        tasks: that.state.tasks.filter(task => {
          return task.id !== taskId;
        }),
        selectedTask: null,
      });
    };

    that.makeAjaxCall("DELETE", url, {}, successCallback, errorMessage);
  }

  handleUpdateTask(event) {
    event.preventDefault();

    const { selectedTask } = this.state;
    const that = this;

    const successCallback = data => {
      that.setState({
        selectedTask: data,
      });
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
    };

    const deadline = event.target[0].value;
    const description = event.target[1].value;
    const file = event.target[2].files[0];

    const formData = new FormData();
    if (deadline && deadline != selectedTask.deadline) {
      formData.append("task[deadline]", deadline);
    }
    if (description && description != selectedTask.description) {
      formData.append("task[description]", description);
    }
    if (file) {
      formData.append("task[file]", file);
    }

    this.updateAjaxCall(formData, successCallback);
  }

  handleTaskStatus(task) {
    const that = this;

    const successCallback = data => {
      that.setState({
        selectedTask: data,
      });
    };

    const formData = new FormData();
    formData.append("task[completed]", !task.completed);

    this.updateAjaxCall(formData, successCallback);
  }

  updateAjaxCall(data, successCallback) {
    const url = `/tasks/${this.state.selectedTask.id}`;
    const errorMessage = "Failed to update a task: ";

    $.ajax({
      url: url,
      data: data,
      processData: false,
      contentType: false,
      type: "PATCH",
      success: function(data) {
        console.log("data: ", data);
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(errorMessage, error);
      },
    });
  }

  handleSelectTask(task) {
    this.setState({
      selectedTask: task,
    });
  }

  render() {
    const { tasks, selectedTask } = this.state;

    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-md-6 col-md-offset-3">
            <div className="todos-task">
              <TaskTitle />
              <TaskForm handleSubmit={this.handleAddTask} />
              <TaskList
                tasks={tasks}
                handleDeleteTask={this.handleDeleteTask}
                handleSelectTask={this.handleSelectTask}
              />
              <TaskView
                selectedTask={selectedTask}
                handleTaskStatus={this.handleTaskStatus}
                handleUpdateTask={this.handleUpdateTask}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;
