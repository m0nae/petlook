import { useEffect } from "react";
import Select from "react-select";
import { OptionPropTypes, propTypes } from "./option.types";
import { parseSearchOptions } from "../../utils/parseSearchOptions";

export default function Option({ searchType, option, label }: OptionPropTypes) {
  useEffect(() => {
    parseSearchOptions(searchType);
  }, [searchType]);

  function optionsList() {
    return parseSearchOptions(searchType, option);
  }

  return (
    <>
      <div className="w-[300px] mb-4 ml-6">
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
