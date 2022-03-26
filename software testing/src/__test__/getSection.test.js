import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import GetSection from "../components/GetSection/view";

test('renders "react axios get"', () => {
  render(<GetSection />);
  const headerElement = screen.getByText(/react axios get/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders "get all" button', () => {
  render(<GetSection />);

  const buttonElement = screen.getByText(/get all/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders "clear" button', () => {
  render(<GetSection />);

  const buttonElement = screen.getByText(/clear/i);
  const button = screen.getByTestId("clear-button");
  userEvent.click(button);
  expect(buttonElement).toBeInTheDocument();
});

jest.mock("axios");

const mockResponse = {
  data: [
    {
      id: 1,
      name: "Roti",
      price: 1000,
      stock: 10,
      imageUrl: "",
    },
  ],
};

const mockError = {
  data: null,
  message: "Error",
};

test("renders products", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
    render(<GetSection />);

    const button = screen.getByTestId("get-all-button");
    userEvent.click(button);
  });

  const response = screen.getByTestId("response");
  expect(response).toBeInTheDocument();
});

test("renders error", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
    render(<GetSection />);

    const button = screen.getByTestId("get-all-button");
    userEvent.click(button);
  });
});
