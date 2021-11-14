import { render, screen } from "@testing-library/react";
import wait from "waait";

import CartCount from "../components/CartCount";

describe("<CartCount />", () => {
  it("Renders", () => {
    render(<CartCount count={10} />);
  });

  it("Matches snapshot", () => {
    const { container } = render(<CartCount count={10} />);

    expect(container).toMatchSnapshot();
  });

  it("Updates via props", async () => {
    const { container, rerender } = render(<CartCount count={10} />);

    expect(container.textContent).toBe("10");

    rerender(<CartCount count={11} />);

    await wait(400);

    expect(container.textContent).toBe("11");
    expect(container).toMatchSnapshot();
  });
});
