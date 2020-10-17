import React from 'react';

import './task-list.css';
import Task from '../task';

const TaskList = (props) => {
    const tasksData = props.tasksData.map((taskData) => {
        if ((props.filter === "Completed" && !taskData.isDone) ||
            (props.filter === "Active" && taskData.isDone)) {
            return null;
        }
        
        const inputField = taskData.isEditing ? 
              <input type="text" 
                     className="edit" 
                     value={taskData.description} 
                     onChange={(event) => props.onChangeDescription(event.target.value, taskData.id)} />
        : null;

        let classNames = "";
        if (taskData.isDone) {
            classNames += " completed";
        }
        if (taskData.isEditing) {
            classNames += " editing";
        }
        
        return (
            <li className={classNames} key={taskData.id}>
              <Task {...taskData}
                    onToggleProperty={props.onToggleProperty}
                    onDelete={props.onDelete}/>
              {inputField}
            </li>
        );
    });

    return (
        <ul className="todo-list">
          {tasksData}
        </ul>
    );
};

export default TaskList;
