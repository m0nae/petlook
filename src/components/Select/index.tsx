/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import {
  SearchDataContext,
  SearchDataContextValue,
} from "../../contexts/SearchData";
import Icon from "@iconify/react";

import { parsedSpecies } from "../../utils/parsedSpecies";
import chooseIcon from "../../utils/chooseIcon";

export default function Select({ className }: any) {
  const { selectedSpecies, searchDispatch } = useContext(SearchDataContext);

  useEffect(() => {
    chooseIcon(selectedSpecies.value);
  }, [selectedSpecies]);

  let classNames = {
    container: className
      ? ["flex", className["container"]].filter(Boolean).join(" ").trim()
      : "flex",
    selectElement: className
      ? [
          "border-none text-xl rounded-sm pl-2 mr-3 bg-purple-600 text-white focus-within:text-black focus-within:bg-white",
          className["selectElement"],
        ]
          .filter(Boolean)
          .join(" ")
          .trim()
      : "border-none text-xl rounded-sm pl-2 mr-3 bg-purple-600 text-white focus-within:text-black focus-within:bg-white",
  };

  return (
    <div className={classNames["container"]}>
      {selectedSpecies && (
        <Icon
          width="3rem"
          icon={chooseIcon(selectedSpecies.value)!}
          className="mr-4"
        />
      )}
      <select
        name="species"
        className={classNames["selectElement"]}
        onChange={(e) => {
          let selected = e.target.value;

          searchDispatch({
            type: "setSelectedSpecies",
            payload: parsedSpecies.find(
              (el) => el.value === selected
            )! as unknown as SearchDataContextValue["selectedSpecies"],
          });
        }}
        defaultValue={selectedSpecies.value}
      >
        {parsedSpecies.map((animal) => {
          return <option value={animal.value}>{animal.label}</option>;
        })}
      </select>
    </div>
  );
}
