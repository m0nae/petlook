import { useState, useEffect, useContext } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import { Link } from "react-router-dom";
import LocationInput from "../../components/LocationInput";
import { locationExists } from "../../utils/locationExists";
import NavButton from "../../components/NavButton";

export default function SelectLocation() {
  const { location, searchDispatch } = useContext(SearchDataContext);
  const [locationInput, setLocationInput] = useState("");

  // todo: should this go in the DataFetcher HOC?
  useEffect(() => {
    let userLocation = {
      longitude: localStorage.getItem("longitude"),
      latitude: localStorage.getItem("latitude"),
    };

    if (userLocation.longitude && userLocation.latitude) {
      searchDispatch({
        type: "setLocation",
        payload: {
          coordinates: {
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
          },
        },
      });
    }
  }, []);

  const nextDisabled = () => {
    if (locationInput.length > 0) {
      return false;
    } else if (locationExists(location)) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (locationInput.length > 0) {
      searchDispatch({
        type: "setLocation",
        payload: {
          custom:
            typeof locationInput === "string"
              ? locationInput.trim()
              : locationInput,
        },
      });
    } else {
      let userLocation = {
        longitude: localStorage.getItem("longitude"),
        latitude: localStorage.getItem("latitude"),
      };

      if (userLocation.longitude && userLocation.latitude) {
        searchDispatch({
          type: "setLocation",
          payload: {
            coordinates: {
              longitude: userLocation.longitude,
              latitude: userLocation.latitude,
            },
          },
        });
      }
    }
  }, [locationInput]);

  const handleLocationInput = (e: any) => {
    setLocationInput(e.target.value);
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-screen min-w-full bg-gradient-to-r from-purple-600 to-purple-700 font-Poppins">
        <div
          id="select-location-container"
          className="max-w-screen-lg w-[83%] md:w-[70%] lg:w-[80%]"
        >
          <h1 className="text-5xl sm:text-6xl font-semibold text-white text-center">
            Choose a Location
          </h1>
          <div className="flex justify-center sm:mt-4">
            <div
              id="location-input-container"
              className="flex w-full lg:w-[80%] h-[85px] rounded-md bg-white mt-[7vh]"
            >
              <LocationIcon customClass="h-16 w-16 self-center text-red-600 ml-3" />
              <LocationInput
                locationInput={locationInput}
                handleLocationInput={handleLocationInput}
                defaultLocationText="Your Location"
                className="text-3xl font-medium w-full h-full ml-4 rounded-md rounded-l-none"
              />
            </div>
          </div>
          <div
            id="nav-btn-container"
            className="flex relative top-11 justify-between my-0 mx-auto justify-self-center mt-5 lg:w-[80%]"
          >
            <NavButton to="/select-species" direction="back">
              Back
            </NavButton>
            <NavButton
              to="/search"
              direction="forward"
              disabled={nextDisabled()}
            >
              Next
            </NavButton>
          </div>
        </div>
      </div>
    </>
  );
}

interface LocationIconProps {
  customClass: string;
}

export function LocationIcon({ customClass }: LocationIconProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={customClass}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
}
