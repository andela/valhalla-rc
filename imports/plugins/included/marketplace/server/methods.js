import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/lib/api";
import { Shops } from "/lib/collections";
import { SHOP_WORKFLOW_STATUS_ACTIVE, SHOP_WORKFLOW_STATUS_DISABLED } from "../lib/constants";

const status = [
  SHOP_WORKFLOW_STATUS_ACTIVE,
  SHOP_WORKFLOW_STATUS_DISABLED
];

export function marketplaceUpdateShopWorkflow(shopId, workflowStatus, shopName) {
  check(shopId, String);
  check(workflowStatus, String);
  check(shopName, String);

  if (shopId === Reaction.getPrimaryShopId()) {
    throw new Meteor.Error("access-denied", "Cannot change shop status");
  }

  // if (!Reaction.hasPermission("admin", this.userId, Reaction.getPrimaryShopId())) {
  //   throw new Meteor.Error("access-denied", "Cannot change shop status");
  // }

  if (status.includes(workflowStatus)) {
    return Shops.update({
      _id: shopId
    }, {
      $set: {
        "workflow.status": workflowStatus,
        "name": shopName
      }
    }, function (error) {
      if (error) {
        throw new Meteor.Error("server-error", error.message);
      }
    });
  }

  throw new Meteor.Error("server-error", "Workflow status could not be updated, should be 'active' or 'disabled'");
}

Meteor.methods({
  "marketplace/updateShopWorkflow": marketplaceUpdateShopWorkflow
});
