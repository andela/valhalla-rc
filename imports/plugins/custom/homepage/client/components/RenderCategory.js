import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib";
import Category from "./category";

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
