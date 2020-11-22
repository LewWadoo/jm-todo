import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

const classSelected = 'selected';

const TasksFilter = ({ onFilterChange }) => {
  const getFilterButtons = () => {
    return document.querySelectorAll('.filters button');
  };

  const onClick = (event) => {
    if (event.target.classList.contains(classSelected)) {
      return;
    }

    const buttons = getFilterButtons();
    for (const button of buttons) {
      button.classList.remove(classSelected);
    }

    event.target.classList.add(classSelected);
    onFilterChange(event.target.textContent);
  };

  return (
    <ul className="filters">
      <li>
        <button className="selected" type="button" onClick={onClick}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={onClick}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={onClick}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
