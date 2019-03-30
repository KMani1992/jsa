import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import searchReducer from "./reducers/search.reducers";
import { throttle } from "throttle-debounce";
import { SS_KEY_SEARCH_KEY } from "./util/constants";
import { defaultState } from "./reducers/search.reducers";

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(SS_KEY_SEARCH_KEY);
    if (serializedState === null) {
      return {searchKeyword:defaultState.searchKeyword};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {searchKeyword:defaultState.searchKeyword};
  }
};

export const saveState = (store) => {
  try {
    console.log("inside subsrcibe searchKeyword=========>",store)    
    const serializedState = JSON.stringify(store);    
    sessionStorage.setItem(SS_KEY_SEARCH_KEY, serializedState);
  } catch (err) {
    // ignore write errors
  }
};

const persistedState = loadState();
console.log("persistedState======>",persistedState)
const store = createStore(
  searchReducer,
  { ...defaultState, ...persistedState },
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log("inside subsrcibe oiindex=========>")
  const state = store.getState();
  let persistState = {searchKeyword:state.searchKeyword, page: state.page}
  throttle(300, saveState(persistState));
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
