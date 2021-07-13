import React, { useState, useContext, Fragment } from "react";
import "../../index.css";
import icon from "../../components/Icons";

import Select from "../../components/Select";
import LocationInput from "../../components/LocationInput";
import SearchButton from "../../components/SearchButton";
import AnimalList from "../../components/AnimalList";
import { DataFetcher } from "../../components/DataFetcher";

import { SearchDataContext } from "../../contexts/SearchData";
import {
  customLocationExists,
  locationCoordinatesExist,
} from "../../utils/locationExists";
import chooseIcon from "../../utils/chooseIcon";
import { Icon } from "@iconify/react";
import SearchOptions from "../../components/SearchOptions";
import DistanceInput from "../../components/DistanceInput";

export default DataFetcher(SearchPage);

// todo: FIX THIS, GIVE EVERYTHING A PROPER TYPE
// AND NOT JUST "ANY"!!!

// interface SearchComponentProps {
//   handleSearch: () => void;
// }

function SearchPage({ handleSearch, loading, ...props }: any) {
  const {
    data,
    location,
    lastSearchedLocation,
    distance,
    selectedSpecies,
    error,
    searchDispatch,
  } = useContext(SearchDataContext);

  // TODO: implement pagination
  // const [page, setPage] = useState(1);
  const [displayMobileSearch, setDisplayMobileSearch] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [setIsOpen] = useState(false);
  const [setSelectedPetId] = useState();
  // const [searchFilters, setSearchFilters] = useState({});

  const handleLocationInput = (e: any) => {
    setLocationInput(e.target.value);

    if (e.target.value.length > 0) {
      searchDispatch({
        type: "setLocation",
        payload: {
          custom:
            typeof e.target.value === "string"
              ? e.target.value.trim()
              : e.target.value,
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
  };

  return (
    <>
      <div
        id="mobile-search-overlay"
        className={
          displayMobileSearch
            ? "flex flex-col items-center justify-center z-50 min-w-[100vw] min-h-screen bg-purple-100"
            : "hidden"
        }
      >
        <span
          id="exit-mobile-search-display"
          className="absolute top-3 right-4 font-extrabold hover:cursor-pointer"
          onClick={() => setDisplayMobileSearch(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="#494352"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
              stroke="#494352"
              strokeWidth="1.6px"
            />
          </svg>
        </span>
        <div
          id="species-and-distance"
          className="flex flex-col mobile:flex-row items-center mobile:w-[80%]"
        >
          <Select
            className={{
              container: "w-[80%]",
              selectElement: "w-full py-4 md:text-xl rounded-md shadow-sm",
            }}
          />
          <div
            id="miles-filter-container-mobile"
            className="flex items-center text-xl font-medium self-center mt-3 shadow-sm mobile:mt-0"
          >
            <DistanceInput
              className="w-[73vw] max-w-[345px] mobile:max-w-[160px] mobile:w-[35vw] py-4 pl-6 text-2xl rounded-md"
              distance={distance}
              onChange={(e: any) =>
                searchDispatch({
                  type: "setDistance",
                  payload: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div
          id="location-input-container"
          className="flex w-[80%] h-[85px] rounded-md bg-white mt-[7vh] shadow-sm mb-7"
        >
          <icon.location customClass="h-16 w-16 self-center text-red-600 ml-3" />
          <LocationInput
            locationInput={locationInput}
            handleLocationInput={handleLocationInput}
            defaultLocationText="Your Location"
            className="text-3xl text-[#494352] font-medium w-full h-full ml-4 rounded-md rounded-l-none"
          />
        </div>
        <SearchButton
          type="submit"
          onClick={() => {
            handleSearch();
            setDisplayMobileSearch(false);
          }}
          className="py-7 w-[80%] text-3xl"
        >
          Search
        </SearchButton>{" "}
      </div>
      <div
        className={
          displayMobileSearch
            ? "hidden"
            : "App h-full min-w-screen font-Poppins pb-10 mx-[5%] sm:mx-[10%] max-w-screen-2xl 2xl:mx-auto 2xl:my-0"
        }
      >
        <SearchOptions>
          <div
            id="mobile-search-container"
            className="flex items-center 1135:hidden text-white text-xl h-[80px]"
          >
            <p>
              <Icon
                width="3rem"
                className="inline-block mr-3"
                icon={chooseIcon(selectedSpecies.value)}
              />
              {selectedSpecies.label.length > 0
                ? selectedSpecies.label
                : "Dogs"}{" "}
              {distance} miles near{" "}
              {/* turn the below code into a fn. I use it twice, in here *and* in locationInput */}
              {locationInput.length > 0
                ? locationInput
                : locationCoordinatesExist(location)
                ? "Your Location"
                : customLocationExists(location)
                ? `${location.custom}`
                : lastSearchedLocation &&
                  customLocationExists(lastSearchedLocation)
                ? `${lastSearchedLocation.custom}`
                : ""}
            </p>
            <span
              id="pencil-icon"
              className="hover:cursor-pointer ml-3"
              onClick={() => setDisplayMobileSearch(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </span>
          </div>
          <div id="top-search-container" className="hidden 1135:flex">
            <div
              className="flex mr-1 items-center"
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-2xl font-medium ml-3">
                <Select
                  className={{
                    selectElement:
                      "w-[200px] bg-purple-600 text-white focus-within:text-black focus-within:bg-white",
                  }}
                />
              </span>
            </div>
            <div
              id="miles-filter-container"
              className="flex text-xl font-medium self-center"
            >
              <DistanceInput
                distance={distance}
                onChange={(e: any) =>
                  searchDispatch({
                    type: "setDistance",
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div id="middle-search-container">
            <div className="hidden 1135:flex text-xl self-center text-white items-center">
              near
              <span className="ml-3 mr-3 self-center font-medium text-black">
                <LocationInput
                  defaultLocationText="Your Location"
                  handleLocationInput={handleLocationInput}
                  locationInput={locationInput}
                  className="w-[360px] rounded-sm p-2"
                />
              </span>
            </div>
          </div>
          <div id="bottom-search-container" className="hidden 1135:flex">
            <SearchButton
              onClick={() => handleSearch()}
              className="py-3 text-lg mr-4"
            >
              Search
            </SearchButton>{" "}
            {/* <div id="filters-container" className="flex items-center">
              <Filter />
            </div> */}
          </div>
        </SearchOptions>

        {error ? (
          <div className="max-h-screen max-w-full">
            <p className="mt-[20vh] text-2xl text-red-600 font-medium">
              Uh oh! There was an error retrieving the data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 mt-36 tablet:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 xl:grid-cols-5 2xl:mx-10">
            <AnimalList
              data={data}
              setSelectedPetId={setSelectedPetId}
              setIsOpen={setIsOpen}
              loading={loading}
            />
          </div>
        )}
        {/* <Modal
          selectedPetId={selectedPetId}
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        /> */}
      </div>
    </>
  );
}

/* <Option
                  label="Species"
                  option={{
                    optionName: "dog",
                    value: "Doggo",
                  }}
                  searchType="species"
                /> */
