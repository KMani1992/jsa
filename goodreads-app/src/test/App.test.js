import React from 'react';
import App from '../components/App';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk"
import {defaultState} from "../reducers/search.reducers";

const mockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const store=mockStore(defaultState);
  mount(<Provider store={store}> <App /></Provider>)  
});
