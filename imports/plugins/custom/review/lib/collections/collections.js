import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";

/**
* Reviews Collection
* @type {Object}
* @desc Collection for reviews
*/
export const Reviews = new Mongo.Collection("Reviews");

Reviews.attachSchema(Schemas.Reviews);
