import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";

import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [publishabaleKey] = useState(
    "pk_test_51LdxtVSCptcLSVS8PRNENwk7DgZhrL5Slvo5CT0C0KjvlJAT0gWMlSnjM7vHXziqFjcPjsL5hPKPCY3YTz7ftMC800HbiyH7ES"
  );
  const stripePromise = loadStripe(publishabaleKey);
  useEffect(() => {
    // Call for Publishabale Key

    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
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
