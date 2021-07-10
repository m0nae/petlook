import React, { createContext, useReducer } from "react";
import { SearchOptionTypes as T } from "../../components/Option/option.types";
import { StateI, ActionsT, SearchDataContextValue } from "./searchData.types";

export * from "./searchData.types";

export const SearchDataContext = createContext(
  undefined as unknown as SearchDataContextValue
);

const initialState: StateI = {
  location: {
    coordinates: {
      longitude: undefined,
      latitude: undefined,
    },
    custom: undefined,
  },
  distance: 100,
  selectedSpecies: {
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
        distance: Number(action.payload),
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
