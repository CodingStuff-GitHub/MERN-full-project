import React from "react";
import Stars from "../layout/Stars/Stars";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8 mx-5">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="md:block ">
            <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
              {review.comment}
            </p>
          </div>

          <div className="cursor-pointer mr-20 mt-2 md:mt-0">
            <Stars num_of_stars={review.rating} num_of_reviews={0} />
          </div>
        </div>
        <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
          <div className="flex flex-col justify-start items-start space-y-2">
            <p className="text-base font-medium leading-none text-gray-800">
              By {review.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
