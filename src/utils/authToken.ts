import axios from "axios";

export function tokenExists() {
  if (
    !document.cookie ||
    !document.cookie.split("; ").find((row) => row.startsWith("token="))
  ) {
    return false;
  } else {
    return true;
  }
}

export async function getToken() {
  if (tokenExists()) {
    let token: string = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))!
      .split("=")[1];

    return token;
  } else {
    await setToken(tokenExists);

    let token: string = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))!
      .split("=")[1];

    return token;
  }
}

async function setToken(tokenExists: () => boolean) {
  // is this existence check necessary?
  if (!tokenExists()) {
    await axios({
      method: "post",
      url: "https://api.petfinder.com/v2/oauth2/token",
      data: {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_API_KEY,
        client_secret: process.env.REACT_APP_API_SECRET,
      },
    })
      .then((data) => {
        let expiry: number = data.data.expires_in;
        let accessToken: string = data.data.access_token;
        document.cookie = `token=${accessToken}; SameSite=Lax; max-age=${
          expiry - 100
        }`;
      })
      .catch((err) => {
        throw Error(err);
      });
  }
}
