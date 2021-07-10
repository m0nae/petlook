import React, { useState, useContext, ReactNode, Fragment } from "react";
import "../../index.css";
import { Menu, Transition } from "@headlessui/react";
import { LocationIcon } from "../SelectLocation";

import Option from "../../components/Option";
import Modal from "../../components/Modal";
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

export default DataFetcher(SearchPage);

// todo: FIX THIS, GIVE EVERYTHING A PROPER TYPE
// AND NOT JUST "ANY"!!!

// interface SearchComponentProps {
//   handleSearch: () => void;
// }

function SearchPage({ handleSearch, loading, ...props }: any) {
  const {
    location,
    lastSearchedLocation,
    distance,
    selectedSpecies,
    error,
    data,
    searchDispatch,
  } = useContext(SearchDataContext);
  // const [requestMade, setRequestMade] = useState(false);
  const [displayMobileSearch, setDisplayMobileSearch] = useState(false);

  // TODO: implement pagination
  // const [page, setPage] = useState(1);

  const [locationInput, setLocationInput] = useState("");
  // const [searchFilters, setSearchFilters] = useState({});
  const [selectedPetId, setSelectedPetId] = useState();
  const [isOpen, setIsOpen] = useState(false);

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
        {/* todo: give Select element an option, custom className prop */}
        <Select />
        <div
          id="location-input-container"
          className="flex w-[80%] h-[85px] rounded-md bg-white mt-[10vh] shadow-sm mb-7"
        >
          <LocationIcon customClass="h-16 w-16 self-center text-red-600 ml-3" />
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
            : "App h-full min-w-screen font-Poppins pb-10 mx-[10%]"
        }
      >
        <SearchOptionContainer>
          <div
            id="mobile-search-container"
            className="flex items-center 1135:hidden text-white text-xl h-[80px]"
          >
            <p>
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
                <Select />
              </span>
            </div>
            {/* todo: turn this into a component */}
            <div
              id="miles-filter-container"
              className="flex text-xl font-medium self-center"
            >
              <label htmlFor="miles-filter" className="hidden">
                Distance
              </label>
              <input
                id="miles-filter"
                type="number"
                value={distance}
                className="w-[120px] p-2 rounded-sm mr-3"
                onChange={(e) =>
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
            <div id="filters-container" className="flex items-center">
              <Filter />
            </div>
          </div>
        </SearchOptionContainer>

        {error ? (
          <div className="max-h-screen max-w-full">
            <p className="mt-[20vh] text-2xl text-red-600 font-medium">
              Uh oh! There was an error retrieving the data.
            </p>
          </div>
        ) : (
          <div className="grid mt-36 tablet:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xl:grid-cols-5">
            <AnimalList
              ctx={SearchDataContext}
              setSelectedPetId={setSelectedPetId}
              setIsOpen={setIsOpen}
              loading={loading}
            />
          </div>
        )}
        <Modal
          selectedPetId={selectedPetId}
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}

type SearchOptionContainerProps = {
  children: ReactNode;
};

function SearchOptionContainer({ children }: SearchOptionContainerProps) {
  return (
    <div className="absolute z-10 top-0 left-0 flex flex-col sm:flex-row flex-wrap self-center items-center justify-center mb-5 py-3 px-[4%] bg-purple-600 min-w-[100vw]">
      {children}
    </div>
  );
}

export function Filter() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-[23rem] px-0 py-4 rounded-md divide-y divide-gray-100 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Option label="Age" searchType="age" />
              </div>
              <div className="py-1 pt-3">
                <Option label="Size" searchType="size" />
              </div>
              <div className="py-1 pt-3">
                <Option label="Gender" searchType="gender" />
              </div>
              <div className="py-1 pt-3">
                <Option label="Good With" searchType="goodWith" />
              </div>
              <div className="py-1 pt-3">
                <Option label="Environment" searchType="environment" />
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

// here's the petfinder logo I can use if there's no available image for a pet
// url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 230'%3E%3Cpath fill='%23fff' d='M115 0C51.6 0 0 51.6 0 115s51.6 115 115 115 115-51.6 115-115S178.4 0 115 0zm0 209.5c-52.2 0-94.5-42.3-94.5-94.5S62.8 20.5 115 20.5c52.2.1 94.4 42.3 94.5 94.5 0 52.2-42.3 94.5-94.5 94.5z'/%3E%3Ccircle fill='%23fff' cx='147.1' cy='69.1' r='14.1'/%3E%3Cpath fill='%23fff' d='M83 151.6c15.4 0 21.9-9.2 21.9-23.9 0-6.5-5.2-12-5.2-19-.2-8.7 6.8-15.9 15.5-16h.6c9.8 0 15.9 8.3 15.9 16 0 7.4-5.2 12.3-5.2 19.1 0 14.7 6 23.8 21.8 23.8 12.8 0 19-6.9 24.7-15.7 1.9-2.9 5-5.2 8.4-5.2 5.1 0 8 3.7 8 7.7 0 9.6-16.5 31.8-41.4 31.8-8.6 0-23.3-1.8-32.2-15.7-8.2 12.6-20.7 15.7-32.1 15.7-26 0-41.6-23-41.6-31.8 0-4.2 3.4-7.7 7.6-7.7h.2c3.5.2 6.8 2.1 8.6 5.2 5.5 9 12.3 15.7 24.5 15.7z'/%3E%3C/svg%3E"),linear-gradient(180deg,#dad5de,#eae9ed)

/* <Option
                  label="Species"
                  option={{
                    optionName: "dog",
                    value: "Doggo",
                  }}
                  searchType="species"
                /> */
