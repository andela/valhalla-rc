import { Template } from "meteor/templating";
import Vendors from "../components/vendorPage";
import VendorDetails from "./../components/vendorDetails";

Template.VendorPage.helpers({
  VendorList() {
    return {
      component: Vendors
    };
  }
});

Template.vendorDetails.helpers({
  displayVendorDetails() {
    return {
      component: VendorDetails
    };
  }
});
