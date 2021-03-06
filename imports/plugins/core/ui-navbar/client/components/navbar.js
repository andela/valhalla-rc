import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import startTour from "/imports/plugins/custom/vendor-tour/client/vendorTour";
import customerTour from "/imports/plugins/custom/customer-tour/client/customerTour";
// TODO: Delete this, and do it the react way - Mike M.
async function openSearchModalLegacy(props) {
  if (Meteor.isClient) {
    const { Blaze } = await import("meteor/blaze");
    const { Template } = await import("meteor/templating");
    const { $ } = await import("meteor/jquery");

    const searchTemplate = Template[props.searchTemplate];

    Blaze.renderWithData(searchTemplate, {}, $("html").get(0));

    $("body").css("overflow", "hidden");
    $("#search-input").focus();
  }
}

class NavBar extends Component {
  static propTypes = {
    brandMedia: PropTypes.object,
    hasProperPermission: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    shop: PropTypes.object
  }

  state = {
    navBarVisible: false
  }

  toggleNavbarVisibility = () => {
    const isVisible = this.state.navBarVisible;
    this.setState({ navBarVisible: !isVisible });
  }

  handleCloseNavbar = () => {
    this.setState({ navBarVisible: false });
  }

  handleStartTour = () => {
    Reaction.Router.go("/");
    startTour();
  }
  handleStartCustomerTour = () => {
    Reaction.Router.go("/");
    customerTour();
  }
  handleOpenSearchModal = () => {
    openSearchModalLegacy(this.props);
  }

  renderLanguage() {
    return (
      <div className="languages hidden-xs">
        <Components.LanguageDropdown />
      </div>
    );
  }

  renderCurrency() {
    return (
      <div className="currencies hidden-xs">
        <Components.CurrencyDropdown />
      </div>
    );
  }

  renderBrand() {
    const shop = this.props.shop || { name: "" };
    const logo = this.props.brandMedia && this.props.brandMedia.url();

    return (
      <Components.Brand
        logo={logo}
        title={shop.name}
      />
    );
  }

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div className="search">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
        </div>
      );
    }
  }

  renderNotificationIcon() {
    if (this.props.hasProperPermission) {
      return (
        <span className="notification">
          <Components.Notification />
        </span>
      );
    }
  }

  renderCartContainerAndPanel() {
    return (
      <div className="cart-container">
        <div className="cart">
          <Components.CartIcon />
        </div>
        <div className="cart-alert">
          <Components.CartPanel />
        </div>
      </div>
    );
  }

  renderMainDropdown() {
    return (
      <Components.MainDropdown />
    );
  }

  handleDropdown() {
    const categories = document.getElementById("categories");
    categories.classList.remove("hide");
  }

  renderHamburgerButton() {
    return (
      <div className="showmenu"><Components.Button icon="bars" onClick={this.toggleNavbarVisibility} /></div>
    );
  }

  renderVendor() {
    return (
      <div className="vendors">
        <a href="/vendors">Vendors</a>
      </div>
    );
  }

  renderTagNav() {
    return (
      <div onMouseEnter={this.handleDropdown} className="view-product-categories">
        {/* <Components.TagNav
          isVisible={this.state.navBarVisible}
          closeNavbar={this.handleCloseNavbar}
        >
          <Components.Brand />
        </Components.TagNav> */}
        {/* <RenderCategory /> */}
        <span className="dropdown-toggle category-drop" data-toggle="collapse" data-target="#categories">
          Product Categories&nbsp;<i className="fa fa-caret-down" />
        </span>
      </div>
    );
  }
  renderVendorTour() {
    return (
      <div id="take-tour">
        <span onClick={this.handleStartTour} className="pointer">Take A Tour</span>
      </div>
    );
  }

  renderCustomerTour() {
    return (
      <div id="take-customer-tour">
        <span onClick={this.handleStartCustomerTour} className="pointer">Take A Tour</span>
      </div>
    );
  }

  renderTourButtons() {
    return (
      <div className="d-flex">
        {Reaction.hasPermission("owner", Meteor.userId(), Reaction.getShopId()) && Meteor.user().username !== "admin" && this.renderVendorTour()}
        {!(Reaction.hasPermission("owner", Meteor.userId(), Reaction.getShopId())) && Meteor.user().username !== "admin" && this.renderCustomerTour()}
      </div>
    );
  }

  renderStaticPages() {
    return (
      <div className="menu d-flex static-page-navitem">
        <div className="view-static-pages">
          <Components.StaticPages />
        </div>
        { Meteor.user().name !== "Admin" ? null
          : <a className="manage-pages" onClick={() => this.goToManagePages()}>Manage Pages</a> }
      </div>
    );
  }

  goToManagePages() {
    return Reaction.Router.go("/dashboard/static");
  }

  render() {
    return (
      <div className="rui navbar">
        {this.renderHamburgerButton()}
        {this.renderTagNav()}
        {this.renderTourButtons()}
        {this.renderStaticPages()}
        {this.renderBrand()}
        {this.renderSearchButton()}
        {this.renderVendor()}
        {this.renderNotificationIcon()}
        {this.renderLanguage()}
        {this.renderCurrency()}
        {this.renderMainDropdown()}
        {this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

export default NavBar;
