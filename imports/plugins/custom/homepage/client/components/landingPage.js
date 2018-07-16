import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import Carousel from "./carousel";
import AllProducts from "./products";
import "../styles/landing.less";

class LandingPage extends getRawComponent("Products") {
  render() {
    return (
      <div>
        <main>
          <div className="product-div">
            <Carousel />
            <AllProducts />
          </div>
        </main>
      </div>
    );
  }
}

registerComponent("LandingPage", LandingPage, getHOCs("Products"));

export default LandingPage;
