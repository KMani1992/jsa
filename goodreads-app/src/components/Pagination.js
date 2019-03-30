import React from "react";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.totalItems) {
      this.initPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.searchingSuccess !== prevProps.searchingSuccess &&
      this.props.searchingSuccess
    ) {
      this.initPage(this.props.initialPage);
    }
  }

  initPage(page = 1){
    const { totalItems, pageSize} = this.props;
    let pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    pager = this.getPager(totalItems, page, pageSize);
    this.setState({ pager: pager });
  }

  setPage(page = 1) {
    const {  searchKeyword, searchBooks } = this.props;
    this.initPage(page);
    searchBooks(searchKeyword, page);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 20;
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log("totalPages======>", totalPages);
    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

  render() {
    const { pager } = this.state;
    console.log("pager=================>", pager);
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a href="#!" id="first-page" onClick={() => this.setPage(1)}>
            <i className="material-icons">first_page</i>
          </a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a href="#!" id="prev-page" onClick={() => this.setPage(pager.currentPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? "active" : ""}
          >
            <a href="#!" id={`page${page}`} onClick={() => this.setPage(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a href="#!" id="next-page" onClick={() => this.setPage(pager.currentPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a href="#!" id="last-page" onClick={() => this.setPage(pager.totalPages)}>
            <i className="material-icons">last_page</i>
          </a>
        </li>
      </ul>
    );
  }
}
