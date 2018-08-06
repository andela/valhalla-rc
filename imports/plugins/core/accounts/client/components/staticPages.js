import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/lib/api";

class StaticPages extends Component {
  static propTypes = {
    pages: PropTypes.array
  };
  goToStaticPage(page) {
    return Reaction.Router.go(`/pages/${page.pageAddress}`);
  }
  renderStaticPagesComponent() {
    const { pages } = this.props;
    return (
      <div className="static-pages dropdown page-menu" role="menu" data-delay="1000">
        <div className="dropdown-toggle" data-toggle="dropdown">
          View Pages
          <span className="caret" />
        </div>
        <div className="dropdown-menu custom-dropdown">
          { pages.length > 0 ? pages.map(page => {
            return (
              <li key={page._id} className="text-capitalize dropdown-li-item">
                <a className="static-dropdown" onClick={() => this.goToStaticPage(page)}>
                  {page.pageName}
                </a>
              </li>
            );
          }) :
            <li className="text-capitalize dropdown-li-item">
              <a className="static-dropdown" href="#">
                No pages added yet
              </a>
            </li>  }
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="static-pages" role="menu">
        {this.renderStaticPagesComponent()}
      </div>
    );
  }
}
registerComponent("StaticPages", StaticPages);

export default StaticPages;
