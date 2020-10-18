import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task';

const TaskList = (props) => {
    
    const tasksData = props.tasksData.map((taskData) => {
        if ((props.filter === "Completed" && !taskData.isDone) ||
            (props.filter === "Active" && taskData.isDone)) {
            return null;
        }

        const inputField = taskData.isEditing ?
              <form
                onSubmit={(event) => {
                    event.preventDefault();
                    props.onFinishEditing(taskData.id);
                }}
              >
                <input type="text" 
                       className="edit" 
                       value={taskData.description}
                       onChange={(event) => props.onChangeDescription(event.target.value, taskData.id)} />
              </form>
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

TaskList.defaultProps = {
    filter: "All"
};

TaskList.propTypes = {
    taskData: PropTypes.object,
    onToggleProperty: PropTypes.func,
    filter: PropTypes.oneOf(["All", "Active", "Completed"]),
    onChangeDescription: PropTypes.func,
    onFinishEditing: PropTypes.func,
    onDelete: PropTypes.func
};

export default TaskList;
