import { SearchOptionTypes as T } from "../../components/Option/option.types";
import { Animal } from "../../setupTests";

export interface LocationI {
  coordinates?: {
    longitude: string | undefined;
    latitude: string | undefined;
  };
  custom?: string | number | undefined;
}

export interface DataI {
  animals: Partial<Animal>[] & [];
}

export interface StateI {
  location: LocationI;
  lastSearchedLocation: LocationI;
  distance: number;
  selectedSpecies: {
    label: string;
    value: T.SPECIES;
  };
  data: DataI;
  error: boolean;
}

export type ActionsT =
  | { type: "setLocation"; payload: LocationI }
  | { type: "setDistance"; payload: number }
  | { type: "setSelectedSpecies"; payload: StateI["selectedSpecies"] }
  | { type: "setData"; payload: StateI["data"] }
  | { type: "setError"; payload: StateI["error"] };

export interface SearchDataContextValue {
  location: StateI["location"];
  lastSearchedLocation: StateI["lastSearchedLocation"];
  distance: StateI["distance"];
  selectedSpecies: StateI["selectedSpecies"];
  data: StateI["data"];
  error: StateI["error"];
  searchDispatch: React.Dispatch<ActionsT>;
}
