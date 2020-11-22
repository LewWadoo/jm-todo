import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ onAdd, initialLabel }) => {
  const [label, setLabel] = useState(initialLabel);
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(label, min, sec);
    setLabel(initialLabel);
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form" id="add-task">
      <input
        form="add-task"
        className="new-todo"
        onChange={(event) => setLabel(event.target.value)}
        value={label}
        placeholder="Task"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(event) => setMin(event.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(event) => setSec(event.target.value)}
      />
      <input type="submit" className="submit-button" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  initialLabel: '',
};

NewTaskForm.propTypes = {
  initialLabel: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
