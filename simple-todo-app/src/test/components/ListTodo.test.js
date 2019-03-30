import React from 'react';
import Todo from '../../components/Todo';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk"
import { defaultState } from "../../reducers/todo.reducers";

const mockStore = configureMockStore([thunk]);
let event = { target: { value: "", name: "" } }
it('renders without crashing', () => {
  const store = mockStore(defaultState);
  const wrapper = shallow(<Provider store={store}> <Todo /></Provider>)
  //wrapper.find("id").simulate("click", event);
});
