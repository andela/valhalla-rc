import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";
import { SubTags } from "/lib/collections";

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("SubTags", () => SubTags.find({}));
}

