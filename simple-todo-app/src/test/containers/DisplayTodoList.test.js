import React from "react";
import DisplayTodoList from "../../containers/DisplayTodoList";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
let event = { target: { value: "go shopping" }, preventDefault: () => {} };
let mockData = {
  count: 2,
  todos: [
    { id: 1, text: "go shopping", completed: true },
    { id: 2, text: "go movie", completed: false }
  ]
};
describe("should check Display todo list container", () => {
  it("should check edit and save todo by button click event", () => {
    const store = mockStore(mockData);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayTodoList />
      </Provider>
    );
    wrapper.find("#todo-edit1").simulate("click", event);
    wrapper.find("#id_todo-text1").simulate("change", event);
    wrapper.find("#todo-save1").simulate("click", event);
  });
  it("should check todo toggle click event", () => {
    const store = mockStore(mockData);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayTodoList />
      </Provider>
    );
    wrapper.find("#todo-toggle1").simulate("change", event);
    wrapper.find("#todo-toggle1").simulate("change", event);    
  });
  it("should check edit and save todo by form submit event", () => {
    const store = mockStore(mockData);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayTodoList />
      </Provider>
    );
    wrapper.find("#form-todo1").simulate("submit", event);
  });
  it("should check delete todo by button click event", () => {
    const store = mockStore(mockData);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayTodoList />
      </Provider>
    );
    wrapper.find("#todo-delete1").simulate("click", event);
  });
});
