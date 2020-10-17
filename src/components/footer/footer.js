import React from 'react';

import './footer.css';
import TasksFilter from '../tasks-filter';

const Footer = (props) => {
    return (
        <footer className="footer">
          <span className="todo-count">{props.activeTasksCount()} items left</span>
          <TasksFilter
            filter={props.filter}
            onFilterChange={props.onFilterChange}
          />
          <button
            onClick={props.onClearCompleted}
            className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;
