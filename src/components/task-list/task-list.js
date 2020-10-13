import React from 'react';

import './task-list.css';
import Task from '../task';

const TaskList = (props) => {
    const taskElements = props.tasksData.map((taskElement) => {
        return (
            <Task {...taskElement}
                  onDelete={props.onDelete}/>
        );
    });

    return (
        <ul className="todo-list">
          {taskElements}
        </ul>
    );
};

export default TaskList;
