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

describe("'distance' input", () => {
  beforeEach(() => {
    renderUI(
      <Router>
        <Search />
      </Router>,
      {}
    );
  });

  test("it correctly renders", () => {
    let input = screen.getByLabelText("Distance");
    expect(input).toBeInTheDocument();
  });

  test("it renders value '100' by default", () => {
    let input = screen.getByLabelText("Distance");
    expect(input).toHaveValue(100);
  });

  test("it changes value on user input", async () => {
    let input = screen.getByLabelText("Distance");

    fireEvent.change(input, { target: { value: 300 } });
    expect(input).toHaveValue(300);
  });
});
