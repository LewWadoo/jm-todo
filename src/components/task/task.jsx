import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTimerOn: false,
      seconds: 0,
    };

    this.componentDidMount = () => {
      this.interval = null;
    };

    this.tick = () => {
      this.setState((state) => {
        return {
          seconds: state.seconds + 1,
        };
      });
    };

    this.play = () => {
      const { isTimerOn } = this.state;
      if (isTimerOn) {
        return;
      }

      this.setState({
        isTimerOn: true,
      });
      this.interval = setInterval(this.tick, 1000);
    };

    this.pause = () => {
      const { isTimerOn } = this.state;
      if (!isTimerOn) {
        return;
      }

      this.setState({
        isTimerOn: false,
      });
      clearInterval(this.interval);
    };
  }

  render() {
    const { description, isDone, createdDate, id, onToggleProperty, onDelete } = this.props;

    const { seconds } = this.state;

    return (
      <div className="view">
        <input className="toggle" onChange={() => onToggleProperty('isDone', id)} type="checkbox" checked={isDone} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            {' '}
            <button aria-label="play" onClick={this.play} type="button" className="icon icon-play" />
            <button type="button" onClick={this.pause} aria-label="pause" className="icon icon-pause" />
            {seconds}
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
  }
}

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
