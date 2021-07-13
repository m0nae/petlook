import PropTypes from "prop-types";
import {
  species,
  size,
  gender,
  age,
  goodWith,
  environment,
} from "../../utils/parseSearchOptions";

export namespace SearchOptionTypes {
  export type SPECIES =
    | "dog"
    | "cat"
    | "rabbit"
    | "small & furry"
    | "horse"
    | "bird"
    | "scales, fins, & other"
    | "barnyard";

  export type SIZE = "small" | "large";
  export type GENDER = "male" | "female";
  export type AGE = "young" | "adult" | "old";
  export type GOOD_WITH = "children" | "dogs" | "cats";
  export type ENVIRONMENT = "housetrained" | "declawed" | "special-needs";
  export type ALL_OPTIONS =
    | "species"
    | "size"
    | "gender"
    | "age"
    | "goodWith"
    | "environment";
  export type ALL_OPTIONS_TYPE =
    | SIZE
    | GENDER
    | AGE
    | SPECIES
    | GOOD_WITH
    | ENVIRONMENT;
}

export type OptionProps = {
  searchType: string;
  label: string;
  option: {
    optionName:
      | SearchOptionTypes.SPECIES
      | SearchOptionTypes.SIZE
      | SearchOptionTypes.GENDER
      | SearchOptionTypes.AGE
      | SearchOptionTypes.GOOD_WITH
      | SearchOptionTypes.ENVIRONMENT;
    value: string | (() => string);
  };
};

export interface OptionPropTypes {
  searchType: SearchOptionTypes.ALL_OPTIONS;
  label: string;
  option?: OptionProps["option"];
}

export const propTypes = {
  searchType: PropTypes.oneOf<SearchOptionTypes.ALL_OPTIONS>([
    "species",
    "size",
    "gender",
    "age",
    "goodWith",
    "environment",
  ]).isRequired,
  label: PropTypes.shape({
    optionName: PropTypes.oneOf<
      | SearchOptionTypes.SPECIES
      | SearchOptionTypes.SIZE
      | SearchOptionTypes.GENDER
      | SearchOptionTypes.AGE
      | SearchOptionTypes.GOOD_WITH
      | SearchOptionTypes.ENVIRONMENT
    >([...species, ...size, ...gender, ...age, ...goodWith, ...environment])
      .isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  }),
};
