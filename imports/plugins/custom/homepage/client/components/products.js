import React, { Component } from "react";
import {  registerComponent, composeWithTracker  } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Products, Media } from "/lib/collections";

class TopProducts extends Component {
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
    return <h3 className="sold-out">Sold out!</h3>;
  };

  render() {
    if (!this.props.allProducts) return (<h3> No Products Found</h3>);

    return (
      <div className="top-products container" id="top-products">
        <h2 className="subtitle fancy top-products"><span>TOP PRODUCTS</span></h2>
        { this.props.allProducts &&
          <div className="row row-eq-heightt product-group">
            { this.props.allProducts.map(oneProduct => (
              <div key={oneProduct.product._id} className="col-md-3 col-lg-4">
                <div className="cont">
                  { this.isSoldOut(oneProduct.product.isSoldOut) }
                  <a href={`/product/${oneProduct.product.handle}/`}>
                    <div className="product">
                      <img className="prod-img" src={this.getImageUrl(oneProduct.image)} />
                      <h2 className="header">{oneProduct.product.title}</h2>
                      <p className="description">
                        {oneProduct.product.description}
                      </p>
                      <p className="price">
                        &#x24; {oneProduct.product.price.range}
                      </p>
                      <button className="btn">
                        Add to cart <i className="fa fa-shopping-cart" />
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

TopProducts.propTypes = {
  allProducts: PropTypes.array,
  productsMedia: PropTypes.array
};

const composer = (props, onData) => {
  const allProducts = [];

  const topProduct = Meteor.subscribe("Products").ready();

  if (topProduct) {
    const products = Products.find({ type: "simple" }).fetch();
    products.map(product => {
      const image = Media.findOne({
        "metadata.productId": product._id
      }, { sort: { "metadata.priority": 1, "uploadedAt": 1 }
      });
      allProducts.push({ product, image });
    });
    onData(null, { allProducts });
  }
};

registerComponent(
  "TopProducts",
  TopProducts,
  composeWithTracker(composer)
);
export default composeWithTracker(composer)(TopProducts);
