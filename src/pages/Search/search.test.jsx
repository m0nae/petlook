import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchDataProvider } from "../../contexts/SearchData";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "./index";

const renderUI = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <SearchDataProvider {...providerProps}>{ui}</SearchDataProvider>,
    renderOptions
  );
};

describe("the 'distance' input", () => {
  beforeEach(() => {
    renderUI(
      <Router>
        <Search />
      </Router>,
      {}
    );
  });

  it("should correctly render", () => {
    let input = screen.getByLabelText("Distance");
    expect(input).toBeInTheDocument();
  });

  it("should render value of 100 by default", () => {
    let input = screen.getByLabelText("Distance");
    expect(input).toHaveValue(100);
  });

  it("should change value to user's input", async () => {
    let input = screen.getByLabelText("Distance");

    fireEvent.change(input, { target: { value: 300 } });
    expect(input).toHaveValue(300);
  });
});
