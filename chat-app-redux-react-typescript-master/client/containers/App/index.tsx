// tslint:disable:typedef
import * as React from "react";

import "jquery";
require("bootstrap");
require("bootstrap/dist/css/bootstrap.css");
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import "font-awesome/css/font-awesome.min.css";
import "../../chatapp.css";

export default class App extends React.Component<any,any> {
  public render() {
    return (
      <div className="App">
        <section className="App-body">
            {this.props.children}
        </section>
      </div>
    );
  }
}
