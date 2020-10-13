import React from 'react';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDone: props.isDone,
            isEditing: props.isEditing
        };

        this.toggleDone = () => {
            this.setState((state) => {
                return {
                    isDone: !state.isDone
                };
            });
        };
    };

    render() {
        const inputField = this.props.classStatus === "editing" ? <input type="text" className="edit" value="Editing task" /> : null;

        let classNames = "";
        if (this.state.isDone) {
            classNames += " completed";
        }
        if (this.state.isEditing) {
            classNames += " editing";
        }
        
        return (
            <li className={classNames} key={this.props.id}>
              <div className="view">
                <input className="toggle" type="checkbox"
                  onClick={this.toggleDone}/>
                <label>
                  <span className="description">{this.props.description}</span>
                  <span className="created">{this.props.created}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                        onClick={() => this.props.onDelete(this.props.id)}></button>
              </div>
              {inputField}
            </li>
        );
    }
}
