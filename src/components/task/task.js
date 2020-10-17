import React from 'react';
import PropTypes from 'prop-types';
import {formatDistanceToNow} from 'date-fns';

export default class Task extends React.Component {
    render() {
        return (
              <div className="view">
                <input
                  className="toggle"
                  onChange={() => this.props.onToggleProperty("isDone", this.props.id)}
                  type="checkbox" checked={this.props.isDone}
                       />
                <label>
                  <span className="description">{this.props.description}</span>
                  <span className="created">{formatDistanceToNow(this.props.createdDate)}</span>
                </label>
                <button className="icon icon-edit"
                        onClick={() => this.props.onToggleProperty("isEditing", this.props.id)}
                ></button>
                <button className="icon icon-destroy"
                        onClick={() => this.props.onDelete(this.props.id)}></button>
              </div>
        );
    }
}

Task.propTypes = {
    description: PropTypes.string,
    isDone: PropTypes.bool,
    isEditing: PropTypes.bool,
    createdDate: PropTypes.instanceOf(Date),
    id: PropTypes.number,
    onToggleProperty: PropTypes.func,
    onDelete: PropTypes.func
};
