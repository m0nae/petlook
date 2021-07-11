import axios, { AxiosRequestConfig } from "axios";
import { LocationI } from "../contexts/SearchData";
import { getToken } from "./authToken";
import { locationCoordinatesExist } from "./locationExists";

const parsedLocation = (location: LocationI) => {
  if (locationCoordinatesExist(location)) {
    return `${parseFloat(
      location.coordinates!.latitude!
    ).toString()}, ${parseFloat(location.coordinates!.longitude!).toString()}`;
  } else if (typeof location.custom === "number") {
    return Math.trunc(location.custom);
  } else if (typeof location.custom === "string") {
    if (location.custom.includes(",")) {
      let splitLocation = location.custom.trim().split(",");
      return `${splitLocation[0].trim()}, ${splitLocation[1].trim()}`;
    }
    return location.custom.trim().replace(/\W+/g, "-").toLowerCase();
  } else {
    return null;
  }
};

const selectedSpecies = (species: any) => {
  if (species.value === "small & furry") {
    return "small-furry";
  } else if (species.value === "scales, fins, & other") {
    return "scales-fins-other";
  } else {
    return species.value;
  }
};

export async function fetchData(
  location: LocationI,
  species: any,
  distance?: number
) {
  let token = await getToken();

  localStorage.setItem("lastSearchedLocation", JSON.stringify(location));

  if (species.label.trim() !== "" && species.value.trim() !== "") {
    localStorage.setItem("lastSearchedSpecies", JSON.stringify(species));
  }

  let options: AxiosRequestConfig = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: "https://api.petfinder.com/v2/animals",
    params: {
      location: parsedLocation(location),
      type: selectedSpecies(species),
      distance: distance ?? 100,
    },
  };

  return await axios(options);
}
