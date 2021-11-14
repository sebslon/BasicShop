import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";

import SignUp, { SIGN_UP_MUTATION } from "../components/SignUp";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

const me = fakeUser();
const password = "test";

const mocks = [
  // mutation mock
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: { name: me.name, email: me.email, password: password },
    },
    result: {
      data: {
        createUser: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  //current user mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: me } },
  },
];

describe("<SignUp />", () => {
  it("Renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  }),
    it("Calls the mutation properly", async () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <SignUp />
        </MockedProvider>
      );

      await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
      await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
      await userEvent.type(screen.getByPlaceholderText(/password/i), password);

      await userEvent.click(screen.getByText("Sign Up!"));

      await screen.findByText(
        `Signed up with ${me.email} - you can now sign in.`
      );
    });
});
