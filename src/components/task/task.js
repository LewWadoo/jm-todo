import React from 'react';

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
                  <span className="created">{this.props.created}</span>
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
