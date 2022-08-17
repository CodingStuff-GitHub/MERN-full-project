import React, { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function Carousel({ product }) {
  const num_of_images = product.images.length;
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div>
        <CarouselProvider
          className="relative block"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={num_of_images}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="js-flickity flex justify-center items-center">
            <ButtonBack
              onClick={() => {
                if (current === 0) {
                  setCurrent(num_of_images - 1);
                } else {
                  setCurrent(current - 1);
                }
              }}
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <Slider>
              {product.images.map((image, index) => (
                <Slide index={index} key={index} className="w-full">
                  <div className="w-full gallery-cell lg:mr-7 mr-6 sm: h-full">
                    <div className="relative w-full h-full">
                      <img
                        src={image.url}
                        alt="sitting area"
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </Slide>
              ))}
            </Slider>
            <ButtonNext
              onClick={() => {
                if (current === num_of_images - 1) {
                  setCurrent(0);
                } else {
                  setCurrent(current + 1);
                }
              }}
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>

      <div className="container mt-6">
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <div
              index={index}
              key={index}
              className={`${
                current === index
                  ? "border-2 border-blue-500/100"
                  : "border-4 border-gray-50/50"
              } w-full`}
            >
              <img
                src={image.url}
                alt="sitting area"
                className="object-center object-cover aspect-square	"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
                    .gallery-cell {
                        height: 386px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .gallery-cell {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .gallery-cell {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .carousel__inner-slideLarge {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
      </style>
    </div>
  );
}
