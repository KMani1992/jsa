import { TYPES } from "./search.types";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { TMP_AUTO_POPULATE_URL, TMP_SEARCH_URL } from "../util/constants";

const cache = setupCache({ maxAge: 15 * 60 * 1000 });

export const api = axios.create({ adapter: cache.adapter });

const dispatchData = (dispatch, type, payload) => {
  dispatch({ type: type, payload: payload });
};

export const autoPopulate = searchKeyword => {
  return async dispatch => {
    try {      
      dispatchData(dispatch, TYPES.AUTO_POPULATING, true);
      dispatchData(dispatch, TYPES.CLEAR_STATE, "");
      const url = `${TMP_AUTO_POPULATE_URL}&q=${searchKeyword}`;
      const response = await api({ url: url, method: "get" });
      dispatchData(dispatch, TYPES.AUTO_POPULATING, false);
      const resonseData = response.data;
      console.log("response", resonseData);
      dispatchData(dispatch, TYPES.AUTO_POPULATE_SUCCESS, {
        books: resonseData,
        keyword: searchKeyword
      });
    } catch (error) {
      dispatchData(dispatch, TYPES.AUTO_POPULATING, false);
      dispatchData(dispatch, TYPES.AUTO_POPULATE_FAILED, {});
      console.error("service error-autoPopulate", error);
    }
  };
};

export const searchBooks = (searchKeyword, page = 1) => {
  return async dispatch => {
    try {
      dispatchData(dispatch, TYPES.SEARCHING, true);
      dispatchData(dispatch, TYPES.CLEAR_STATE, "");
      const url = `${TMP_SEARCH_URL}&q=${searchKeyword}&page=${page}`;
      const response = await api({ url: url, method: "get" });
      dispatchData(dispatch, TYPES.SEARCHING, false);
      const resonseData = parseXMLResponse(response.data);
      console.log("json res========>", resonseData);
      dispatchData(dispatch, TYPES.SEARCH_SUCCESS, {
        books: resonseData.data,
        searchKeyword,
        search: resonseData.search,
        page: page
      });
    } catch (error) {
      dispatchData(dispatch, TYPES.SEARCHING, false);
      dispatchData(dispatch, TYPES.SEARCH_FAILED, []);
      console.error("service error-searchBooks", error);
    }
  };
};

const parseXMLResponse = response => {
  const parser = new DOMParser();
  const XMLResponse = parser.parseFromString(response, "application/xml");
  const parseError = XMLResponse.getElementsByTagName("parsererror");
  if (parseError.length) {
    return {
      error: "There was an error fetching results.",
      fetchingData: false
    };
  } else {
    console.log(XMLResponse.getElementsByTagName("total-results"));
    const totalResult = getElementValue(XMLResponse, "total-results");
    const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
    const searchResults = XMLresults.map(result => convertToJson(result));
    return { data: searchResults, search: { totalResult } };
  }
};

const getElementValue = (XMLResponse, tagName) => {
  let result = new Array(...XMLResponse.getElementsByTagName(tagName));
  if (result) {
    result = result[0].textContent;
  }
  return result;
};

const convertToJson = XML => {
  const allNodes = new Array(...XML.children);
  const jsonResult = {};
  allNodes.forEach(node => {
    if (node.children.length) {
      jsonResult[node.nodeName] = convertToJson(node);
    } else {
      jsonResult[node.nodeName] = node.innerHTML;
    }
  });
  return jsonResult;
};

export const showPageSpinner = show => ({
  type: TYPES.SEARCHING,
  showPageSpinner: show
});

export const showAutoPopulating = show => ({
  type: TYPES.AUTO_POPULATING,
  showAutoPopulating: show
});

