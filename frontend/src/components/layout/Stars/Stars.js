import React from "react";
import filledStar from "../../../images/ratings/filled-star.svg";
import halfStar from "../../../images/ratings/half-star.svg";
import emptyStar from "../../../images/ratings/empty-star.svg";

const Stars = ({ num_of_stars, num_of_reviews }) => {
  return (
    <div className="flex items-center mt-2.5 mb-5">
      <img
        src={filledStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
      <img
        src={filledStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
      <img
        src={filledStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
      <img
        src={halfStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
      <img
        src={emptyStar}
        alt="ratingstar"
        className="w-5 h-5 text-yellow-300"
      />
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
        {num_of_reviews}
      </span>
    </div>
  );
};

export default Stars;
