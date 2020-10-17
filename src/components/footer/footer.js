import React from 'react';
import PropTypes from 'prop-types';

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

Footer.defaultProps = {
    filter: "All"
};

Footer.propTypes = {
    filter: PropTypes.oneOf(["All", "Active", "Completed"]),
    onFilterChange: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    activeTasksCount: PropTypes.func.isRequired
};

export default Footer;
