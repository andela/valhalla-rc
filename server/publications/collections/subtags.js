import { Meteor } from "meteor/meteor";
import { SubTags } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * tags
 */
Meteor.publish("SubTags", function () {
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }
  // TODO: filter tag results based on permissions and isVisible or some other
  // publication quality
  return SubTags.find({});
});
