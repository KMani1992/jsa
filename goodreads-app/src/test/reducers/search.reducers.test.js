import { expect } from "chai";
import searchReducer, {
  defaultState
} from "../../../src/reducers/search.reducers";
import { TYPES } from "../../../src/actions/search.types";

describe("search reducer testing", () => {
  it("should check the AUTO_POPULATE_SUCCESS case", () => {
    const initialState = { ...defaultState };
    const action = {
      type: TYPES.AUTO_POPULATE_SUCCESS,
      payload: {
        books: [{ title: "india", imageUrl: "/india.png" }],
        keyword: "country"
      }
    };
    const expected = {
      ...initialState,
      autoPopulateSuccess: true,
      autoPopulateFailed: false,
      autoPopulate: { india: "/india.png" },
      searchKeyword: "country"
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the AUTO_POPULATE_FAILED case", () => {
    const initialState = {
      searchs: [
        { id: 1, text: "go shopping", completed: false },
        { id: 2, text: "go temple", completed: false }
      ],
      count: 2
    };
    const action = {
      type: TYPES.AUTO_POPULATE_FAILED
    };
    const expected = {
      ...initialState,
      autoPopulateSuccess: false,
      autoPopulateFailed: true,
      autoPopulate: {},
      searchKeyword: ""
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the SEARCH_SUCCESS case", () => {
    const initialState = {
      ...defaultState
    };
    const action = {
      type: TYPES.SEARCH_SUCCESS,
      payload: { books: [], searchKeyword: "", search: [] }
    };
    const expected = {
      ...initialState,
      searchingSuccess: true,
      searchingFailed: false,
      books: action.payload.books,
      searchKeyword: action.payload.searchKeyword,
      page: action.payload.page,
      search: action.payload.search
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the SEARCH_FAILED case", () => {
    const initialState = {
      ...defaultState
    };
    const action = {
      type: TYPES.SEARCH_FAILED
    };
    const expected = {
      ...initialState,
      searchingSuccess: false,
      searchingFailed: true,
      books: []
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the SEARCHING case", () => {
    const initialState = {
      ...defaultState,
    };
    const action = {
      type: TYPES.SEARCHING,
      payload:true
    };
    const expected = {
      ...initialState,
      searching: true
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the AUTO_POPULATING case", () => {
    const initialState = {
      ...defaultState
    };
    const action = {
      type: TYPES.AUTO_POPULATING,
      payload: true
    };
    const expected = {
      ...initialState,
      autoPopulateLoading: true
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the clear case", () => {
    const initialState = {
      ...defaultState
    };
    const action = {
      type: TYPES.CLEAR_STATE
    };
    const expected = {
      ...initialState,
      searchingSuccess: false,
      searchingFailed: false,
      autoPopulateSuccess: false,
      autoPopulateFailed: false
    };
    expect(searchReducer(initialState, action)).to.eql(expected);
  });

  it("should check the default case with null state", () => {
    const action = {
      type: "DEFAULT_TYPE"
    };
    expect(searchReducer(undefined, action)).to.eql(defaultState);
  });
});
