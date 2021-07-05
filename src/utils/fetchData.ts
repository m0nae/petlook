import axios, { AxiosRequestConfig } from "axios";
import { LocationI } from "../contexts/SearchData";
import { getToken } from "./authToken";

// maybe have this entire thing be a default export
// and then have the functions WITHIN it be individ
// exports, just so this whole thing can be
// more modular and easier to test
// todo: make into a default export & export methods inside
export async function fetchData(
  location: LocationI,
  species: any,
  distance?: number
) {
  if (
    location === null ||
    location === undefined ||
    JSON.stringify(location.coordinates!) === "{}" ||
    (location.custom as string) === ""
  ) {
    return;
  }

  let token = await getToken();

  localStorage.setItem("lastSearchLocation", JSON.stringify(location));

  const parsedLocation = () => {
    if (
      location.coordinates &&
      location.coordinates.longitude &&
      location.coordinates.latitude
    ) {
      return `${parseFloat(
        location.coordinates!.latitude!
      ).toString()}, ${parseFloat(
        location.coordinates!.longitude!
      ).toString()}`;
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

  const selectedSpecies = () => {
    if (species.value === "small & furry") {
      return "small-furry";
    } else if (species.value === "scales, fins, & other") {
      return "scales-fins-other";
    } else {
      return species.value;
    }
  };

  let options: AxiosRequestConfig = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: "https://api.petfinder.com/v2/animals",
    params: {
      location: parsedLocation(),
      type: selectedSpecies(),
      distance: distance ?? 100,
    },
  };

  return await axios(options);
}
