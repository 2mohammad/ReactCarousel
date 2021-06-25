import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it('should render without failure', () => {
  render (<Carousel title="Hello" currNum='1' />)
})
it('should match the snapshot', () => {
  const {asFragment} = render (<Carousel title="Hello" currNum='1' />)
  expect(asFragment()).toMatchSnapshot()
})
it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
it('should move you in the direction of the clicked arrows', () => {
  const {getByTestId, queryByAltText} = render(<Carousel />)
  const leftArrow = getByTestId("left-arrow")
  const rightArrow = getByTestId("right-arrow")
  fireEvent.click(rightArrow)
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  fireEvent.click(leftArrow)
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it('should move you in the direction of the clicked arrows', () => {
  const {getByTestId, queryByAltText} = render(<Carousel />)
  const leftArrow = getByTestId("left-arrow")
  const rightArrow = getByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)
  expect(rightArrow).not.toBeInTheDocument();
})