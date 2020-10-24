import React from 'react';
import PropTypes from 'prop-types';

import './app.css';

import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.currentID = 1;

    this.incrementID = () => {
      this.currentID += this.currentID + 1;
      return this.currentID;
    };

    this.createTask = (
      description,
      isDone = false,
      isEditing = false,
      createdDate = new Date(),
      id = this.incrementID()
    ) => {
      return {
        description,
        isDone,
        isEditing,
        createdDate,
        id,
      };
    };

    this.addTask = (label) => {
      const newTask = this.createTask(label);

      this.setState((state) => {
        const newTasksData = [...state.tasksData, newTask];

        return {
          tasksData: newTasksData,
        };
      });
    };

    const { initialTasks, initialFilter } = this.props;

    this.state = {
      tasksData: initialTasks.map((task) => {
        return this.createTask(task.description, task.isDone, task.isEditing);
      }),
      filter: initialFilter,
    };

    this.findIndexByID = (id) => {
      const { tasksData } = this.state;

      return tasksData.findIndex((task) => task.id === id);
    };

    this.toggleProperty = (property, id) => {
      this.setState((state) => {
        const index = this.findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          [property]: !state.tasksData[index][property],
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };

    this.deleteTask = (id) => {
      this.setState((state) => {
        const index = this.findIndexByID(id);

        const newTasksData = [...state.tasksData.slice(0, index), ...state.tasksData.slice(index + 1)];

        return {
          tasksData: newTasksData,
        };
      });
    };

    this.handleFilterChange = (newFilter) => {
      this.setState({
        filter: newFilter,
      });
    };

    this.clearCompleted = () => {
      const { tasksData } = this.state;

      const activeTasks = tasksData.filter((task) => !task.isDone);

      this.setState({
        tasksData: activeTasks,
      });
    };

    this.countActiveTasks = () => {
      const { tasksData } = this.state;

      return tasksData.filter((task) => !task.isDone).length;
    };

    this.changeDescription = (description, id) => {
      this.setState((state) => {
        const index = this.findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          description,
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };

    this.finishEditing = (id) => {
      this.setState((state) => {
        const index = this.findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          isEditing: false,
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };
  }

  render() {
    const { tasksData, filter } = this.state;

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAdd={this.addTask} />
          </header>
          <section className="main">
            <TaskList
              tasksData={tasksData}
              onToggleProperty={this.toggleProperty}
              filter={filter}
              onChangeDescription={this.changeDescription}
              onFinishEditing={this.finishEditing}
              onDelete={this.deleteTask}
            />
            <Footer
              filter={filter}
              onFilterChange={this.handleFilterChange}
              onClearCompleted={this.clearCompleted}
              activeTasksCount={this.countActiveTasks}
            />
          </section>
        </section>
      </div>
    );
  }
}

App.defaultProps = {
  initialTasks: [],
  initialFilter: 'All',
};

App.propTypes = {
  initialTasks: PropTypes.arrayOf(PropTypes.object),
  initialFilter: PropTypes.oneOf(['All', 'Active', 'Completed']),
};
