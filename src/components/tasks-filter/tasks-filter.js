import React from 'react';

import './tasks-filter.css';

export default class TasksFilter extends React.Component {
    constructor(props) {
        super(props);

        this.classSelected = "selected";

        this.state = {
            filter: props.filter
        };

        this.getFilterButtons = () => {
            return document.querySelectorAll(".filters button");
        };

        this.selectButtonByFilter = (filter) => {
            console.log(filter);
            const buttons = this.getFilterButtons();
            console.log(buttons);

            for (let button of buttons) {
                if (button.textContent === filter) {
                    if (!button.classList.contains(this.classSelected)) {
                        button.classList.add(this.classSelected);
                    }
                }
            }
        };

        this.onClick = (event) => {
            if (event.target.classList.contains(this.classSelected)) {
                return;
            }
            
            const buttons = this.getFilterButtons();
            for (let button of buttons) {
                button.classList.remove(this.classSelected);
            }

            event.target.classList.add(this.classSelected);
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


