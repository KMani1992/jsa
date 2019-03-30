import React from "react";
import TodoTitle from "./TodoTitle";
import { isEmpty } from "../util/util";

export default function AddTodo(params) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col s12">
          <TodoTitle title={params.title} />
        </div>
      </div>
      <div className="row">
        <form id="form-add-todo" className="col s12" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s9 m9">
              <input
                id="id_todo-text"
                name="name_todo-text"
                type="text"
                title="Enter Todo"
                className="validate"
                onChange={params.setTodoText}
                value={params.text}
                placeholder="Enter todo"
              />
            </div>
            <div className="col s3 m3">
              <button id="add-todo" disabled={isEmpty(params.text)} onClick={params.addTodo} 
              className="btn-large waves-effect waves-light"
                name="add-todo">Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
