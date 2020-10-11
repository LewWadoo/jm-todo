import React from 'react';

import './task-list.css';
import Task from '../task';

const TaskList = ({tasksData}) => {
    const taskElements = tasksData.map((taskElement) => {
        return (
            <Task {...taskElement}/>
        );
    });

                                       return (
                                           <ul className="todo-list">
                                             {taskElements}
                                           </ul>
                                       );
};

export default TaskList;
