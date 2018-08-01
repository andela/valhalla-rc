import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const SubTags = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    index: 1
  },
  _tagId: {
    type: String,
    optional: true
  },
  slug: {
    type: String
  },
  type: {
    type: String,
    optional: true
  },
  position: {
    type: Number,
    optional: true
  },
  relatedSubTagsIds: {
    type: [String],
    optional: true,
    index: 1
  },
  isDeleted: {
    type: Boolean,
    defaultValue: false
  },
  isTopLevel: {
    type: Boolean
  },
  isVisible: {
    type: Boolean,
    defaultValue: true
  },
  groups: {
    type: [String], // groupIds that this SubTags belongs to
    optional: true,
    defaultValue: []
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      }
    }
  },
  updatedAt: {
    type: Date
  }
});

registerSchema("SubTags", SubTags);
