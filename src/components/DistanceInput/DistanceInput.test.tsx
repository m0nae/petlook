import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DistanceInput from ".";
import { SearchDataProvider } from "../../contexts/SearchData";
import Search from "../../pages/Search";

describe("the distance input component", () => {
  describe("displays properly", () => {
    beforeEach(() => {
      render(
        <SearchDataProvider>
          <DistanceInput />
        </SearchDataProvider>
      );
    });

    it("should have a label thats hidden visually but still exists within the DOM", () => {
      let label = screen.getByText(/Distance/i);
      expect(label).toBeInTheDocument();

      // "hidden" is the TailwindCSS class for "display: none"
      expect(label).toHaveClass("hidden");
    });

    it("should contain the word 'miles'", () => {
      let miles = screen.getByText(/miles/i);
      expect(miles).toBeInTheDocument();
    });
  });

  describe("handles user input properly", () => {
    beforeEach(() => {
      render(
        <SearchDataProvider>
          <Search>
            <DistanceInput />
          </Search>
        </SearchDataProvider>
      );
    });

    it("should have the value of 100 when it initially renders", () => {
      let input = screen.getByLabelText(/Distance/i);

      expect(input).toHaveValue(100);
    });

    it("should set the value to 0 if the user enters a number below 0", () => {
      let input = screen.getByLabelText(/Distance/i);

      userEvent.type(input, "-100");
      expect(input).toHaveValue(0);

      userEvent.type(input, "-1");
      expect(input).toHaveValue(0);
    });

    it("should set the value to 500 if the user enters a number greater than 500", () => {
      let input = screen.getByLabelText(/Distance/i);

      userEvent.type(input, "600");
      expect(input).toHaveValue(500);

      userEvent.type(input, "501");
      expect(input).toHaveValue(500);
    });
  });
});
