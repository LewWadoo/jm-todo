import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

const initialTasks = [
  {
    description: 'Completed task',
    isDone: true,
    isEditing: false,
    createdDate: new Date(new Date() - 17000),
    seconds: 12 * 60 + 25,
  },
  {
    description: 'Editing task',
    isDone: false,
    isEditing: true,
    createdDate: new Date(new Date() - 5 * 60 * 1000),
    seconds: 12 * 60 + 25,
  },
  {
    description: 'Active task',
    isDone: false,
    isEditing: false,
    createdDate: new Date(new Date() - 5 * 60 * 1000),
    seconds: 12 * 60 + 25,
  },
];

ReactDOM.render(<App initialTasks={initialTasks} />, document.getElementById('root'));
