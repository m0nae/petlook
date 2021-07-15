import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { StateI } from "../../contexts/SearchData";
import rabbitFace from "@iconify-icons/noto/rabbit-face";
import Selection, { SelectionProps } from ".";

const selectedSpecies: StateI["selectedSpecies"] = {
  label: "Rabbit",
  value: "rabbit",
};

function renderUI(props?: Partial<SelectionProps>) {
  render(
    <Selection
      text="Rabbit"
      selectionName="rabbit"
      icon={{ element: rabbitFace }}
      handleClick={() => {}}
      selectedSpecies={selectedSpecies}
      {...props}
    />
  );
}

it("should display the specified text", () => {
  renderUI({ text: "Bunny Rabbit" });
  expect(screen.getByText(/Bunny Rabbit/i)).toBeInTheDocument();
});
