import React from "react";
import DisplayAddTodo from "../containers/DisplayAddTodo";
import DisplayTodoList from "../containers/DisplayTodoList";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (<React.Fragment>
      <DisplayAddTodo />
      <DisplayTodoList />
    </React.Fragment>);
  }
}
