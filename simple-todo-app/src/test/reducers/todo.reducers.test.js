import { expect } from "chai";
import todoReducer, { defaultState } from "../../../src/reducers/todo.reducers";
import { TYPES } from "../../../src/actions/todo.types";

describe("todo reducer testing", () => {
  it("should check the ADD_TODO case", () => {
    const initialState = {
      todos: [],
      count: 0
    };
    const action = {
      type: TYPES.ADD_TODO,
      text: "go shopping",
      id: 1
    };
    const expected = {
      todos: [{ id: 1, text: "go shopping", completed: false }],
      count: 1
    };
    expect(todoReducer(initialState, action)).to.eql(expected);
  });

  it("should check the EDIT_TODO case", () => {
    const initialState = {
      todos: [
        { id: 1, text: "go shopping", completed: false },
        { id: 2, text: "go temple", completed: false }
      ],
      count: 2
    };
    const action = {
      type: TYPES.EDIT_TODO,
      text: "go movie",
      id: 1
    };
    const expected = {
      ...initialState,
      todos: [
        { id: 1, text: "go movie", completed: false },
        { id: 2, text: "go temple", completed: false }
      ]
    };
    expect(todoReducer(initialState, action)).to.eql(expected);
  });

  it("should check the TOGGLE_TODO case", () => {
    const initialState = {
      todos: [
        { id: 1, text: "go shopping", completed: false },
        { id: 2, text: "go temple", completed: false }
      ],
      count: 2
    };
    const action = {
      type: TYPES.TOGGLE_TODO,
      id: 1
    };
    const expected = {
      ...initialState,
      todos: [
        { id: 1, text: "go shopping", completed: true },
        { id: 2, text: "go temple", completed: false }
      ]
    };
    expect(todoReducer(initialState, action)).to.eql(expected);
  });

  it("should check the DELETE_TODO case", () => {
    const initialState = {
      todos: [{ id: 1, text: "go shopping", completed: false }],
      count: 1
    };
    const action = {
      type: TYPES.DELETE_TODO,
      id: 1
    };
    const expected = {
      ...initialState,
      todos: []
    };
    expect(todoReducer(initialState, action)).to.eql(expected);
  });

  it("should check the default case with null state", () => {
    const action = {
      type: "DEFAULT_TYPE",
      id: 1
    };
    expect(todoReducer(undefined, action)).to.eql(defaultState);
  });
});
