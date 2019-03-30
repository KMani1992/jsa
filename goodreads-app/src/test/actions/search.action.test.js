import { expect } from "chai";
import { TYPES } from "../../../src/actions/search.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defaultState } from "../../reducers/search.reducers";
import * as searchActionCreators from "../../actions/search.actions";
import sinon from "sinon";
import axios from "axios";

const mockStore = configureMockStore([thunk]);
const store = mockStore(defaultState);

describe("search action testing", () => {
  let http;
  beforeEach(() => {
    http = sinon.stub(axios, "get");
  });
  afterEach(() => {
    http.restore();
    store.clearActions();
  });

  it("should check the autopopulate success case", async () => {
    http.returns({ data: [{ title: "", imageUrl: "" }] });
    await store.dispatch(searchActionCreators.autoPopulate("country"));
    const result = store.getActions()[3];
    expect(result.type).to.eql(TYPES.AUTO_POPULATE_SUCCESS);
  });

  xit("should check the autopopulate error case", async () => {
    http.throws();
    await store.dispatch(searchActionCreators.autoPopulate("****"));
    const result = store.getActions()[3];
    expect(result.type).to.eql(TYPES.AUTO_POPULATE_FAILED);
  });

  it("should check the SEARCH_SUCCESS case", async () => {
    http.returns({
      data: `<GoodreadsResponse><Request><authentication>true</authentication><key>BFik6hhqVvmtCp0MAhb41A</key><method>search_index</method></Request><search><query>rel</query><results-start>1</results-start><results-end>20</results-end><total-results>464</total-results><source>Goodreads</source><query-time-seconds>0.19</query-time-seconds><results><work><id type="integer">40208490</id><books_count type="integer">1</books_count><ratings_count type="integer">1</ratings_count><text_reviews_count type="integer">0</text_reviews_count><original_publication_year type="integer">2013</original_publication_year><original_publication_month type="integer">7</original_publication_month><original_publication_day type="integer">17</original_publication_day><average_rating>3.00</average_rating><best_book type="Book"><id type="integer">20870150</id><title>The Adventures of Rel-Rel: Lost Mirror</title><author><id type="integer">7866962</id><name>J.J. Evangelista</name></author><image_url>https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png</image_url><small_image_url>https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png</small_image_url></best_book></work></results></search></GoodreadsResponse>`
    });
    await store.dispatch(searchActionCreators.searchBooks("india"));
    const result = store.getActions()[3];
    expect(result.type).to.eql(TYPES.SEARCH_SUCCESS);
  });

  xit("should check the SEARCH_FAILED case", async () => {
    http.throws();
    await store.dispatch(searchActionCreators.searchBooks("india"));
    const result = store.getActions()[3];
    expect(result.type).to.eql(TYPES.SEARCH_FAILED);
  });

  it("should check the show page spinner called", async () => {
    await store.dispatch(searchActionCreators.showPageSpinner(true));
    const result = store.getActions()[0];
    expect(result.type).to.eql(TYPES.SEARCHING);
  });

  it("should check the show autopopulate spinner called", async () => {
    await store.dispatch(searchActionCreators.showAutoPopulating(true));
    const result = store.getActions()[0];
    expect(result.type).to.eql(TYPES.AUTO_POPULATING);
  });
});
