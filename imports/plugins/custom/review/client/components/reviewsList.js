import React from "react";
import ReactStars from "react-stars";
import PropTypes from "prop-types";
import moment from "moment";
import { getUserAvatar } from "/imports/plugins/core/accounts/client/helpers/helpers";

const ReviewsList = ({ reviews }) => (
  <div>
    {
      reviews.map((review) => {
        const userImage = getUserAvatar(review.user);
        return (
          <div className="row review" key={review._id}>
            <div className="col-sm-2">
              <span>{userImage}</span>
            </div>
            <div className="col-xs-10">
              <div className="row justify-content-between align-items-center">
                <h3 className=" col-xs-6 m-0">{review.username}</h3>
                <span className=" col-xs-3">{moment(review.createdAt).fromNow()}</span>
                <div className=" col-xs-3">
                  <ReactStars
                    count={5}
                    size={16}
                    value={review.rating}
                    edit={false}
                    color2={"#ffd700"}
                  />
                </div>
              </div>
              <div>{review.reviewText}</div>
            </div>
          </div>
        );
      })
    }
  </div>
);

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default ReviewsList;
