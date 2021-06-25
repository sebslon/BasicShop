import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const resetError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your Password</h2>
      <DisplayError error={error || resetError} />
      <fieldset aria-disabled={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Password changed.</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}
