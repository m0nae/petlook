import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, userEvent } from "@testing-library/react";
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

describe("'Select Species' page interactivity", () => {
  beforeEach(() => {
    renderUI(
      <Router>
        <SelectSpecies />
      </Router>
    );
  });

  test("Back button renders and is enabled", () => {
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).not.toBeDisabled();
  });

  test("Next button is disabled by default/when no species is selected", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("When a species is selected, the next button is enabled", async () => {
    fireEvent.click(screen.getByText("Rabbit"));
    expect(
      await screen.findByRole("link", { name: "Next" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });
});

describe("Selection displays the correct species names", () => {
  test("displays Rabbit on rabbit selected species", () => {
    renderUI("Rabbit");
    expect(screen.getByText("Rabbit")).toBeInTheDocument();
  });

  test("displays Bunny Rabbit on rabbit selected species", () => {
    renderUI("Bunny Rabbit");
    expect(screen.getByText("Bunny Rabbit")).toBeInTheDocument();
  });
});
