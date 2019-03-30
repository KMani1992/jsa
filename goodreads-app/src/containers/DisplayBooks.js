import React from "react";
import { connect } from "react-redux";
import ListBooks from "../components/ListBooks";
import * as searchActionCreators from "../actions/search.actions";
import { bindActionCreators } from "redux";

class DisplayBooks extends React.Component {
  render() {
    const {
      books,
      searchingSuccess,
      search,
      searchActions,
      searchKeyword,
      page
    } = this.props;
    return (
      <div className="container">
        <ListBooks
          className="search-result"
          searchingSuccess={searchingSuccess}
          books={books}
          emptyMessage="No books found!"
          search={search}
          searchBooks={searchActions.searchBooks}
          searchKeyword={searchKeyword}
          page={page}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    search: state.search,
    searchingSuccess: state.searchingSuccess,
    searchKeyword: state.searchKeyword,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBooks);
