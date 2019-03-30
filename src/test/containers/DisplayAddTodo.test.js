import React from "react";
import DisplayAddTodo from "../../containers/DisplayAddTodo";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defaultState } from "../../reducers/todo.reducers";

const mockStore = configureMockStore([thunk]);
let event = { target: { value: "go shopping" }, preventDefault: () => {} };

describe("should check Add todo container", () => {
  it("should add to do by button click event", () => {
    const store = mockStore(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayAddTodo />
      </Provider>
    );
    wrapper.find("#id_todo-text").simulate("change", event);
    wrapper.find("#add-todo").simulate("click", event);
  });
  it("should add to do by form submit event", () => {
    const store = mockStore(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayAddTodo />
      </Provider>
    );
    wrapper.find("#form-add-todo").simulate("submit", event);
  });
});
