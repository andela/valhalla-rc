import React, { Component } from "react";
import Truncate from "react-truncate";
import {
  Components,
  registerComponent,
  composeWithTracker
} from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import moment from "moment";
import { Reaction } from "/client/api";
import { Products, Shops } from "/lib/collections";

class VendorDetails extends Component {
  constructor(props) {
    super(props);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl = (image) => {
    if (image !== undefined) {
      return image.url({ store: "medium" });
    }
    return "/resources/placeholder.gif";
  };

  isSoldOut = (productStatus) => {
    if (!productStatus) {
      return null;
    }
    return <span className="sold_out">Sold out</span>;
  };

  renderProducts(products, shop) {
    if (products.length === 0) {
      return (
        <h1 className="text-center py-lg">There are presently no products by {shop.name}</h1>
      );
    }
    return (
      <div className="row row-eq-heightt product-group">
        {
          products.map(product => (
            <div key={product._id} className="col-md-3 col-lg-4">
              <div className="cont">
                <a href={`/product/${product.handle}`} key={product._id}>
                  <div className="col-lg-4 el-wrapper product-column">
                    {this.isSoldOut(product.isSoldOut)}
                    <div className="box-up">
                      <img className="img" src={this.getImageUrl(product.image)} alt="" />
                      <div className="img-info">
                        <div className="info-inner">
                          <span className="p-company lead hide">
                            <Truncate lines={4}>
                              {product.description}
                            </Truncate>
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-center">{product.title}</h4>
                    <div className="box-down">
                      <div className="h-bg">
                        <div className="h-bg-inner" />
                      </div>
                      <span className="cart">
                        <span className="price">${product.price.min}</span>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { products, shop } = this.props;

    return (
      <div>
        <div className="container">
          <div className=" mt-2 text-white">
            <div className="shop-image-container text-center">
              <div className="shop-name-container">
                <h1 className="shop-name-centered">{shop.name.toUpperCase()}</h1>
              </div>

              <div className="square">
                <h1>{shop.name[0].toUpperCase()}</h1>
              </div>
              <div className="text-center mt-2" id="info-nav">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <p>Number of products</p>
                  <h4><strong>{products.length}</strong></h4>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <p>Shop Name</p>
                  <h4><strong>{shop.name.toUpperCase()}</strong></h4>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <p>Time On AfriStore</p>
                  <h4><strong>{moment(shop.createdAt).toNow(true).toUpperCase()}</strong></h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="row">
              {this.renderProducts(products, shop)}
            </div>

          </div>
        </div>
        <Components.Footer />
      </div>
    );
  }
}

VendorDetails.propTypes = {
  products: PropTypes.array.isRequired,
  shop: PropTypes.object.isRequired
};

const composer = (props, onData) => {
  const vendorName = Reaction.Router.getParam("vendorName");
  const shop = Shops.findOne({ name: vendorName });
  const { _id: shopId } = shop;
  if (Meteor.subscribe("Products").ready()) {
    const products = Products.find({ type: "simple", shopId }, { sort: { createdAt: -1 } }).fetch();

    onData(null, { products, shop });
  }
};

registerComponent(
  "VendorDetails",
  VendorDetails,
  composeWithTracker(composer)
);
export default composeWithTracker(composer)(VendorDetails);
