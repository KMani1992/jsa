import { TYPES } from "../actions/todo.types";
export const defaultState = { todos: [], count: 0 };
export default (state = defaultState, action) => {
  const { type, text, id } = action;
  let nextState = { ...state };
  switch (type) {
    case TYPES.ADD_TODO: {
      return {
        ...nextState, todos: [
          ...nextState.todos,
          {
            id: id,
            text: text,
            completed: false
          }
        ], count: id
      };
    }
    case TYPES.TOGGLE_TODO: {
      return {
        ...nextState, todos: nextState.todos.map(todo =>
          (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        )
      };
    }
    case TYPES.EDIT_TODO: {
      return { ...nextState, todos: nextState.todos.map(todo => todo.id === id ? { ...todo, text } : todo) };
    }
    case TYPES.DELETE_TODO: {
      return { ...nextState, todos: nextState.todos.filter(todo => todo.id !== id) };
    }
    default:
      return state;
  }
};
