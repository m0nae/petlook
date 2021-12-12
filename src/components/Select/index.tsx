/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import {
  SearchDataContext,
  SearchDataContextValue,
} from "../../contexts/SearchData";
import Icon from "@iconify/react";

import { parsedSpecies } from "../../utils/parsedSpecies";
import chooseIcon from "../../utils/chooseIcon";

interface SelectProps {
  className?: {
    container?: string;
    selectElement?: string;
  };
  dataCy?: string;
}

export default function Select({ className, dataCy }: SelectProps) {
  const { selectedSpecies, searchDispatch } = useContext(SearchDataContext);

  useEffect(() => {
    chooseIcon(selectedSpecies.value);
  }, [selectedSpecies]);

  let classNames = {
    container: className
      ? ["flex", className["container"]].filter(Boolean).join(" ").trim()
      : "flex",
    selectElement: className
      ? ["border-none text-xl rounded-sm pl-2 mr-3", className["selectElement"]]
          .filter(Boolean)
          .join(" ")
          .trim()
      : "border-none text-xl rounded-sm pl-2 mr-3",
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
        data-cy={dataCy}
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
        {parsedSpecies.map((animal, index) => {
          return (
            <option key={index} value={animal.value}>
              {animal.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
