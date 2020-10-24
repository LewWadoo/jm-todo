import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

const classSelected = 'selected';

export default class TasksFilter extends React.Component {
  constructor(props) {
    super(props);

    this.getFilterButtons = () => {
      return document.querySelectorAll('.filters button');
    };

    const { onFilterChange } = props;

    this.selectButtonByFilter = (filter) => {
      const buttons = this.getFilterButtons();

      for (const button of buttons) {
        if (button.textContent === filter) {
          if (!button.classList.contains(classSelected)) {
            button.classList.add(classSelected);
          }
        }
      }
    };

    this.onClick = (event) => {
      if (event.target.classList.contains(classSelected)) {
        return;
      }

      const buttons = this.getFilterButtons();
      for (const button of buttons) {
        button.classList.remove(classSelected);
      }

      event.target.classList.add(classSelected);
      onFilterChange(event.target.textContent);
    };
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected" type="button" onClick={this.onClick}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={this.onClick}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={this.onClick}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
