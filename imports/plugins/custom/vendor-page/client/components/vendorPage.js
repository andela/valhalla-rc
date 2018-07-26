import React from "react";
import { registerComponent, getHOCs, getRawComponent, Components } from "/imports/plugins/core/components/lib";
import ListVendors from "./listVendors";

class VendorList extends getRawComponent("Products") {
  render() {
    return (
      <div>
        <div className="store-header">
          <br />
          <h1 className="text-white vend-header">Shop Africa</h1>
          <p className="lead">
            Check out some stores offering amazing clothing deals from the continent of AFRICA
          </p>
          <br />
        </div>
        <div><br /><br />
          <ListVendors/>
        </div>
        <Components.Footer />
      </div>
    );
  }
}

registerComponent("VendorPage", VendorList, getHOCs("Products"));

export default VendorList;
