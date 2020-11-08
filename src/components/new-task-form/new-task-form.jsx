import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    const { onAdd, initialLabel } = this.props;

    this.state = {
      label: initialLabel,
      min: '',
      sec: '',
    };

    this.handleSubmit = (event) => {
      const { label, min, sec } = this.state;

      event.preventDefault();
      onAdd(label, min, sec);
      this.setState({
        label: initialLabel,
        min: '',
        sec: '',
      });
    };

    this.handleChange = (event, property) => {
      this.setState({
        [property]: event.target.value,
      });
    };
  }

  render() {
    const { label, min, sec } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="new-todo-form" id="add-task">
        <input
          form="add-task"
          className="new-todo"
          onChange={(event) => this.handleChange(event, 'label')}
          value={label}
          placeholder="Task"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={(event) => this.handleChange(event, 'min')}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={(event) => this.handleChange(event, 'sec')}
        />
        <input type="submit" className="submit-button" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  initialLabel: '',
};

NewTaskForm.propTypes = {
  initialLabel: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};
