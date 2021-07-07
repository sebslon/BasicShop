import styled from "styled-components";
import nProgress from "nprogress";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import SubmitPaymentBtn from "./styles/SubmitPaymentBtn";

const CheckoutForm = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function Checkout() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if(error) setError(error);

    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutForm onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SubmitPaymentBtn>Check Out Now</SubmitPaymentBtn>
    </CheckoutForm>
  );
}

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripeLib}>
      <Checkout></Checkout>
    </Elements>
  );
}
