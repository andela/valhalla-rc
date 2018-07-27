import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";
import { Accounts } from "/lib/collections";

export const Reviews = new SimpleSchema({
  reviewText: {
    type: String,
    optional: false
  },
  rating: {
    type: Number,
    optional: false
  },
  userId: {
    type: String,
    optional: false
  },
  username: {
    type: String,
    optional: false
  },
  user: {
    type: Accounts
  },
  productId: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    defaultValue: new Date
  }
});

registerSchema("Reviews", Reviews);
