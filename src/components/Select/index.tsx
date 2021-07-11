/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import {
  SearchDataContext,
  SearchDataContextValue,
} from "../../contexts/SearchData";
import Icon from "@iconify/react";
import icon from "../Icons";

import { parsedSpecies } from "../../utils/parsedSpecies";

export default function Select() {
  const { selectedSpecies, searchDispatch } = useContext(SearchDataContext);

  useEffect(() => {
    chooseIcon();
  }, [selectedSpecies]);

  const chooseIcon = () => {
    switch (selectedSpecies.value) {
      case "dog":
        return icon.dog;
      case "cat":
        return icon.cat;
      case "barnyard":
        return icon.pig;
      case "bird":
        return icon.bird;
      case "rabbit":
        return icon.rabbit;
      case "scales, fins, & other":
        return icon.fish;
      case "horse":
        return icon.horse;
      case "small & furry":
        return icon.hamster;
      default:
        return icon.dog;
    }
  };

  return (
    <div className="flex">
      {selectedSpecies && (
        <Icon width="3rem" icon={chooseIcon()!} className="mr-4" />
      )}
      <select
        name="species"
        className="w-[200px] border-none text-xl rounded-sm pl-2 mr-3 bg-purple-600 text-white focus-within:text-black focus-within:bg-white"
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
