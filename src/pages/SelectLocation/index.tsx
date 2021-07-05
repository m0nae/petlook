import { useState, useEffect, useContext } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import { Link } from "react-router-dom";
import LocationInput from "../../components/LocationInput";

export default function SelectLocation() {
  const { location, setLocation } = useContext(SearchDataContext);
  const [locationInput, setLocationInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    let userLocation = {
      longitude: localStorage.getItem("longitude"),
      latitude: localStorage.getItem("latitude"),
    };

    if (userLocation.longitude && userLocation.latitude) {
      setLocation({
        coordinates: {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
        },
      });
    }
  }, []);

  const nextDisabled = () => {
    if (locationInput.length > 0) {
      return false;
    } else if (
      location.coordinates &&
      location.coordinates.longitude !== undefined &&
      location.coordinates.latitude !== undefined
    ) {
      return false;
    } else if (location.custom !== undefined && location.custom !== "") {
      return false;
    } else {
      return true;
    }
  };

  const handleLocationInput = (e: any) => {
    setLocationInput(e.target.value);

    if (e.target.value.length > 0) {
      setLocation({
        custom:
          typeof e.target.value === "string"
            ? e.target.value.trim()
            : e.target.value,
      });
    } else {
      let userLocation = {
        longitude: localStorage.getItem("longitude"),
        latitude: localStorage.getItem("latitude"),
      };

      if (userLocation.longitude && userLocation.latitude) {
        setLocation({
          coordinates: {
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
          },
        });
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen min-w-full bg-gradient-to-r from-purple-600 to-purple-700 font-Poppins">
        <div id="select-location-container" className="pt-[20vh] mx-[20%]">
          <h1 className="text-6xl font-semibold text-white text-center">
            Choose a Location
          </h1>
          <div className="flex justify-center mt-7">
            <div
              id="location-input-container"
              className="flex w-[80%] h-[85px] rounded-md bg-white mt-[10vh]"
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
            id="location-nav-container"
            className="absolute w-[60%] bottom-[17.4vh]"
          >
            <div className="flex justify-between">
              <Link
                to="/select-species"
                className="px-20 py-4 bg-blue-500 font-semibold text-white text-2xl rounded-md"
              >
                Back
              </Link>
              {nextDisabled() ? (
                <button className="px-20 py-4 hover:cursor-default bg-gray-400 font-semibold text-white text-2xl rounded-md">
                  Next
                </button>
              ) : (
                <Link
                  to="/search"
                  className="px-20 py-4 bg-blue-500 font-semibold text-white text-2xl rounded-md"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface LocationIconProps {
  customClass: string;
}

function LocationIcon({ customClass }: LocationIconProps) {
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
