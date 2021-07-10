import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export function parseLocation(str: any) {
  if (str.length > 2 && str.includes(",")) {
    let parsedValue = str.trim().split(",");

    let city: string | string[] = capitalizeFirstLetter(parsedValue[0].trim());

    let state: string | string[] = parsedValue[1]
      .trim()
      .split("")
      .map((letter: string) => capitalizeFirstLetter(letter))
      .join("");

    return `${city}, ${state}`;
  } else if (str.length > 2 && !str.includes(",")) {
    let state = capitalizeFirstLetter(str.trim());

    return state;
  } else if (str.length === 2) {
    let parsedValue = str.trim().split("");

    let state = parsedValue
      .map((letter: string) => capitalizeFirstLetter(letter))
      .join("");

    return state;
  } else {
    return str;
  }
}
