import React from "react";
import filledStar from "../../../images/ratings/filled-star.svg";
import halfStar from "../../../images/ratings/half-star.svg";
import emptyStar from "../../../images/ratings/empty-star.svg";

const starsDisplay = (num_of_stars) => {
  let ratingStars = [];
  let key = 0;
  for (let i = 0; i < Math.floor(num_of_stars); i++) {
    ratingStars.push(
      <img
        key={key}
        src={filledStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
    );
    key++;
  }
  if (num_of_stars % 1 !== 0) {
    ratingStars.push(
      <img
        key={key}
        src={halfStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
    );
    key++;
  }
  for (let i = 0; i < 5 - Math.ceil(num_of_stars); i++) {
    ratingStars.push(
      <img
        key={key}
        src={emptyStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
    );
    key++;
  }
  return ratingStars;
};

const Stars = ({ num_of_stars, num_of_reviews }) => {
  return (
    <div className="flex items-center mt-2.5 mb-5">
      {starsDisplay(num_of_stars)}
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
        {num_of_stars}
      </span>
      <span className=" text-black-100 text-xs font-semibold py-0.5 dark:bg-blue-200 dark:text-blue-800">
        ({num_of_reviews} reviews)
      </span>
    </div>
  );
};

export default Stars;
