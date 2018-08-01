import React, { Component } from "react";
import Truncate from "react-truncate";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
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
    return <span className="sold_out">Sold out</span>;
  };

  render() {
    if (!this.props.allProducts) return (<h3> No Products Found</h3>);

    return (
      <div className="top-products container" id="top-products">
        <h2 className="subtitle fancy top-products"><span>TOP PRODUCTS</span></h2>
        <div className="container page-wrapper product-div">
          <div className="page-inner">
            <div className="row">
              { this.props.allProducts &&
                <div className="row row-eq-heightt product-group">
                  { this.props.allProducts.map(oneProduct => (
                    <div key={oneProduct.product._id} className="col-md-3 col-lg-4">
                      <div className="cont">
                        {/* { this.isSoldOut(oneProduct.product.isSoldOut) } */}
                        <a href={`/product/${oneProduct.product.handle}`} key={oneProduct.product._id}>
                          <div className="col-lg-4 el-wrapper product-column">
                            { this.isSoldOut(oneProduct.product.isSoldOut) }
                            <div className="box-up">
                              <img className="img" src={this.getImageUrl(oneProduct.image)} alt="" />
                              <div className="img-info">
                                <div className="info-inner">
                                  <span className="p-company lead hide">
                                    <Truncate lines={4}>
                                      {oneProduct.product.description}
                                    </Truncate>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <h4 className="text-center">{oneProduct.product.title}</h4>
                            <div className="box-down">
                              <div className="h-bg">
                                <div className="h-bg-inner" />
                              </div>
                              <span className="cart">
                                <span className="price">${oneProduct.product.price.min}</span>
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
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
