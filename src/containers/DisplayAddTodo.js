import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as toDoActionCreators from "../actions/todo.actions";
import AddTodo from "../components/AddTodo";
import { isEmpty } from "../util/util";

class DisplayAddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  setTodoText = e => {
    this.setState({ text: e.target.value });
  };

  addTodo = (e) => {
    const {text} = this.state;
    console.log("isEmpty(todoText)",text,  text.trim().length === 0);
    console.log(isEmpty(text));
    if (!isEmpty(text)) {
      this.props.todoAction.addTodo(text);
      this.setState({ text: "" });
    }

  };

  render() {
    return (<AddTodo addTodo={this.addTodo} text={this.state.text} setTodoText={this.setTodoText} title="ADD ITEM" />);
  }
}

const mapDispatchToProps = dispatch => ({
  todoAction: bindActionCreators(toDoActionCreators, dispatch)
});
export default connect(null, mapDispatchToProps)(DisplayAddTodo);
