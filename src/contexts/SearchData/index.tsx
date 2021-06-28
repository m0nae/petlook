import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { SearchOptionTypes as T } from "../../components/Option/option.types";

export interface SearchDataContextValue {
  location: LocationI;
  setLocation: Dispatch<SetStateAction<LocationI>>;
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  selectedSpecies: {
    label: string;
    value: T.SPECIES;
  };
  setSelectedSpecies: React.Dispatch<
    React.SetStateAction<SearchDataContextValue["selectedSpecies"]>
  >;
}

export const SearchDataContext = createContext(
  undefined as unknown as SearchDataContextValue
);

export interface LocationI {
  coordinates?: {
    longitude: string | undefined;
    latitude: string | undefined;
  };
  custom?: string | number | undefined;
}

export function SearchDataProvider(props: any) {
  const [location, setLocation] = useState<LocationI>({
    coordinates: {
      longitude: undefined,
      latitude: undefined,
    },
    custom: undefined,
  });
  const [distance, setDistance] = useState(100);
  const [selectedSpecies, setSelectedSpecies] = useState({
    label: "",
    value: "",
  } as unknown as SearchDataContextValue["selectedSpecies"]);

  return (
    <SearchDataContext.Provider
      value={{
        location,
        setLocation,
        distance,
        setDistance,
        selectedSpecies,
        setSelectedSpecies,
      }}
    >
      {props.children}
    </SearchDataContext.Provider>
  );
}
