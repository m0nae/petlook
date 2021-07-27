import { useContext } from "react";
import {
  SearchDataContext,
  SearchDataContextValue,
} from "../../contexts/SearchData";
import Selection from "../../components/Selection";
import { SearchOptionTypes as T } from "../../components/Option/option.types";
import { parsedSpecies } from "../../utils/parsedSpecies";

import icon from "../../components/Icons";

import NavButton from "../../components/NavButton";

export default function SelectSpecies() {
  const { selectedSpecies, searchDispatch } = useContext(SearchDataContext);

  const nextDisabled = () => {
    return selectedSpecies.value.length <= 0;
  };

  // used parsedSpecies so that the pluralized version
  // of the species is used as the "label"
  // for the selectedSpecies state
  const handleClick = (label: string, val: T.SPECIES) => {
    searchDispatch({
      type: "setSelectedSpecies",
      payload: parsedSpecies.find(
        (el) => el.value === val
      )! as unknown as SearchDataContextValue["selectedSpecies"],
    });
  };

  return (
    <>
      <div className="min-h-screen min-w-full bg-gradient-to-r from-purple-600 to-purple-700 font-Poppins">
        <div
          id="select-species-container"
          className="pt-[10vh] pb-[10vh] lg:pt-[20vh] mx-[10%] md:mx-[20%] 2xl:mx-auto max-w-screen-lg"
        >
          <h1 className="text-6xl font-semibold text-white text-center">
            Choose a Species
          </h1>
          <div
            id="select-species-options"
            className="flex flex-col lg:grid lg:gap-10 lg:gap-y-5 lg:grid-cols-2 mt-6"
          >
            <Selection
              selectionName="dog"
              text="Dog"
              icon={{ element: icon.dog }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="cat"
              text="Cat"
              icon={{ element: icon.cat }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="rabbit"
              text="Rabbit"
              icon={{ element: icon.rabbit }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="small & furry"
              text="Small & Furry"
              icon={{ element: icon.hamster }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="barnyard"
              text="Barnyard"
              icon={{ element: icon.pig }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="bird"
              text="Bird"
              icon={{ element: icon.bird }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="horse"
              text="Horse"
              icon={{ element: icon.horse }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
            <Selection
              selectionName="scales, fins, & other"
              text="Scales, Fins & Other"
              icon={{ element: icon.fish }}
              handleClick={handleClick}
              selectedSpecies={selectedSpecies}
            />
          </div>
          <div id="nav-btn-container" className="flex justify-between mt-5">
            <NavButton to="/" direction="back">
              Back
            </NavButton>
            <NavButton
              to="/select-location"
              direction="forward"
              disabled={nextDisabled()}
            >
              Next
            </NavButton>
          </div>
        </div>
      </div>
    </>
  );
}
