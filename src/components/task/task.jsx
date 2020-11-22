import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = (props) => {
  // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
  const formatTime = (sec) => {
    return [Math.floor(sec / 60 / 60), Math.floor((sec / 60) % 60), Math.floor(sec % 60)]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1');
  };

  const toggleDone = () => {
    const { isDone, id, onToggleProperty, pause } = props;
    onToggleProperty('isDone', id, 'toggle', !isDone);
    setTimeout(pause.bind(this, id));
  };

  const { description, isDone, createdDate, id, seconds, onToggleProperty, onDelete, play, pause } = props;

  return (
    <div className="view">
      <input className="toggle" onChange={toggleDone} type="checkbox" checked={isDone} />
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button aria-label="play" onClick={() => play(id)} type="button" className="icon icon-play" />
          <button type="button" onClick={() => pause(id)} aria-label="pause" className="icon icon-pause" />
          {formatTime(seconds)}
        </span>
        <span className="description">{formatDistanceToNow(createdDate)}</span>
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
  seconds: 0,
  createdDate: new Date(),
};

Task.propTypes = {
  description: PropTypes.string,
  isDone: PropTypes.bool,
  createdDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  seconds: PropTypes.number,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
};

export default Task;
