import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './app.css';

import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

const App = ({ initialTasks, initialFilter }) => {
  const createTask = (
    description,
    seconds = 0,
    isDone = false,
    isEditing = false,
    createdDate = new Date(),
    id = window.id
  ) => {
    // eslint-disable-next-line no-console
    console.log('in createTask:  id', id);
    window.id += 1;
    return {
      description,
      seconds,
      isDone,
      isEditing,
      createdDate,
      id,
      interval: null,
    };
  };

  const [tasksData, setTasksData] = useState([]);

  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    window.id = 0;
    setTasksData(
      initialTasks.map((task) => {
        const { description, isDone, isEditing, createdDate, seconds } = task;

        return createTask(description, seconds, isDone, isEditing, createdDate);
      })
    );
  }, [initialTasks]);

  const convertToNumber = (string) => {
    const integer = parseInt(string, 10);
    return Number.isNaN(integer) ? 0 : integer;
  };

  const addTask = (label, min = 0, sec = 0) => {
    const minInt = convertToNumber(min);
    const secInt = convertToNumber(sec);
    const newTask = createTask(label, minInt * 60 + secInt);
    // eslint-disable-next-line no-console
    console.log('in addTask:  newTask', newTask);

    setTasksData((tasks) => {
      return [...tasks, newTask];
    });
  };

  const findIndexByID = (id, tasks) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const getChangedProperty = (property, task, changeVariant = 'toggle', value = null) => {
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

  const changeProperty = (property, id, changeVariant, propertyShouldNotBe = null, value = null) => {
    setTasksData((tasks) => {
      const index = findIndexByID(id, tasks);
      if (tasks[index][property] === propertyShouldNotBe) {
        return tasks;
      }
      // eslint-disable-next-line no-console
      console.log('in changeProperty before setTasksData:  tasksData, id, index', tasksData, id, index);

      const modifiedTaskData = {
        ...tasks[index],
        [property]: getChangedProperty(property, tasks[index], changeVariant, value),
      };

      const modifiedTasksData = [...tasks.slice(0, index), modifiedTaskData, ...tasks.slice(index + 1)];

      // eslint-disable-next-line no-console
      console.log('in changeProperty:  modifiedTasksData, id, index', modifiedTasksData, id, index);

      return modifiedTasksData;
    });
  };

  const deleteTask = (id) => {
    setTasksData((tasks) => {
      const index = findIndexByID(id, tasks);
      const { interval } = tasks[index];

      if (interval) {
        clearInterval(interval);
      }

      return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    });
  };

  const clearCompleted = () => {
    setTasksData((tasks) => {
      return tasks.filter((task) => !task.isDone);
    });
  };

  const countActiveTasks = () => {
    return tasksData.filter((task) => !task.isDone).length;
  };

  const changeDescription = (description, id) => {
    changeProperty('description', id, 'value', null, description);
  };

  const finishEditing = (id) => {
    changeProperty('isEditing', id, 'toggle', false);
  };

  const tick = (id) => {
    changeProperty('seconds', id, 'increment');
  };

  const play = (id) => {
    const index = findIndexByID(id, tasksData);
    const { isDone, interval } = tasksData[index];

    // eslint-disable-next-line no-console
    console.log('in play:  interval, id', interval, id);
    // eslint-disable-next-line no-debugger
    // debugger;

    if (isDone || interval !== null) {
      return;
    }

    changeProperty('interval', id, 'value', 0, setInterval(tick, 1000, id));
  };

  const pause = (id) => {
    const index = findIndexByID(id, tasksData);
    const { interval } = tasksData[index];
    if (interval === null) {
      return;
    }

    clearInterval(interval);
    changeProperty('interval', id, 'value', null, null);
  };

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={addTask} />
        </header>
        <section className="main">
          <TaskList
            tasksData={tasksData}
            onToggleProperty={changeProperty}
            filter={filter}
            onChangeDescription={changeDescription}
            onFinishEditing={finishEditing}
            onDelete={deleteTask}
            play={play}
            pause={pause}
          />
          <Footer
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            activeTasksCount={countActiveTasks}
          />
        </section>
      </section>
    </div>
  );
};

App.defaultProps = {
  initialTasks: [],
  initialFilter: 'All',
};

App.propTypes = {
  initialTasks: PropTypes.arrayOf(PropTypes.object),
  initialFilter: PropTypes.oneOf(['All', 'Active', 'Completed']),
};

export default App;
