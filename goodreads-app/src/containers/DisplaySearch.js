import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreators from "../actions/search.actions";
import SearchBook from "../components/SearchBook";
import { isEmpty } from "../util/util";
import classNames from "classnames";
import M from "materialize-css";
import { debounce } from "throttle-debounce";

class DisplaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: props.searchKeyword,
      searchHelp: null
    };
  }

  setSearhText = e => {
    console.log("set search", e.target.value);
    this.setState({ searchKeyword: e.target.value });
    debounce(
      1000,
      (() => {
        this.autoPopulate();
      })()
    );
  };

  isValidSearchKeyword = keyword => !isEmpty(keyword);

  autoPopulate = () => {
    const { searchKeyword } = this.state;
    if (this.isValidSearchKeyword(searchKeyword)) {
      console.log("inside debouncing before search");
      this.props.searchAction.autoPopulate(searchKeyword);
    }
  };

  doSearch = (page = 1) => {
    const { searchKeyword } = this.state;
    console.log("set search searchKeyword", searchKeyword);
    if (this.isValidSearchKeyword(searchKeyword)) {
      this.props.searchAction.searchBooks(searchKeyword, page);
    }
  };

  doSearchByKeyPress = e => {
    const { searchHelp } = this.state;
    if (e.which === 13) {
      this.doSearch(1);
    } else if (searchHelp) {
      searchHelp.open();
    }
    console.log("e.which", e.which);
  };

  onAutocomplete = keyword => {
    this.setState({ searchKeyword: keyword });
    this.doSearch();
  };

  componentDidMount() {
    const { searchKeyword, page } = this.props;

    console.log("inside did mount", searchKeyword);
    if (searchKeyword) {
      this.setState({ searchKeyword: searchKeyword });
      this.props.searchAction.searchBooks(searchKeyword, page);
    }

    document.addEventListener("DOMContentLoaded", () => {
      console.log("inside dom content load");
      const elems = document.querySelectorAll(".autocomplete");
      const options = {
        data: {},
        limit: 10,
        onAutocomplete: this.onAutocomplete
      };
      const searchHelp = M.Autocomplete.init(elems, options);
      console.log("searchHelp=========>", searchHelp);
      this.setState({ searchHelp: searchHelp[0] });
    });
  }

  componentDidUpdate(prevProps) {
    const { autoPopulateSuccess } = this.props;

    if (
      prevProps.autoPopulateSuccess !== autoPopulateSuccess &&
      autoPopulateSuccess
    ) {
      const { searchHelp } = this.state;
      if (searchHelp) {
        searchHelp.updateData(this.props.autoPopulate);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={classNames({
            "hide-loader": !this.props.searching,
            loader: this.props.searching
          })}
        >
          <img
            alt="Loading..."
            src="images/spinner.gif"
            className="page-spinner"
          />
        </div>
        <SearchBook
          autoPopulate={this.autoPopulate}
          searchKeyword={this.state.searchKeyword}
          doSearch={this.doSearch}
          setSearhText={this.setSearhText}
          autoPopulateLoading={this.props.autoPopulateLoading}
          doSearchByKeyPress={this.doSearchByKeyPress}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchKeyword: state.searchKeyword,
    page: state.page,
    autoPopulate: state.autoPopulate,
    autoPopulateLoading: state.autoPopulateLoading,
    autoPopulateSuccess: state.autoPopulateSuccess,
    autoPopulateFailed: state.autoPopulateFailed,
    searching: state.searching
  };
};

const mapDispatchToProps = dispatch => ({
  searchAction: bindActionCreators(searchActionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DisplaySearch);
