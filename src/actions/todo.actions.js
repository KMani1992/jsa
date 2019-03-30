import { TYPES } from "./todo.types";
import {
  LS_KEY_TODO_ID,
  RANDOM_NUMBER_GENERATE_MIN,
  RANDOM_NUMBER_GENERATE_MAX
} from "../util/constants";


let nextId = localStorage.getItem(LS_KEY_TODO_ID);
nextId = parseInt(nextId) || 0;

export const addTodo = text => {
  nextId += RANDOM_NUMBER_GENERATE_MIN +
    Math.random() *
    (RANDOM_NUMBER_GENERATE_MAX - RANDOM_NUMBER_GENERATE_MIN);
  return {
    type: TYPES.ADD_TODO,
    text: text,
    id: nextId
  }
};

export const editTodo = (id, text) => ({
  type: TYPES.EDIT_TODO,
  text: text,
  id: id
});

export const deleteTodo = id => ({
  type: TYPES.DELETE_TODO,
  id: id
});

export const toggleTodo = id => ({
  type: TYPES.TOGGLE_TODO,
  id: id
});
