import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SelectSpecies, { Selection } from "./index";
import { SearchDataProvider } from "../../contexts/SearchData";
import rabbitFace from "@iconify-icons/noto/rabbit-face";

function renderUI(text) {
  const selectedSpecies = { value: "rabbit" };
  return render(
    <SearchDataProvider value={selectedSpecies}>
      <Selection
        text={text}
        selectionName="rabbit"
        icon={{ element: rabbitFace }}
        handleClick={() => {}}
      />
    </SearchDataProvider>
  );
}

describe("the 'Select Species' page", () => {
  beforeEach(() => {
    renderUI(
      <Router>
        <SelectSpecies />
      </Router>
    );
  });

  describe("the back button", () => {
    it("should render", () => {
      expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
    });

    it("should be disabled initially", () => {
      expect(screen.getByRole("link", { name: "Back" })).not.toBeDisabled();
    });
  });

  describe("the next button", () => {
    it("should be disabled by default/when no species is selected", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should be enabled when a species is selected", async () => {
      fireEvent.click(screen.getByText("Rabbit"));
      expect(
        await screen.findByRole("link", { name: "Next" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Next" })
      ).not.toBeInTheDocument();
    });
  });

  describe("the selection 'button'", () => {
    it("should display the text specified by the developer", () => {
      renderUI("Bunny Rabbit");
      expect(screen.getByText("Bunny Rabbit")).toBeInTheDocument();
    });
  });
});
