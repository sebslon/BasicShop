import gql from "graphql-tag";
import styled from "styled-components";
import nProgress from "nprogress";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { CURRENT_USER_QUERY } from "./User";
import SubmitPaymentBtn from "./styles/SubmitPaymentBtn";
import { useCart } from "../lib/cartState";

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
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { closeCart } = useCart();

  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }]}
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error);
      nProgress.done();
      return;
    }

    const order = await checkout({ variables: { token: paymentMethod.id }});

    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });

    closeCart();

    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutForm onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
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

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;
