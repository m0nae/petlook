import React, {
  ReactChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { fetchData } from "./utils/fetchData";
import Card from "./components/Card";

interface LocationI {
  longitude: string | null;
  latitude: string | null;
}

interface DataI {
  animals: [];
}

function App() {
  const [data, setData] = useState<DataI>({
    animals: [],
  });
  const [location, setLocation] = useState<LocationI>({
    longitude: null,
    latitude: null,
  });
  // the default is set to Dog because the select element's "default" selection is Dog
  const [selectedSpecies, setSelectedSpecies] = useState("Dog");

  useEffect(() => {
    let userLocation = {
      longitude: localStorage.getItem("longitude"),
      latitude: localStorage.getItem("latitude"),
    };

    if (!userLocation.longitude || !userLocation.latitude) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let coordinates = pos.coords;
        setLocation({
          longitude: coordinates.longitude.toString(),
          latitude: coordinates.latitude.toString(),
        });
        window.localStorage.setItem(
          "longitude",
          coordinates.longitude.toString()
        );
        window.localStorage.setItem(
          "latitude",
          coordinates.latitude.toString()
        );
      });
    } else {
      setLocation(userLocation);
    }
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchData(location)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  };

  
  const animalList = () => {
    if (data.animals.length > 1) {
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
            breed: `${
              animal.breeds.primary ? animal.breeds.primary : "Unknown"
            } ${animal.breeds.mixed ? "Mix" : ""}`,
            age: animal.age,
            gender: animal.gender,
          }}
          setIsOpen={setIsOpen}
        />
      ));
    } else {
      return "Nothing here yet";
        }
  };

  return (
      <div className="App min-h-screen min-w-screen font-Poppins py-10 mx-[7%]">
      <form>
          <SearchOptionContainer>
            <Option
              label="Species"
              option={{
                optionName: "dog",
                value: "Doggo",
              }}
              searchType="species"
            />
            <Option label="Age" searchType="age" />
            <Option label="Size" searchType="size" />
            <Option label="Gender" searchType="gender" />
            <Option label="Good With" searchType="goodWith" />
            <Option label="Environment" searchType="environment" />
            <RangeSlider />
          </SearchOptionContainer>
        <input type="text" placeholder="Search for a breed" />
        <button type="submit" onClick={(e) => handleSearch(e)}>
          Find
        </button>
      </form>
        <div className="grid tablet:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {animalList()}
    </div>
      </div>
  );
}

type SearchOptionContainerProps = {
  children: ReactNode;
};

function SearchOptionContainer({ children }: SearchOptionContainerProps) {
  return <div className="md:flex">{children}</div>;
}

export default App;
