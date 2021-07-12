import React, { createContext, useReducer } from "react";
import { SearchOptionTypes as T } from "../../components/Option/option.types";
import { parseLocation } from "../../utils/parseLocation";
import { StateI, ActionsT, SearchDataContextValue } from "./searchData.types";

export * from "./searchData.types";

export const SearchDataContext = createContext(
  undefined as unknown as SearchDataContextValue
);

const lastSearchedLocation = JSON.parse(
  localStorage.getItem("lastSearchedLocation")!,
  (key, value) => {
    if (key === "custom" && typeof value === "string") {
      return parseLocation(value);
    } else {
      return value;
    }
  }
);

const lastSearchedSpecies = JSON.parse(
  localStorage.getItem("lastSearchedSpecies")!
);

let userLocation = {
  longitude: localStorage.getItem("longitude")
    ? localStorage.getItem("longitude")!
    : undefined,
  latitude: localStorage.getItem("latitude")
    ? localStorage.getItem("latitude")!
    : undefined,
};

// if lastSearchedSpecies exist, use it as initial state. if not, use the regular ol
// selectedSpecies default. SAME EXACT logic as the lastSearchedLocation!!!

const initialState: StateI = {
  location: {
    coordinates:
      userLocation.longitude && userLocation.latitude
        ? userLocation
        : {
            longitude: undefined,
            latitude: undefined,
          },
    custom: undefined,
  },
  lastSearchedLocation,
  distance: 100,
  selectedSpecies: lastSearchedSpecies ?? {
    label: "",
    value: "" as T.SPECIES,
  },
  data: {
    animals: undefined,
  },
  error: false,
};

function reducer(state: typeof initialState, action: ActionsT): StateI {
  switch (action.type) {
    case "setLocation":
      return {
        ...state,
        location: action.payload,
      };

    case "setDistance":
      return {
        ...state,
        distance:
          action.payload < 0
            ? 0
            : action.payload > 500
            ? 500
            : Number(action.payload),
      };

    case "setSelectedSpecies":
      return {
        ...state,
        selectedSpecies: action.payload,
      };

    case "setData":
      return {
        ...state,
        data: action.payload,
      };

    case "setError":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function SearchDataProvider(props: any) {
  const [searchState, searchDispatch] = useReducer(reducer, initialState);
  const { location, distance, selectedSpecies, data, error } = searchState;

  return (
    <SearchDataContext.Provider
      value={{
        location,
        lastSearchedLocation,
        distance,
        selectedSpecies,
        data,
        error,
        searchDispatch,
      }}
    >
      {props.children}
    </SearchDataContext.Provider>
  );
}
