import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import {
  registerComponent,
  composeWithTracker,
  Components
} from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import ReviewsList from "./reviewsList";
import { Reviews } from "./../../lib/collections";


const averageRating = (reviewList) => {
  const ratingSum = reviewList.reduce((total, reviewObject) => {
    return (total + reviewObject.rating);
  }, 0);
  return (ratingSum / reviewList.length);
};

class ReviewsContainer extends Component {
  static propTypes = {
    allReviews: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviewText: "",
        rating: 0
      },
      hideReviewForm: true
    };
    this.onChange = this.onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
  }

  onChange(event) {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  }

  toggleReviewForm() {
    this.setState({
      hideReviewForm: !this.state.hideReviewForm
    });
  }

  ratingChanged(rating) {
    this.setState({ data: { ...this.state.data, rating } });
  }

  onSubmit(event) {
    event.preventDefault();

    const { rating, reviewText } = this.state.data;
    if (rating === 0 || reviewText.trim().length < 3) {
      return Alerts.toast("Kindly rate this product and write a review", "error");
    }
    const productId = Reaction.Router.getParam("handle");

    Meteor.call("reviews/new", reviewText, rating, productId, (err) => {
      if (err) {
        return Alerts.toast(err.message, "error");
      }
      this.setState({
        data: { rating: 0, reviewText: "" },
        hideReviewForm: !this.state.hideReviewForm
      });
      Alerts.toast("Review Added", "success");
    });
  }

  render() {
    const { hideReviewForm } = this.state;
    const { rating, reviewText } = this.state.data;
    const { allReviews } = this.props;
    const getAverageRating = averageRating(allReviews) || 0;
    const signedInUser = Meteor.user().emails[0];

    return (
      <div>
        <Components.Divider
          key="reviews"
          i18nKeyLabel="Reviews"
          label="Reviews"
        />
        <div>
          <h1>Average Rating:</h1>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">{getAverageRating.toFixed(1)}</h4>
            <div>
              <ReactStars
                size={24}
                value={getAverageRating}
                edit={false}
                color2={"#ff5000"}
              />
            </div>
            <p className="m-0">Based on {allReviews.length} review(s)</p>
            <button
              hidden={!hideReviewForm}
              onClick={this.toggleReviewForm}
              className="btn-review"
            >
              Write a Review
            </button>
          </div>
        </div>
        <div hidden={hideReviewForm}>
          {
            !signedInUser ? (
              <div className="d-flex justify-content-center">
                <h3 className="review-signin-error">Kindly sign-in to add a review</h3>
              </div>
            ) : (
              <form onSubmit={this.onSubmit}>
                <div className="d-flex align-items-center mt-2">
                  <div className="m-0">
                    <ReactStars
                      value={rating}
                      size={16}
                      half={false}
                      onChange={this.ratingChanged}
                      color2={"#ff5000"}
                    />
                  </div>
                  <p  className="m-0">(Please do rate this product)</p>
                </div>
                <div>
                  <textarea
                    type="text"
                    className="form-control"
                    name="reviewText"
                    value={reviewText}
                    onChange={this.onChange}
                    rows="5"
                  />
                </div>
                <div className="mt-2 d-flex justify-content-between">
                  <span
                    onClick={this.toggleReviewForm}
                    className="btn-review"
                  >
                    Cancel
                  </span>
                  <button
                    type="submit"
                    className="btn-accept"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )
          }
        </div>

        {
          allReviews.length > 0 ? (
            <div className="reviews-list">
              <ReviewsList
                reviews={allReviews}
              />
            </div>
          ) : (
            <h3 className="text-center">No reviews yet</h3>
          )
        }

      </div>
    );
  }
}

const composer = ({ currentUser }, onData) => {
  const productId = Reaction.Router.getParam("handle");
  if (Meteor.subscribe("Reviews").ready()) {
    const reviews = Reviews.find({ productId }, { sort: { createdAt: -1 } }).fetch();

    onData(null, {
      allReviews: reviews,
      currentUser
    });
  }
};

registerComponent(
  "ReviewsContainer",
  ReviewsContainer,
  composeWithTracker(composer)
);

export default composeWithTracker(composer)(ReviewsContainer);
