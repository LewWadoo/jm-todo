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

    this.createTask = (description, seconds = 0, isDone = false, isEditing = false, createdDate = new Date()) => {
      return {
        description,
        seconds,
        isDone,
        isEditing,
        createdDate,
        id: this.incrementID(),
        interval: null,
      };
    };

    this.convertToNumber = (string) => {
      const integer = parseInt(string, 10);
      return Number.isNaN(integer) ? 0 : integer;
    };

    this.addTask = (label, min = 0, sec = 0) => {
      const minInt = this.convertToNumber(min);
      const secInt = this.convertToNumber(sec);
      const newTask = this.createTask(label, minInt * 60 + secInt);

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
        const { description, isDone, isEditing, createdDate, seconds } = task;
        return this.createTask(description, seconds, isDone, isEditing, createdDate);
      }),
      filter: initialFilter,
    };

    this.findIndexByID = (id) => {
      const { tasksData } = this.state;

      return tasksData.findIndex((task) => task.id === id);
    };

    this.getChangedProperty = (property, task, changeVariant = 'toggle', value = null) => {
      switch (changeVariant) {
        case 'toggle':
          return !task[property];
        case 'increment':
          return task[property] + 1;
        case 'value':
          return value;
        default:
          return value;
      }
    };

    this.changeProperty = (property, id, changeVariant, propertyShouldNotBe = null, value = null) => {
      const { tasksData } = this.state;
      const index = this.findIndexByID(id);
      if (tasksData[index][property] === propertyShouldNotBe) {
        // eslint-disable-next-line no-console
        console.log('change prop', property, this.state);
        return false;
      }
      this.setState((state) => {
        const modifiedTaskData = {
          ...tasksData[index],
          [property]: this.getChangedProperty(property, tasksData[index], changeVariant, value),
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

      return true;
    };

    this.deleteTask = (id) => {
      this.setState((state) => {
        const index = this.findIndexByID(id);
        const { tasksData } = state;
        const { interval } = tasksData[index];

        if (interval) {
          clearInterval(interval);
        }

        const newTasksData = [...tasksData.slice(0, index), ...tasksData.slice(index + 1)];

        return {
          tasksData: newTasksData,
        };
      });
    };

    this.handleFilterChange = (filter) => {
      this.setState({
        filter,
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
      this.changeProperty('description', id, 'value', null, description);
    };

    this.finishEditing = (id) => {
      this.changeProperty('isEditing', id, 'toggle', false);
    };

    this.tick = (id) => {
      this.changeProperty('seconds', id, 'increment');
    };

    this.play = (id) => {
      const index = this.findIndexByID(id);
      const { tasksData } = this.state;
      const { isDone, interval } = tasksData[index];
      if (isDone || interval !== null) {
        return;
      }

      this.changeProperty(
        'interval',
        id,
        'value',
        0,
        setInterval(() => this.tick(id), 1000)
      );
    };

    this.pause = (id) => {
      const index = this.findIndexByID(id);
      const { tasksData } = this.state;
      const { interval } = tasksData[index];
      if (interval === null) {
        return;
      }

      clearInterval(interval);
      this.changeProperty('interval', id, 'value', null, null);
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
              /* onToggleProperty={this.toggleProperty} */
              onToggleProperty={this.changeProperty}
              filter={filter}
              onChangeDescription={this.changeDescription}
              onFinishEditing={this.finishEditing}
              onDelete={this.deleteTask}
              play={this.play}
              pause={this.pause}
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
