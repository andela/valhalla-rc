import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import Carousel from "./carousel";
import AllProducts from "./products";
import ProductCategory from "./productCategory";
import InstagramFeeds from "../../../socialFeed/instagram/instagramFeeds";
import Footer from "./footer";
import "../styles/landing.less";
import "../styles/category.less";

class LandingPage extends getRawComponent("Products") {
  render() {
    return (
      <div>
        <main>
          <div className="product-div">
            <Carousel />
            <AllProducts />
            <ProductCategory />
            <InstagramFeeds />
            <Footer />
          </div>
        </main>
      </div>
    );
  }
}

registerComponent("LandingPage", LandingPage, getHOCs("Products"));

export default LandingPage;
