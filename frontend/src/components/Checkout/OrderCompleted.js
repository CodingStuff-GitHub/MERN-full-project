import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const OrderCompleted = () => {
  const [publishableKey, setPublishableKey] = useState("");
  const stripePromise = loadStripe(publishableKey);

  useEffect(() => {
    // Call for Publishable Key
    async function fetchPublishableKey() {
      return axios
        .get("/api/v1/get-publishable-key")
        .then((response) => setPublishableKey(response.data.publishableKey));
    }
    fetchPublishableKey();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <OrderCompletedSection />
    </Elements>
  );
};

const OrderCompletedSection = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          //Create an order
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  return (
    <>
      <div className="mx-auto container flex justify-center items-center py-12 px-8">
        <div className="w-auto flex flex-col justify-start items-start">
          <div>
            <p className="text-4xl font-semibold leading-9 text-gray-800">
              {message}
            </p>
          </div>
          <div className="mt-4 w-full">
            <p className="text-base leading-6 text-gray-600">
              Thank you very much! Your order has been placed successful. You
              can track your order status in orders page.
            </p>
          </div>
          <div className="mt-10 w-full">
            <button className="px-4 bg-gray-900 flex justify-between items-center w-full h-14 text-white hover:bg-gray-700">
              <p className="text-xl font-medium leading-5">Back to Home</p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66663 16H25.3333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21.3333L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 10.6667L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 w-full">
            <button className="px-4 bg-gray-900 flex justify-between items-center w-full h-14 text-white hover:bg-gray-700">
              <p className="text-xl font-medium leading-5">Track Orders</p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66663 16H25.3333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21.3333L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 10.6667L25.3333 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCompleted;
