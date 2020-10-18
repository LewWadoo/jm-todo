import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

const classSelected = "selected";

export default class TasksFilter extends React.Component {
    constructor(props) {
        super(props);

        this.getFilterButtons = () => {
            return document.querySelectorAll(".filters button");
        };

        this.selectButtonByFilter = (filter) => {
            const buttons = this.getFilterButtons();

            for (let button of buttons) {
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
            for (let button of buttons) {
                button.classList.remove(classSelected);
            }

            event.target.classList.add(classSelected);
            this.props.onFilterChange(event.target.textContent);
        };
    };
    
    render() {
        
        return (
            <ul className="filters">
              <li>
                <button className="selected"
                        onClick={this.onClick}>All</button>
              </li>
              <li>
                <button
                  onClick={this.onClick}>Active</button>
              </li>
              <li>
                <button
                  onClick={this.onClick}>Completed</button>
              </li>
            </ul>
        );
    };
};

TasksFilter.defaultProps = {
    filter: "All"
};

TasksFilter.propTypes = {
    filter: PropTypes.oneOf(["All", "Active", "Completed"]),
    onFilterChange: PropTypes.func
};
