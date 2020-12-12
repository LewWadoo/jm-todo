import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task';

const TaskList = ({ tasksData, filter, onFinishEditing, onChangeDescription, onToggleProperty, onDelete, onTick }) => {
  const tasks = tasksData.map((taskData) => {
    if ((filter === 'Completed' && !taskData.isDone) || (filter === 'Active' && taskData.isDone)) {
      return null;
    }

    const inputField = taskData.isEditing ? (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onFinishEditing(taskData.id);
        }}
      >
        <input
          type="text"
          className="edit"
          value={taskData.description}
          onChange={(event) => onChangeDescription(event.target.value, taskData.id)}
        />
      </form>
    ) : null;

    let classNames = '';
    if (taskData.isDone) {
      classNames += ' completed';
    }
    if (taskData.isEditing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames} key={taskData.id}>
        <Task {...taskData} onToggleProperty={onToggleProperty} onDelete={onDelete} onTick={onTick} />

        {inputField}
      </li>
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

TaskList.defaultProps = {
  filter: 'All',
  tasksData: [],
};

TaskList.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onChangeDescription: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  tasksData: PropTypes.arrayOf(PropTypes.object),
  onTick: PropTypes.func.isRequired,
};

export default TaskList;
