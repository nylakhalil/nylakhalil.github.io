import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app home", () => {
  render(<App />);

  const nameAnchorNode = screen.getByText(/nyla khalil/i, { selector: "h4" });
  const aboutAnchorNode = screen.getByText(/home/i, { selector: "button" });
  const developAnchorNode = screen.getByText(/develop/i, {
    selector: "button",
  });
  const photographyAnchorNode = screen.getByText(/photography/i, {
    selector: "button",
  });

  expect(nameAnchorNode).toBeInTheDocument();
  expect(aboutAnchorNode).toBeInTheDocument();
  expect(developAnchorNode).toBeInTheDocument();
  expect(photographyAnchorNode).toBeInTheDocument();
});
