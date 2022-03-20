import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app home", () => {
  render(<App />);

  const nameAnchorNode = screen.getByText(/nyla khalil/i, {selector: 'h1'});
  const aboutAnchorNode = screen.getByText(/about/i);
  const developAnchorNode = screen.getByText(/develop/i);
  const photographyAnchorNode = screen.getByText(/photography/i);

  expect(nameAnchorNode).toBeInTheDocument();
  expect(aboutAnchorNode).toBeInTheDocument();
  expect(developAnchorNode).toBeInTheDocument();
  expect(photographyAnchorNode).toBeInTheDocument();
});
