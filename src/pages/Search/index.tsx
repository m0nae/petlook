import React, {
  useState,
  useEffect,
  useContext,
  ReactNode,
  Fragment,
} from "react";
import "../../index.css";
import Option from "../../components/Option";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import Select from "../../components/Select";

import { fetchData } from "../../utils/fetchData";

import { SearchDataContext } from "../../contexts/SearchData";

import { Menu, Transition } from "@headlessui/react";

import LocationInput from "../../components/LocationInput";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface DataI {
  animals: [];
}

function SearchComponent({ handleSearch }: any) {
  const { location, distance, selectedSpecies, error, data, searchDispatch } =
    useContext(SearchDataContext);
  const [requestMade, setRequestMade] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DataI>({
    animals: [],
  });

  // TODO: implement pagination
  // const [page, setPage] = useState(1);

  const [locationInput, setLocationInput] = useState("");
  // const [searchFilters, setSearchFilters] = useState({});
  const [selectedPetId, setSelectedPetId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const parsedLastSearchLocation = JSON.parse(
    localStorage.getItem("lastSearchLocation")!,
    (key, value) => {
      if (key === "custom") {
        let parsedValue = value.trim().split(",");
        console.log(parsedValue);
        let city: string | string[] = parsedValue[0].split(" ");
        (city as string[]).forEach((word) => capitalizeFirstLetter(word));

        //  TODO: capitalize the text
        return city;
      } else {
        return value;
      }
    }
  );

  console.log(parsedLastSearchLocation);
  console.log(JSON.parse(localStorage.getItem("lastSearchLocation")!));

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
    } else {
      let lastSearchLocation = JSON.parse(
        localStorage.getItem("lastSearchLocation")!
      );
      setLocation(lastSearchLocation);
    }
  }, []);

  useEffect(() => {
    async function fetchDataWrapper() {
      //TODO: make this into a function, I copy and pasted the exact thing from below!
      await fetchData(location, selectedSpecies, distance)
        .then((res: any) => {
          setRequestMade(true);
          console.log(res);
          res = res.data;
          let data: any = {
            ...res,
            animals: res.animals.filter(
              (animal: any) => animal.status === "adoptable"
            ),
          };
          setData(data);
          setError(false);
        })
        .catch((err) => {
          setError(true);
        });
    }

    if (initialLoad) {
      fetchDataWrapper();
      setInitialLoad(false);
    }
  }, [location]);

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
      } else {
        // TODO: put this into context as well, bc it's IMMEDIATELY needed after the user leaves the location-select page and
        // goes here. It doesn't retrieve it fast enough, so just automatically store it in search data context too
        let lastSearchLocation = JSON.parse(
          localStorage.getItem("lastSearchLocation")!
        );

        if (lastSearchLocation) {
          searchDispatch({
            type: "setLocation",
            payload: lastSearchLocation.coordinates
              ? {
                  coordinates: {
                    longitude: lastSearchLocation.coordinates.longitude,
                    latitude: lastSearchLocation.coordinates.latitude,
                  },
      }
              : {
                  custom: lastSearchLocation.custom,
                },
          });
        }
      }
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    await fetchData(location, selectedSpecies, distance)
      .then((res: any) => {
        setRequestMade(true);
        console.log(res);
        res = res.data;
        let data: any = {
          ...res,
          animals: res.animals.filter(
            (animal: any) => animal.status === "adoptable"
          ),
        };
        setData(data);
        setError(false);
      })
      .catch((err) => setError(true));
  };

  const animalList = () => {
    if (data.animals.length >= 1) {
      return data.animals.map((animal: any) => (
        <Card
          key={animal.id}
          image={
            animal.photos[0]
              ? animal.photos[0].large
              : "https://via.placeholder.com/480x325"
          }
          name={animal.name}
          info={{
            id: animal.id,
            breed: `${
              animal.breeds.primary ? animal.breeds.primary : "Unknown"
            } ${animal.breeds.mixed ? "Mix" : ""}`,
            age: animal.age,
            gender: animal.gender,
          }}
          setSelectedPetId={setSelectedPetId}
          setIsOpen={setIsOpen}
        />
      ));
    } else if (data.animals.length < 1 && requestMade) {
      return "There were no results.";
    } else return;
  };

  return (
    <div className="App min-h-screen min-w-screen font-Poppins py-10 mx-[10%]">
      <form>
        <SearchOptionContainer>
          <div id="search-container" className="mr-5 flex">
            <div
              className="flex mr-1 items-center"
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-2xl font-medium ml-3">
                <Select />
              </span>
            </div>
            <div
              id="miles-filter-container"
              className="flex text-2xl font-medium self-center"
            >
              <label htmlFor="miles-filter" className="hidden">
                Distance
              </label>
              <input
                id="miles-filter"
                type="number"
                value={distance}
                onChange={(e) =>
                  searchDispatch({
                    type: "setDistance",
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex text-2xl self-center">
              near
              <span className="ml-3 mr-3 self-center font-medium">
                <LocationInput
                  defaultLocationText=""
                  handleLocationInput={handleLocationInput}
                  locationInput={locationInput}
                  className="w-[360px]"
                />
              </span>
            </div>
            <button
              type="submit"
              onClick={(e) => handleSearch(e)}
              className="px-10 py-4 bg-purple-500 font-semibold text-white text-lg rounded-md hover:bg-purple-600 transition-colors duration-150"
            >
              Search
            </button>{" "}
          </div>
          <div id="filters-container" className="flex items-center">
            <Filter />
          </div>
        </SearchOptionContainer>
      </form>
      <div className="grid tablet:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xl:grid-cols-5">
        {error ? <p>There was an error retrieving the data.</p> : animalList()}
      </div>
      <Modal
        selectedPetId={selectedPetId}
        data={data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

type SearchOptionContainerProps = {
  children: ReactNode;
};

function SearchOptionContainer({ children }: SearchOptionContainerProps) {
  return (
    <div className="md:flex justify-between items-center mb-5 px-7">
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

{
  /* <Option
                  label="Species"
                  option={{
                    optionName: "dog",
                    value: "Doggo",
                  }}
                  searchType="species"
                /> */
}
