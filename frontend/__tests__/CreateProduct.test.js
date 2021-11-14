import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";
import Router from "next/router";
import wait from "waait";

import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from "../components/CreateProduct";
import { ALL_PRODUCTS_QUERY } from "../components/Products";
import { fakeItem, makePaginationMocksFor } from "../lib/testUtils";

const item = fakeItem();

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("<CreateProduct />", () => {
  it("Renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("Handles the updating", async () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );

    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it("Creates the items when the form is submitted", async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: "",
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item,
              id: "abc123",
              __typename: "Item",
            },
          },
        },
      },

      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 2 },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];

    const { container } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );

    //submit and check if page change has been called
    await userEvent.click(screen.getByText(/Add product/i));

    await waitFor(() => wait(0));

    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({"pathname": "/product/abc123"});
  });
});
