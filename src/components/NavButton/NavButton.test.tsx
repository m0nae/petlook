import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavButton, { NavBtnProps } from ".";

function renderUI(props?: Partial<NavBtnProps>) {
  render(
    <Router>
      <NavButton to="/foobar" direction="forward" {...props}>
        Next
      </NavButton>
    </Router>
  );
}

it("should display a left pointing arrow if it's a 'back' button", () => {
  renderUI({
    direction: "back",
  });

  let leftArrow = screen.getByTitle(/Left Pointing Arrow/i);
  expect(leftArrow).toBeInTheDocument();
});

it("should display a right pointing arrow if it's a 'next' button", () => {
  renderUI({
    direction: "forward",
  });

  let rightArrow = screen.getByTitle(/Right Pointing Arrow/i);
  expect(rightArrow).toBeInTheDocument();
});

describe("if its disabled", () => {
  beforeEach(() => {
    renderUI({
      disabled: true,
    });
  });

  it("should be a button", () => {
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should be disabled", () => {
    let button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled");
  });
});

describe("if its enabled", () => {
  beforeEach(() => {
    renderUI();
  });

  it("should be a link", () => {
    let link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("should link to a given page", () => {
    let link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/foobar");
  });
});
