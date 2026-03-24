import { PaymentElement, LinkAuthenticationElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setSubmitting(true);
    try {
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "always",
      });
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };


  return (
    <div className="max-w-xl mx-auto p-4">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              className="py-2 rounded border border-gray-300 shadow outline-none px-3 focus:border-blue-300 focus:border-2"
              required
              onChange={(e) => localStorage.setItem("checkout_firstName", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              className="py-2 rounded border border-gray-300 shadow outline-none px-3 focus:border-blue-300 focus:border-2"
              required
              onChange={(e) => localStorage.setItem("checkout_lastName", e.target.value)}
            />
          </div>
        </div>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(event) => {
            const email = event.value.email;
            if (email) {
              localStorage.setItem("checkout_email", email);
            }
          }}
        />
        <PaymentElement id="payment-element" />
        <div className="mt-2 mb-5 flex flex-col">
          <label htmlFor="password">Password (For Login)</label>
          <input
            id="password"
            type="password"
            name="password"
            className="py-2 rounded border border-gray-300 shadow outline-none px-3 focus:border-blue-300 focus:border-2"
            required
            onChange={(e) => localStorage.setItem("checkout_password", e.target.value)}
          />
        </div>
        <button
          disabled={submitting || !stripe || !elements}
          id="submit"
          className="mt-2 py-2 px-5 bg-corange rounded-full text-black font-bold"
        >
          <span id="button-text">
            {submitting ? "Processing ..." : "MAKE PAYMENT"}
          </span>
        </button>
      </form>
    </div>
  );
}
