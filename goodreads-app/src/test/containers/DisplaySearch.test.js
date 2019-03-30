import React from "react";
import DisplaySearch from "../../containers/DisplaySearch";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defaultState } from "../../reducers/search.reducers";

const mockStore = configureMockStore([thunk]);
let event = { target: { value: "country" }, preventDefault: () => {} , which:13};

describe("should check display search container", () => {
  it("should check search text box user events", () => {
    const store = mockStore(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <DisplaySearch />
      </Provider>
    );
    wrapper.find("#autocomplete-input").simulate("change", event);
    wrapper.find("#autocomplete-input").simulate("keypress", event);
    wrapper.find("#search-button").simulate("click", event);
    event.which=95;
    wrapper.find("#autocomplete-input").simulate("keypress", event);
  });

  it("should check search text by button click event", () => {
    let initState = {...defaultState,autoPopulateLoading:true}
    const store = mockStore(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <DisplaySearch />
      </Provider>
    );
  });
});
