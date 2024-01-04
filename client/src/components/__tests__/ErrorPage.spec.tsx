import { ErrorPage } from "../ErrorPage";
import { screen, render } from "@testing-library/react";

test("should render error page", () => {
  render(<ErrorPage />);
  expect(screen.getByText("Page not found")).toBeInTheDocument();
});
