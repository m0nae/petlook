import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { species } from "./parseSearchOptions";

export let parsedSpecies = species.map((animal) => {
  switch (animal) {
    case "barnyard":
      return { label: "Barnyard Animals", value: "barnyard" };
    case "small & furry":
      return {
        label: "Small & Furries",
        value: "small & furry",
      };
    case "scales, fins, & other":
      return {
        label: "Scales, Fins, & Others",
        value: "scales, fins, & other",
      };
    default:
      break;
  }

  let str = capitalizeFirstLetter(animal)!.split("");
  str.push("s");
  let val = str.join("");

  return {
    label: val,
    value: animal,
  };
});
