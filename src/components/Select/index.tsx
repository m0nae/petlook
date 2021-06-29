import React, { useContext, useEffect } from "react";
import {
  SearchDataContext,
  SearchDataContextValue,
} from "../../contexts/SearchData";
import Icon from "@iconify/react";

import pigFace from "@iconify-icons/twemoji/pig-face";
import catFace from "@iconify-icons/twemoji/cat-face";
import dogFace from "@iconify-icons/twemoji/dog-face";
import horseFace from "@iconify-icons/twemoji/horse-face";
import birdIcon from "@iconify-icons/twemoji/bird";
import rabbitFace from "@iconify-icons/noto/rabbit-face";
import hamsterIcon from "@iconify-icons/noto/hamster";
import fishIcon from "@iconify-icons/noto/fish";

import { species } from "../../utils/parseSearchOptions";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export default function Select() {
  const { selectedSpecies, setSelectedSpecies } = useContext(SearchDataContext);

  useEffect(() => {
    chooseIcon();
  }, [selectedSpecies]);

  const chooseIcon = () => {
    switch (selectedSpecies.value) {
      case "dog":
        return dogFace;
      case "cat":
        return catFace;
      case "barnyard":
        return pigFace;
      case "bird":
        return birdIcon;
      case "rabbit":
        return rabbitFace;
      case "scales, fins, & other":
        return fishIcon;
      case "horse":
        return horseFace;
      case "small & furry":
        return hamsterIcon;
      default:
        break;
    }
  };

  let parsedSpecies = species.map((animal) => {
    switch (animal) {
      case "barnyard":
        return { label: "Barnyarn Animals", value: "barnyard" };
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

  return (
    <div className="flex">
      {selectedSpecies && (
        <Icon width="3rem" icon={chooseIcon()!} className="mr-4" />
      )}
      <select
        name="species"
        className="w-[200px] border-none mr-3"
        onChange={(e) => {
          let selected = e.target.value;

          setSelectedSpecies(
            parsedSpecies.find(
              (el) => el.value === selected
            )! as unknown as SearchDataContextValue["selectedSpecies"]
          );
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
