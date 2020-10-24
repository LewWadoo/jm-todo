import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

const initialTasks = [
  {
    description: 'Completed task',
    isDone: true,
    isEditing: false,
  },
  {
    description: 'Editing task',
    isDone: false,
    isEditing: true,
  },
  {
    description: 'Active task',
    isDone: false,
    isEditing: false,
  },
];

ReactDOM.render(<App initialTasks={initialTasks} />, document.getElementById('root'));
