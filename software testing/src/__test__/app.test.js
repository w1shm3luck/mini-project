import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test('renders "React Axios example - netlify"', () => {
  render(<App />);
  const headerElement = screen.getByText(/react axios example - netlify/i);
  expect(headerElement).toBeInTheDocument();
});
