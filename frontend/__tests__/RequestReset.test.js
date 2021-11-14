import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";

import RequestReset, {
  REQUEST_RESET_MUTATION,
} from "../components/RequestReset";

const email = "test@gmail.com";
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe("<RequestReset />", () => {
  it("Renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("Calls the mutation when submitted", async () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset mocks={mocks} />
      </MockedProvider>
    );

    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    userEvent.click(screen.getByText(/submit/i));

    const success = await screen.findByText(/success/i);

    expect(success).toBeInTheDocument();
  });
});
