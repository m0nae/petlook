import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationInput, { LocationInputProps } from ".";
import { LocationI } from "../../contexts/SearchData";

// todo: refactor this test file. there's a LOT of repetition going on

let location: LocationI = {
  custom: "San Francisco, CA",
};

let lastSearchedLocation: LocationI = {
  custom: "Oakland, CA",
};

let handleLocationInput = jest.fn();

function renderUI(props?: Partial<LocationInputProps>) {
  render(
    <LocationInput
      handleLocationInput={handleLocationInput}
      locationInput=""
      location={location}
      lastSearchedLocation={lastSearchedLocation}
      className=""
      {...props}
    />
  );
}

function shouldHaveEmptyStringValueWhenFocused() {
  it("should have an empty string as the value when the input is first focused", () => {
    let input = screen.getByPlaceholderText(/City, State/i);
    fireEvent.focus(input);
    expect(input).toHaveValue("");
  });
}

function shouldDisplayLocationInput() {
  it("should display the location input as the value", () => {
    renderUI({
      locationInput: "Napa, CA",
    });

    let input = screen.getByDisplayValue(/Napa/i);
    expect(input).toBeInTheDocument();
  });
}

it("should render properly", () => {
  renderUI();

  let input = screen.getByPlaceholderText(/City, State/i);

  expect(input).toBeInTheDocument();
});

it("should run the location input handle fn when user types", () => {
  renderUI();
  let input = screen.getByPlaceholderText(/City, State/i);

  userEvent.type(input, "a");
  expect(handleLocationInput).toHaveBeenCalledTimes(1);
});

it("should run location input handle fn when user pastes text", () => {
  renderUI();

  let input = screen.getByPlaceholderText(/City, State/i);
  userEvent.paste(input, "Napa, CA");
  expect(handleLocationInput).toHaveBeenCalledTimes(1);
});

it("should display the user's location if their location is available", () => {
  renderUI({
    location: {
      coordinates: {
        longitude: "-137.7749",
        latitude: "37.7749",
      },
    },
  });

  let input = screen.getByDisplayValue(/Your Location/i);
  expect(input).toBeInTheDocument();
});

describe("when the user has a location AND a last searched location", () => {
  beforeEach(() => {
    renderUI();
  });

  it("should have the location as the value when the input isnt focused", () => {
    let input = screen.getByDisplayValue(/San Francisco/i);
    expect(input).toBeInTheDocument();
  });

  it("should NOT have the last searched location as the value when the input isn't focused", () => {
    let input = screen.queryByDisplayValue(/Oakland/i);
    expect(input).not.toBeInTheDocument();
  });

  shouldHaveEmptyStringValueWhenFocused();
  shouldDisplayLocationInput();
});

describe("when the user ONLY has a location", () => {
  beforeEach(() => {
    renderUI({
      lastSearchedLocation: { custom: undefined },
    });
  });

  it("should have the location as the value when the input isnt focused", () => {
    let input = screen.getByDisplayValue(/San Francisco/i);
    expect(input).toBeInTheDocument();
  });

  shouldHaveEmptyStringValueWhenFocused();
  shouldDisplayLocationInput();
});

describe("when the user ONLY has a last searched location", () => {
  beforeEach(() => {
    renderUI({
      location: { custom: undefined },
    });
  });

  it("should have the last searched location as the value when the input isnt focused", () => {
    let input = screen.getByDisplayValue(/Oakland/i);
    expect(input).toBeInTheDocument();
  });

  shouldHaveEmptyStringValueWhenFocused();
  shouldDisplayLocationInput();
});

describe("when the user does NOT have a location or last searched location", () => {
  beforeEach(() => {
    renderUI({
      location: { custom: undefined },
      lastSearchedLocation: { custom: undefined },
    });
  });
  it("should have an empty string as the value when the input isnt focused", () => {
    let input = screen.getByPlaceholderText(/City, State/i);
    expect(input).toHaveValue("");
  });

  shouldHaveEmptyStringValueWhenFocused();
  shouldDisplayLocationInput();
});
