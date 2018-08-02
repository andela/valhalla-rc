import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { slugify } from "transliteration";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Tags, SubTags } from "/lib/collections";

class Category extends Component {
  openSubCategories(category) {
    return () => {
      const subCategories = document.getElementById(slugify(category));
      subCategories.classList.remove("hide");
    };
  }
  closeSubCategories(category) {
    return () => {
      const subCategories = document.getElementById(slugify(category));
      subCategories.classList.add("hide");
    };
  }
  mapCategory({ category, subCategories }) {
    return (
      <div key={category}>
        { subCategories.length !== 0 ?
          <div
            className="list-group-item dropdown-toggle"
            data-toggle="collapse"
            data-target={`#${slugify(category)}`}
            onMouseOver={this.openSubCategories(category)}
          >
            <span>
              <i className="fa fa-angle-double-right pull-right" /> { category }
            </span>
          </div> :
          <a href={`/tag/${slugify(category)}`} className="list-group-item">
            <i className="fa fa-angle-double-right pull-right" /> { category }
          </a>
        }
        <div
          id={slugify(category)}
          className="collapse list-group sub-category"
          onMouseLeave={this.closeSubCategories(category)}
        >
          { subCategories.map(subCategory => this.mapSubCategory(subCategory)) }
        </div>
      </div>
    );
  }

  mapSubCategory(subcategory) {
    return (
      <a
        href={`/tag/${slugify(subcategory)}`}
        key={subcategory}
        className="list-group-item"
      ><i className="fa fa-angle-double-right pull-right" />
        {subcategory}</a>
    );
  }

  render() {
    return (
      <div className="list-group" id="main-category">
        <a
          href="/tag"
          className="list-group-item"
        >
          <i className="fa fa-angle-double-right pull-right" /> All products
        </a>
        { this.props.allTags.map(category => this.mapCategory(category)) }
      </div>
    );
  }
}

const composer = (props, onData) => {
  const allTags = [];

  const categories = Meteor.subscribe("Tags").ready();
  Meteor.subscribe("SubTags").ready();

  if (categories) {
    const productTags = Tags.find({ isTopLevel: true }, { sort: { position: 1 } }).fetch();
    productTags.map(tag => {
      const subTags = SubTags.find({ _tagId: tag._id }).fetch();
      const tagInfo = subTags.map(subTag => subTag.name);
      allTags.push({ category: tag.name, subCategories: tagInfo });
    });
    onData(null, { allTags });
  }
};

Category.propTypes = {
  allTags: PropTypes.array
};

registerComponent(
  "Category",
  Category,
  composeWithTracker(composer)
);
export default composeWithTracker(composer)(Category);
