import { useState, useEffect } from "react";
import { OptionProps, propTypes, SearchOptionTypes as T } from "./option.types";
import Select from "react-select";
import { parseSearchOptions } from "../../utils/parseSearchOptions";

//! THIS is the interface that actually matters
// on the Option component and that the component
// directly uses!!!
interface OptionPropTypes {
  searchType: T.ALL_OPTIONS;
  label: string;
  option?: OptionProps["option"];
}

export default function Option({ searchType, option, label }: OptionPropTypes) {
  // let [options, setOptions] = useState([]);
  useEffect(() => {
    parseSearchOptions(searchType);
  }, []);

  function optionsList() {
    return parseSearchOptions(searchType, option);
  }

  return (
    <>
      <div className="w-[280px] mr-4">
        <label
          htmlFor="species"
          className="block uppercase tracking-wide text-gray-700 text-left text-base font-bold mb-2"
        >
          {label}
        </label>
        <Select
          name="species"
          id="species"
          className="block appearance-none w-full border border-gray-200 text-left text-gray-700 rounded leading-tight shadow-xs focus:outline-none focus:border-gray-500"
          options={optionsList()}
          isMulti
        />
      </div>
    </>
  );
}

Option.propTypes = propTypes;
