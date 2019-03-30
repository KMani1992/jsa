import React from "react";

export default function(params) {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <a href="#!" className="brand-logo left">
            <img
              className="good-read-logo"
              src="images/logo.png"
              alt="logo"
              height="55"
            />
          </a>
          <ul className="right search-box-allign">
            <li>
              <div className="input-field col s12">
                <input
                  autoFocus={true}
                  type="text"
                  id="autocomplete-input"
                  className="autocomplete search-box"
                  onChange={e => params.setSearhText(e)}
                  onKeyPress={e => params.doSearchByKeyPress(e)}
                  value={params.searchKeyword}
                />
                <label htmlFor="autocomplete-input">Search book name</label>
              </div>
            </li>
            <li>
              <button
                id="search-button"
                onClick={() => params.doSearch(1)}
                disabled={params.autoPopulateLoading}
                className="waves-effect waves-light btn"
              >
                {params.autoPopulateLoading ? "Loading" : "Search"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
