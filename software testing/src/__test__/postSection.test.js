import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import PostSection from "../components/PostSection/view";

test('renders "react axios post"', () => {
  render(<PostSection />);
  const headerElement = screen.getByText(/react axios post/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders title input element", () => {
  const testText = "food";

  render(<PostSection />);

  const input = screen.getByTestId("title-input");
  userEvent.type(input, testText);
  const textElement = screen.getByText(`Title: ${testText}`);
  expect(textElement).toBeInTheDocument();
});

test("renders description input element", () => {
  const testText = "this is a description";

  render(<PostSection />);

  const input = screen.getByTestId("description-input");
  userEvent.type(input, testText);
  const textElement = screen.getByText(`Description: ${testText}`);
  expect(textElement).toBeInTheDocument();
});

test('renders "post" button', () => {
  render(<PostSection />);

  const buttonElement = screen.getByText(/post data/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders "clear" button', () => {
  render(<PostSection />);

  const buttonElement = screen.getByText(/clear/i);
  const button = screen.getByTestId("clear-button");
  userEvent.click(button);
  expect(buttonElement).toBeInTheDocument();
});

jest.mock("axios");

const mockResponse = {
  data: {
    status: "Awesome!",
  },
};

const mockError = {
  data: null,
  message: "Error",
};

test("renders post", async () => {
  await act(async () => {
    await axios.post.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );
    render(<PostSection />);

    const button = screen.getByTestId("post-button");
    userEvent.click(button);
  });

  const response = screen.getByTestId("response");
  expect(response).toBeInTheDocument();
});

test("renders error", async () => {
  await act(async () => {
    await axios.post.mockImplementationOnce(() => Promise.reject(mockError));
    render(<PostSection />);

    const button = screen.getByTestId("post-button");
    userEvent.click(button);
  });
});
