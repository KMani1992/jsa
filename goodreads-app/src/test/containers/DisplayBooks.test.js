import React from "react";
import DisplayBooks from "../../containers/DisplayBooks";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
let event = { target: { value: "country book" }, preventDefault: () => {} };
let mockData = {
  search: { totalResult: 400 },
  books: [
    { best_book: { image_url: "#!", title: "A", author: "a" } },
    { best_book: { image_url: "#!", title: "B", author: "b" } }
  ],
  searchingSuccess: true,
  page: 1
};

describe("should check Display books list container", () => {
  it("should check edit and save todo by button click event", () => {
    const store = mockStore(mockData);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayBooks />
      </Provider>
    );
    wrapper.find("#prev-page").simulate("click", event);
    wrapper.find("#first-page").simulate("click", event);
    wrapper.find("#next-page").simulate("click", event);
    wrapper.find("#page1").simulate("click", event);
    wrapper.find("#page7").simulate("click", event);
    wrapper.find("#last-page").simulate("click", event);
  });

  it("should check less than 10 page books list", () => {
    let data = {
      ...mockData,
      search: { totalResult: 12 }
    };
    const store = mockStore(data);
    const wrapper = mount(
      <Provider store={store}>
        <DisplayBooks />
      </Provider>
    );
  });
});
