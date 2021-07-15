import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AnimalList from ".";

describe("the animal list component", () => {
  it("should display a loading spinner if loading data", () => {
    render(<AnimalList loading={true} />);
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  it("should not display a loading spinner if not loading data", () => {
    render(<AnimalList data={{ animals: [] }} loading={false} />);
    expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
  });

  it("should render all provided animals", () => {
    render(<AnimalList data={DATA} loading={false} />);
    expect(screen.getByText("Fido")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });

  it("should prompt the user to search for something if there's no data", () => {
    render(<AnimalList data={{ animals: undefined }} loading={false} />);
    expect(screen.getByText(/search for/i)).toBeInTheDocument();
  });

  it("should display 'no results found' text if there are no animals returned", () => {
    render(<AnimalList data={{ animals: [] }} loading={false} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
