import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [location, setLocation] = useState({});
  const [selectedSpecies, setSelectedSpecies] = useState("");

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
  };

  return (
    <div className="App">
      <div>Hello world!</div>
      <form>
        <select
          name="species"
          id="species"
          onChange={(e) => setSelectedSpecies(e.currentTarget.value)}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Horse">Horse</option>
          <option value="Reptile">Reptile</option>
        </select>
        <input type="text" placeholder="Search for a breed" />
        <button type="submit">Find</button>
      </form>
    </div>
  );
}

export default App;
