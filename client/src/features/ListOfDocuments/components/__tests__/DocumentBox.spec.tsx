import { DocumentBox } from "../DocumentBox";
import { screen, render } from "@testing-library/react";

test("", () => {
  const activeUsers = 5;
  const content = "Document 1";
  const link = "/home";
  render(
    <DocumentBox activeUsers={activeUsers} content={content} link={link} />
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", link);
  expect(screen.getByText(content)).toBeInTheDocument();
  expect(screen.getByText(activeUsers)).toBeInTheDocument();
});
