import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ description, isDone, createdDate, id, onToggleProperty, onDelete }) => {
  return (
    <div className="view">
      <input className="toggle" onChange={() => onToggleProperty('isDone', id)} type="checkbox" checked={isDone} />
      <label>
        <span className="description">{description}</span>
        <span className="created">{formatDistanceToNow(createdDate)}</span>
      </label>
      <button
        className="icon icon-edit"
        aria-label="edit"
        type="button"
        onClick={() => onToggleProperty('isEditing', id)}
      />
      <button className="icon icon-destroy" aria-label="destroy" type="button" onClick={() => onDelete(id)} />
    </div>
  );
};

Task.defaultProps = {
  description: '',
  isDone: false,
  createdDate: new Date(),
};

Task.propTypes = {
  description: PropTypes.string,
  isDone: PropTypes.bool,
  createdDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
