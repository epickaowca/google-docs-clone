import { DocumentBox } from "../DocumentBox";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("should render documentBox", () => {
  const activeUsers = 5;
  const content = "Document 1";
  const link = "/home";
  render(
    <MemoryRouter>
      <DocumentBox activeUsers={activeUsers} content={content} link={link} />
    </MemoryRouter>
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", link);
  expect(screen.getByText(content)).toBeInTheDocument();
  expect(screen.getByText(activeUsers)).toBeInTheDocument();
});
