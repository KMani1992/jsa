import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import todoReducer from "./reducers/todo.reducers";
import { throttle } from "throttle-debounce";
import { LS_KEY_TODOS, LS_KEY_TODO_ID } from "./util/constants";
import { defaultState } from "./reducers/todo.reducers";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LS_KEY_TODOS);
    if (serializedState === null) {
      return defaultState.todos;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState.todos;
  }
};

export const saveState = ({ todos, count }) => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem(LS_KEY_TODOS, serializedState);
    const existCount = localStorage.getItem(LS_KEY_TODO_ID);
    if (parseInt(existCount) !== count) {
      localStorage.setItem(LS_KEY_TODO_ID, count);
    }
  } catch (err) {
    // ignore write errors
  }
};

const persistedState = loadState();
const store = createStore(
  todoReducer,
  { todos: persistedState },
  applyMiddleware(thunk)
);

store.subscribe(() => {
  throttle(300, saveState(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
