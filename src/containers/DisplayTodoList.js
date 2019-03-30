import React from "react";
import { connect } from "react-redux";
import ListTodo from "../components/ListTodo";
import * as todoActionCreators from "../actions/todo.actions";
import { bindActionCreators } from "redux";

class DisplayTodoList extends React.Component {
  render() {
    const { pendingTodos, completedTodos } = this.props;
    const compProps = {
      editTodo: this.props.todoActions.editTodo,
      deleteTodo: this.props.todoActions.deleteTodo,
      toggleTodo: this.props.todoActions.toggleTodo
    };
    return (
      <React.Fragment>
        <ListTodo title="TODO" todos={pendingTodos} {...compProps} 
        emptyMessage="No Todo" />
        <ListTodo title="COMPLETED" todos={completedTodos} {...compProps} 
        emptyMessage="No Completed" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingTodos: state.todos.filter(todo => !todo.completed),
    completedTodos: state.todos.filter(todo => todo.completed)
  }
};

const mapDispatchToProps = dispatch => ({
  todoActions: bindActionCreators(todoActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodoList);
