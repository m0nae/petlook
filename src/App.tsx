import React, { useEffect, useState } from "react";
// import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");

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
    let token: string | undefined = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))!
      .split("=")[1];

    e.preventDefault();
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKE}`,
      },
      url: "https://api.petfinder.com/v2/animals",
      params: {
        location: `${parseFloat(location.latitude!).toString()}, ${parseFloat(
          location.longitude!
        ).toString()}`,
      },
    })
      .then((data: any) => console.log(data))
      .catch((err: any) => {
        let cookie = document.cookie
          .split(";")
          .some((item) => item.trim().startsWith("token="));
        if (!cookie) {
          axios({
            method: "post",
            url: "https://api.petfinder.com/v2/oauth2/token",
            data: {
              grant_type: "client_credentials",
              client_id: process.env.REACT_APP_API_KEY,
              client_secret: process.env.REACT_APP_API_SECRET,
            },
          }).then((data: any) => {
            let expiry: number = data.data.expires_in;
            let accessToken: string = data.data.access_token;
            document.cookie = `token=${accessToken}; SameSite=None; max-age=${
              expiry - 100
            }; Secure`;
          });
        }
      });
  };

  return (
      <div className="App min-h-screen min-w-screen font-Poppins py-10 mx-[7%]">
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
        <button type="submit" onClick={(e) => handleSearch(e)}>
          Find
        </button>
      </form>
        <div className="grid tablet:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    </div>
      </div>
  );
}

export default App;
