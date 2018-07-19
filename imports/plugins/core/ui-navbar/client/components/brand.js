import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";

class Brand extends Component {
  static propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    Reaction.Router.go("/");
  }

  render() {
    return (
      <div id="brand">
        <a className="brand" onClick={this.handleClick}>
          <img src="/resources/images/applogo.jpg" width="130" height="55px" />
        </a>
      </div>
    );
  }
}

registerComponent("Brand", Brand);

export default Brand;
