import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser, fakeCartItem } from "../lib/testUtils";
import { CartStateProvider } from "../lib/cartState";

//Mocks for being logged in/out/ logged in with cart items

const noSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { authenticatedItem: null },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

describe("<Nav />", () => {
  it("Renders minimal nav and sign in link when signed out", () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider mocks={noSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    expect(container).toHaveTextContent(/sign in/i);
    expect(container).toMatchSnapshot();

    const link = screen.getByText(/sign in/i);

    expect(link).toHaveAttribute("href", "/signin")
  });

  it("Renders a full nav when signed in", async () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    await screen.findByText(/account/i);

    expect(container).toHaveTextContent(/sign out/i)
    expect(container).toMatchSnapshot();
  })

  it("Renders the amount of items in the cart", async () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    await screen.findByText(/account/i);

    expect(screen.getByText("3")).toBeInTheDocument();
  })
});
