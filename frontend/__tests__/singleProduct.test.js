import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import SingleProduct, { SINGLE_ITEM_QUERY } from "../components/SingleProduct";

import { fakeItem } from "../lib/testUtils";

const product = fakeItem();

const mocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: "123",
      },
    },
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe("<SingleProduct />", () => {
  it.skip("Renders with proper data", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    await screen.findByTestId("singleProduct");
    expect(container).toMatchSnapshot();
  });

  it("Throws error when an item is not found", async () => {
    const errorMocks = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: "123",
          },
        },
        result: {
          errors: [{ message: "Item not found!" }],
        },
      },
    ];

    const { container, debug } = render(
      <MockedProvider mocks={errorMocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    await screen.findByTestId("graphql-error")
    
    expect(container).toHaveTextContent(/not found/i)
  });
});
