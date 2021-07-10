import { useContext, useState } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import {
  customLocationExists,
  locationCoordinatesExist,
} from "../../utils/locationExists";

interface LocationInputProps {
  locationInput: string;
  handleLocationInput: (e: any) => void;
  defaultLocationText: string;
  className: string;
}

export default function LocationInput({
  locationInput,
  handleLocationInput,
  defaultLocationText,
  className,
}: LocationInputProps) {
  const { location, lastSearchedLocation } = useContext(SearchDataContext);
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
          ? defaultLocationText
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
      className={className}
    />
  );
}
