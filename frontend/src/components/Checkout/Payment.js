import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [publishableKey, setPublishableKey] = useState("");

  const stripePromise = loadStripe(publishableKey);
  useEffect(() => {
    // Call for Publishabale Key
    async function fetchPublishableKey() {
      return axios
        .get("/api/v1/get-publishable-key")
        .then((response) => setPublishableKey(response.data.publishableKey));
    }

    // Create PaymentIntent as soon as the page loads
    async function createPaymentIntent() {
      const configuration = { headers: { "Content-Type": "application/json" } };
      return axios
        .post(
          "/api/v1/create-payment-intent",
          JSON.parse(sessionStorage.getItem("orderDetails")),
          configuration
        )
        .then((response) => response.data)
        .then((data) => setClientSecret(data.clientSecret));
    }

    fetchPublishableKey();
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section className="mt-10 h-screen drop-shadow dark:bg-gray-900 py-8">
        <div className="relative flex flex-col items-center justify-center mx-auto ">
          <div className="p-8 bg-gray-50 flex flex-col lg:w-2/5">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
