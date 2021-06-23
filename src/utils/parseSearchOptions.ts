import {
  SearchOptionTypes as T,
  OptionProps,
} from "../components/Option/option.types";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const species: T.SPECIES[] = [
  "dog",
  "cat",
  "rabbit",
  "small & furry",
  "horse",
  "bird",
  "scales, fins, & other",
  "barnyard",
];
export const size: T.SIZE[] = ["small", "large"];
export const gender: T.GENDER[] = ["male", "female"];
export const age: T.AGE[] = ["young", "adult", "old"];
export const goodWith: T.GOOD_WITH[] = ["children", "dogs", "cats"];
export const environment: T.ENVIRONMENT[] = [
  "housetrained",
  "declawed",
  "special-needs",
];

export const searchOptions = {
  species,
  size,
  gender,
  age,
  goodWith,
  environment,
};

// export function changeLabel(label: PropsI['label']) {
//   if (!label) {
//     return;
//   } else {
//     return
//   }
// }

export function parseSearchOptions(
  type: T.ALL_OPTIONS,
  option?: OptionProps["option"]
) {
  if (searchOptions[type]) {
    if (option) {
      let parsedOptions = searchOptions[type].map((option: any) => {
        if (option === option.optionName) {
          option = {
            value: option.optionName,
            label: option.value,
          };

          return option;
        } else {
          //todo: make this into a function maybe???
          option = {
            value: option,
            label: capitalizeFirstLetter(option),
          };

          return option;
        }
      });

      return parsedOptions;
    } else {
      let parsedOptions = searchOptions[type].map((option: any) => {
        option = {
          value: option,
          label: capitalizeFirstLetter(option),
        };

        return option;
      });

      return parsedOptions;
    }
  }
}
