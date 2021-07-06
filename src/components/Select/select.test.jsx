import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, userEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchDataProvider } from "../../contexts/SearchData";
import Select from "./index";

const renderUI = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <SearchDataProvider {...providerProps}>{ui}</SearchDataProvider>,
    renderOptions
  );
};

describe("Species select element", () => {
  beforeEach(() => {
    renderUI(<Select />, {});
  });

  test("renders properly", () => {
    let select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  test("displays all of the possible species as options", async () => {
    let select = screen.getByRole("combobox");
    fireEvent.click(select);

    let options = await screen.findAllByRole("option");
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

  test("Renders the correct icon depending on the selected species", async () => {
    let rabbitOption = screen.getByRole("option", { name: "Rabbits" });

    fireEvent.click(rabbitOption);
  });
});
