import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "./../../lib/collections";
import { Accounts } from "/lib/collections";
import extractName from "/imports/plugins/custom/helper";

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("Reviews", () => Reviews.find({}));
}

Meteor.methods({
  "reviews/new"(reviewText, rating, productId) {
    check(reviewText, String);
    check(rating, Number);
    check(productId, String);

    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error("Sorry. You have to be logged in to post a review");
    }

    // get the user object so as to generate avatar
    const user = Accounts.findOne({ userId });

    // get store the reviewers username
    const username = user.name || extractName(user.emails[0].address);

    const findReview = Reviews.findOne({
      $and: [
        { userId }, { productId }
      ]
    });

    if (!findReview) {
      return Reviews.insert({
        reviewText,
        rating,
        userId,
        username,
        user,
        productId,
        createdAt: new Date()
      });
    }
    return Reviews.update(findReview._id, {
      $set: { rating, reviewText, createdAt: new Date() }
    });
  }
});
