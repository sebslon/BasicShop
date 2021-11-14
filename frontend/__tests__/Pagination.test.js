import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import Pagination from "../components/Pagination";
import { makePaginationMocksFor } from "../lib/testUtils";

describe("<Pagination />", () => {
  it("Displays a loading message", () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );

    expect(container).toHaveTextContent(/loading/i);
  });

  it("Renders pagination for 18 items", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1}/>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    expect(container).toHaveTextContent(/Page 1 of 3/i);
    expect(container).toHaveTextContent(/Total items 18/i);
  })

  it("Disables the prev page on first page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1}/>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);

    expect(prevBtn).toHaveAttribute("aria-disabled", "true");
    expect(nextBtn).toHaveAttribute("aria-disabled", "false");
  })

  it("Disables the next page on last page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={3}/>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);

    expect(prevBtn).toHaveAttribute("aria-disabled", "false");
    expect(nextBtn).toHaveAttribute("aria-disabled", "true");
  })

  it("Enables all pagination buttons on middle page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={2}/>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);

    expect(prevBtn).toHaveAttribute("aria-disabled", "false");
    expect(nextBtn).toHaveAttribute("aria-disabled", "false");
  })
});
