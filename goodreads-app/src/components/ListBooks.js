import React from "react";
import Book from "./Book";
import Pagination from "./Pagination";

export default function ListBooks(params) {
  const {
    books,
    searchingSuccess,
    search,
    searchBooks,
    searchKeyword,
    page
  } = params;
  console.log(
    "books.length",
    books.length,
    "searchingSuccess",
    searchingSuccess
  );
  return (
    <React.Fragment>
      {books.length === 0 ? (
        <div className="row">
          <div className="col s12">
            {searchingSuccess && <h6>{params.emptyMessage}</h6>}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <label>{search.totalResult} search results found.</label>
          {books.map((book, index) => <Book key={index} book={book} />)}
          <Pagination
            totalItems={search.totalResult}
            searchBooks={searchBooks}
            searchKeyword={searchKeyword}
            initialPage={page}
            searchingSuccess={searchingSuccess}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
