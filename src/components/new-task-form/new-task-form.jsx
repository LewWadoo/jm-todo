import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    const { onAdd, initialLabel } = this.props;

    this.state = {
      label: initialLabel,
    };

    this.handleSubmit = (event) => {
      const { label } = this.state;

      event.preventDefault();
      onAdd(label);
      this.setState({
        label: initialLabel,
      });
    };

    this.handleChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };
  }

  render() {
    const { label } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input className="new-todo" onChange={this.handleChange} value={label} placeholder="What needs to be done?" />
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
