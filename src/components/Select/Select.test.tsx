import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchDataProvider } from "../../contexts/SearchData";
import Select from "./index";

type OptionsT = HTMLElement[] | (string | null)[];

function renderUI() {
  return render(
    <SearchDataProvider>
      <Select />
    </SearchDataProvider>
  );
}

describe("the species select element", () => {
  beforeEach(() => {
    renderUI();
  });

  it("should render properly", () => {
    let select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  it("should display all of the possible species as options", async () => {
    let select = screen.getByRole("combobox");
    fireEvent.click(select);

    let options: OptionsT = await screen.findAllByRole("option");
    let possibleSpecies = [
      "Barnyard Animals",
      "Small & Furries",
      "Scales, Fins, & Others",
      "Dogs",
      "Cats",
      "Rabbits",
      "Birds",
      "Horses",
    ];

    options = options.map((option) => option.textContent);

    options.forEach((option) => expect(possibleSpecies).toContain(option));
    possibleSpecies.forEach((animal) => expect(options).toContain(animal));
  });

  it("should render the correct icon depending on the selected species", async () => {
    let rabbitOption = screen.getByRole("option", { name: /Rabbits/i });

    fireEvent.click(rabbitOption);
  });
});
