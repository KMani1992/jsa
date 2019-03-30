import React from "react";
import Todo from "./Todo";
import TodoTitle from "./TodoTitle";

export default function ListTodo(params) {
  const { todos } = params;
  return (
    <React.Fragment>
      <div className="row">
        <div className="col s12">
          <TodoTitle title={params.title} />
        </div>
      </div>
      {todos.length === 0 ?
        <div className="row">
          <div className="col s12">
            <label>{params.emptyMessage}</label>
          </div>
        </div> :
        todos.map((todo, index) => <Todo key={index} {...params} todo={todo} />)
      }
    </React.Fragment>
  );
}
