import { TYPES } from "../actions/search.types";

export const defaultState = {
  books: [],
  searchKeyword: "",
  page: 1,
  searching: false,
  searchingSuccess: false,
  searchingFailed: false,
  autoPopulate: [{ apple: null, banana: null, rami: null }],
  autoPopulateLoading: false,
  autoPopulateSuccess: false,
  autoPopulateFailed: false
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  let nextState = { ...state };
  switch (type) {
    case TYPES.AUTO_POPULATE_SUCCESS: {
      const { books = [], keyword = "" } = payload;
      return {
        ...nextState,
        autoPopulateSuccess: true,
        autoPopulateFailed: false,
        autoPopulate:
          books && Array.isArray(books)
            ? books.reduce(
                (obj, item) => ({ ...obj, [item.title]: item.imageUrl }),
                {}
              )
            : {},
        searchKeyword: keyword
      };
    }
    case TYPES.AUTO_POPULATE_FAILED: {
      return {
        ...nextState,
        autoPopulateSuccess: false,
        autoPopulateFailed: true,
        autoPopulate: {},
        searchKeyword: ""
      };
    }
    case TYPES.SEARCH_SUCCESS: {
      return {
        ...nextState,
        searchingSuccess: true,
        searchingFailed: false,
        books: payload.books || [],
        searchKeyword: payload.searchKeyword,
        page: payload.page,
        search: payload.search || {}
      };
    }
    case TYPES.SEARCH_FAILED: {
      return {
        ...nextState,
        searchingSuccess: false,
        searchingFailed: true,
        books: []
      };
    }
    case TYPES.SEARCHING: {
      return {
        ...nextState,
        searching: payload
      };
    }
    case TYPES.AUTO_POPULATING: {
      return {
        ...nextState,
        autoPopulateLoading: payload
      };
    }
    case TYPES.CLEAR_STATE: {
      return {
        ...nextState,
        searchingSuccess: false,
        searchingFailed: false,
        autoPopulateSuccess: false,
        autoPopulateFailed: false
      };
    }
    default:
      return state;
  }
};
