import { SyntheticEvent, useState } from "react";
import { LocationI } from "../../contexts/SearchData";
import {
  customLocationExists,
  locationCoordinatesExist,
} from "../../utils/locationExists";

export interface LocationInputProps {
  locationInput: string;
  location: LocationI;
  lastSearchedLocation: LocationI;
  handleLocationInput: (e: SyntheticEvent) => void;
  className: string;
}

export default function LocationInput({
  locationInput,
  handleLocationInput,
  location,
  lastSearchedLocation,
  className,
}: LocationInputProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <input
      type="text"
      value={
        locationInput.length > 0
          ? locationInput
          : location && customLocationExists(location) && !isInputFocused
          ? `${location.custom}`
          : location && locationCoordinatesExist(location) && !isInputFocused
          ? "Your Location"
          : lastSearchedLocation &&
            customLocationExists(lastSearchedLocation) &&
            !isInputFocused
          ? lastSearchedLocation.custom
          : ""
      }
      onChange={(e) => handleLocationInput(e)}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      placeholder="City, State; State; or Zip Code"
      data-cy="location-input"
      className={className}
    />
  );
}
