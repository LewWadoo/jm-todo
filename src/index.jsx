import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

const initialTasks = [
  {
    description: 'Completed task',
    seconds: 12 * 60 + 25,
  },
  {
    description: 'Editing task',
    seconds: 12 * 60 + 25,
  },
  {
    description: 'Active task',
    seconds: 12 * 60 + 25,
  },
];

ReactDOM.render(<App initialTasks={initialTasks} />, document.getElementById('root'));
