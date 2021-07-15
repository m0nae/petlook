import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SelectSpecies from "./index";
import { SearchDataProvider } from "../../contexts/SearchData";

function renderUI() {
  return render(
    <Router>
      <SearchDataProvider selectedSpecies>
        <SelectSpecies />
      </SearchDataProvider>
    </Router>
  );
}

describe("the 'Select Species' page", () => {
  beforeEach(() => {
    renderUI();
  });

  describe("the back button", () => {
    it("should render", () => {
      expect(screen.getByRole("link", { name: /Back/i })).toBeInTheDocument();
    });

    it("should be disabled initially", () => {
      expect(screen.getByRole("link", { name: /Back/i })).not.toBeDisabled();
    });
  });

  describe("the next button", () => {
    it("should be disabled by default/when no species is selected", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should be enabled when a species is selected", async () => {
      fireEvent.click(screen.getByText(/Rabbit/i));
      expect(
        await screen.findByRole("link", { name: /Next/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Next/i })
      ).not.toBeInTheDocument();
    });
  });
});
