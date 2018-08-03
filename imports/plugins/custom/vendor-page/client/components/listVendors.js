import React, { Component } from "react";
import {  registerComponent, composeWithTracker  } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";
import { Shops } from "/lib/collections";
import { Reaction } from "/client/api";

class ListVendors extends Component {
  render() {
    return (
      <div className="container store-area"><br/><br />
        <div  className="row store-cards text-center">
          {this.props.allShops.map(shops => (
            <div key={shops._id} className="col-md-4 card-container">
              <div className="flip">
                <div className="front">
                  <br/>
                  <span className="card-img-top fa card-title smiley">&#xf118;</span>
                  <h4 className="card-title">{shops.name}</h4>
                  <button
                    className="btn text-white brown-btn"
                  >
                    Visit Shop
                  </button>
                </div>
                <div className="back">
                  <br/>
                  <span className="card-img-top fa card-title smiley">&#xf118;</span>
                  <h4 className="card-title">{shops.name}</h4>
                  <button
                    onClick={() => Reaction.Router.go(`/vendors/${shops.name}`)}
                    className="btn text-white brown-btn"
                  >
                    Visit Shop
                  </button>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    );
  }
}
ListVendors.propTypes = {
  allShops: PropTypes.array
};

const composer = (props, onData) => {
  const allShops = [];

  const shops = Shops.find().fetch();
  shops.map(shop => {
    allShops.push(shop);
  });
  onData(null, { allShops });
};

registerComponent(
  "Shops",
  ListVendors,
  composeWithTracker(composer)
);

export default composeWithTracker(composer)(ListVendors);

