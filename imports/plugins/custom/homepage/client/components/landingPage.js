import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import Carousel from "./carousel";
import AllProducts from "./products";
import ProductCategory from "./productCategory";
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
          </div>
        </main>
      </div>
    );
  }
}

registerComponent("LandingPage", LandingPage, getHOCs("Products"));

export default LandingPage;
