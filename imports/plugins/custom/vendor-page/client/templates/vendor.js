import { Template } from "meteor/templating";
import Vendors from "../components/vendorPage";

Template.VendorPage.helpers({
  VendorList() {
    return {
      component: Vendors
    };
  }
});

