import React, { Component } from "react";
import Category from "./category";
import { registerComponent } from "/imports/plugins/core/components/lib";

class RenderCategory extends Component {
  render() {
    return (
      <div className="collapse hide" id="categories">
        <Category />
      </div>
    );
  }
}
registerComponent("RenderCategory", RenderCategory);

export default RenderCategory;
