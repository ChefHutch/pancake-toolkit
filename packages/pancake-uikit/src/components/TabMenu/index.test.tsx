import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../testHelpers";
import { TabMenu, Tab } from ".";

const handleClick = jest.fn();

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(
    <TabMenu activeIndex={0} onItemClick={handleClick}>
      <Tab>Item 1</Tab>
      <Tab>Item 2</Tab>
    </TabMenu>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should render the correct number of tabs", () => {
  const { getAllByRole } = renderWithTheme(
    <TabMenu activeIndex={0} onItemClick={handleClick}>
      <Tab>Item 1</Tab>
      <Tab>Item 2</Tab>
      <Tab>Item 3</Tab>
    </TabMenu>
  );

  expect(getAllByRole("button").length).toEqual(3);
});

it("should receive the tab index when clicked", () => {
  renderWithTheme(
    <TabMenu activeIndex={0} onItemClick={handleClick}>
      <Tab>Item 1</Tab>
      <Tab>Item 2</Tab>
      <Tab>Item 3</Tab>
    </TabMenu>
  );

  userEvent.click(screen.getByText("Item 2"));
  expect(handleClick.mock.calls[0][0]).toBe(1);
});
