import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./authToken";

export async function fetchData(location: any) {
  let token = await getToken();

  let options: AxiosRequestConfig = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: "https://api.petfinder.com/v2/animals",
    params: {
      location: `${parseFloat(location.latitude!).toString()}, ${parseFloat(
        location.longitude!
      ).toString()}`,
    },
  };

  if (
    location.longitude &&
    location.latitude &&
    (!isNaN(location.longitude) || !isNaN(location.latitude))
  ) {
    return await axios(options);
  } else {
    let { params, ...rest } = options;
    return await axios(rest);
  }
}
