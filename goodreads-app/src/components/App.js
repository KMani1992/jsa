import React from "react";
import DisplaySearch from "../containers/DisplaySearch";
import DisplayBooks from "../containers/DisplayBooks";
import 'materialize-css/dist/css/materialize.min.css';
import "./App.css";

export default class App extends React.Component {
  render() {
    return (<React.Fragment>      
      <DisplaySearch />
      <DisplayBooks />
    </React.Fragment>);
  }
}
