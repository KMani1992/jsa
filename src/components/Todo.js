import React from "react";
import { isEmpty } from "../util/util";

function Controls({
  todo,
  isEditMode,
  enableEditMode,
  updateTodo,
  deleteTodo,
  editText
}) {
  const { id } = todo;
  return (
    <React.Fragment>
      {isEditMode ? (
        <button id={`todo-save${id}`} className="btn waves-effect waves-light" value={id} onClick={() => updateTodo(id)} disabled={isEmpty(editText)}>
          Save
          </button>
      ) : (
          <button id={`todo-edit${id}`} className="btn waves-effect waves-light" onClick={() => enableEditMode(todo)}>
            Edit
          </button>
        )}
      &nbsp;&nbsp;&nbsp;<button id={`todo-delete${id}`}  className="btn waves-effect waves-light red" onClick={() => deleteTodo(id)}>
        Delete
        </button>
    </React.Fragment>
  );
}

function DisplayText({ isEditMode, todo, onTodoTextChange, editText }) {
  const { completed, text, id } = todo;
  return (
    <React.Fragment>
      {isEditMode ? (
        <input
          id={`id_todo-text${id}`}
          name="name_todo-text"
          type="text"
          title="Enter Todo"
          className="validate"
          value={editText}
          onChange={(e) => onTodoTextChange(e)}
        />
      ) : (
          <label style={{ textDecoration: completed ? "line-through" : "none" }}>
            {text}
          </label>
        )}
    </React.Fragment>
  );
}

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isEditMode: false, editText: "" };
  }

  onTodoTextChange = e => {
    console.log("todo chg", e.target);
    this.setState({ editText: e.target.value });
  };

  enableEditMode = todo => {
    this.setState({ isEditMode: true, editText: todo.text });
  };

  updateTodo = id => {
    if (!isEmpty(this.state.editText)) {
      this.props.editTodo(id, this.state.editText);
      this.setState({ isEditMode: false, editText: "" });
    }
  };

  deleteTodo = id => {
    this.props.deleteTodo(id);
  };

  toggleCompleted = id => {
    this.props.toggleTodo(id);
  };

  render() {
    const { todo } = this.props;
    const { completed, id } = todo;
    const { isEditMode, editText } = this.state;
    return (
        <div className="row">
          <form id={`form-todo${id}`} className="col s12" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s2 m2">
                <label>
                  <input id={`todo-toggle${id}`}  type="checkbox" className="filled-in"
                    onChange={() => this.toggleCompleted(todo.id)} checked={completed} />
                  <span></span>
                </label>
              </div>
              <div className="input-field col s6 m6">
                <DisplayText
                  isEditMode={isEditMode}
                  todo={todo}
                  onTodoTextChange={this.onTodoTextChange}
                  editText={editText}
                />
              </div>
              <div className="col s4 m4">
                <Controls
                  todo={todo}
                  isEditMode={isEditMode}
                  enableEditMode={this.enableEditMode}
                  updateTodo={this.updateTodo}
                  deleteTodo={this.deleteTodo}
                  editText={editText}
                />
              </div>
            </div>
            <hr className="thin-hr"/>
          </form>
        </div>
    );
  }
}

export default Todo;
