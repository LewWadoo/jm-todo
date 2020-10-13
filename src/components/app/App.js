import React from 'react';

import './App.css';
import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import '../../index.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasksData: [
                {isDone: true, isEditing: false, description: "Completed task", createdDate: new Date(), id: 1},
                {isDone: false, isEditing: true, description: "Editing task", createdDate: new Date(), id: 2},
                {isDone: false, isEditing: false, description: "Active task", createdDate: new Date(), id: 3}
                // {classStatus: "completed", description: "Completed task", created: "created 17 seconds ago", id: 1},
                // {classStatus: "editing", description: "Editing task", created: "created 5 minutes ago", id: 2},
                // {description: "Active task", created: "created 5 minutes ago", id: 3}
            ]
        };

        this.deleteTask = (id) => {
            // console.log(id);
            this.setState((state) => {
                const index = state.tasksData.findIndex((task) => task.id === id);
                const newTasksData = [
                    ...state.tasksData.slice(0, index),
                    ...state.tasksData.slice(index + 1)
                ];

                // console.log(newTasksData);

                return {
                    tasksData: newTasksData
                };
            });
        };
    };

    render() {
        
        return (
            <div>
              <section className="todoapp">
                <header className="header">
                  <h1>todos</h1>
                  <NewTaskForm/>                      
                </header>
                <section className="main">
                  <TaskList tasksData={this.state.tasksData}
                            onDelete={this.deleteTask}/>
                  <Footer/>
                </section>
              </section>
            </div>        
        );
    };
}
