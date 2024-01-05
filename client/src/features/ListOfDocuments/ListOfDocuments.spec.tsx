import { ListOfDocuments } from "./index";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("should render list of documents", () => {
  render(
    <MemoryRouter>
      <ListOfDocuments />
    </MemoryRouter>
  );
  expect(screen.getByText("List of documents")).toBeInTheDocument();
  expect(
    screen.getByText(
      "You can click on document to join conversation with others, number in right bottom corner indicates amount of active users"
    )
  ).toBeInTheDocument();
  const article = screen.getAllByRole("article");
  expect(article.length).toBe(3);
});
