import { useContext } from "react";
import { SearchDataContext } from "../../contexts/SearchData";
import { Icon } from "@iconify/react";
import pigFace from "@iconify-icons/twemoji/pig-face";
import dogFace from "@iconify-icons/twemoji/dog-face";
import catFace from "@iconify-icons/twemoji/cat-face";
import horseFace from "@iconify-icons/twemoji/horse-face";
import birdIcon from "@iconify-icons/twemoji/bird";
import rabbitFace from "@iconify-icons/noto/rabbit-face";
import hamsterIcon from "@iconify-icons/noto/hamster";
import fishIcon from "@iconify-icons/noto/fish";
import { Link } from "react-router-dom";
import { SearchOptionTypes as T } from "../../components/Option/option.types";
import NavButton from "../../components/NavButton";

// todo: try putting these icons into their own file, they're
// cluttering things up

export default function SelectSpecies() {
  const { selectedSpecies, searchDispatch } = useContext(SearchDataContext);

  const nextDisabled = () => {
    return selectedSpecies.value.length <= 0;
  };

  const handleClick = (label: string, val: T.SPECIES) => {
    searchDispatch({
      type: "setSelectedSpecies",
      payload: { label, value: val },
    });
  };

  return (
    <>
      <div className="min-h-screen min-w-full bg-gradient-to-r from-purple-600 to-purple-700 font-Poppins">
        <div
          id="select-species-container"
          className="pt-[10vh] pb-[10vh] lg:pt-[20vh] mx-[10%] md:mx-[20%] max-w-screen-lg"
        >
          <h1 className="text-6xl font-semibold text-white text-center">
            Select a species
          </h1>
          <div
            id="select-species-options"
            className="flex flex-col lg:grid lg:gap-10 lg:gap-y-5 lg:grid-cols-2 mt-6"
          >
            <Selection
              selectionName="dog"
              text="Dog"
              icon={{ element: dogFace }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="cat"
              text="Cat"
              icon={{ element: catFace }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="rabbit"
              text="Rabbit"
              icon={{ element: rabbitFace }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="small & furry"
              text="Small & Furry"
              icon={{ element: hamsterIcon }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="barnyard"
              text="Barnyard"
              icon={{ element: pigFace }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="bird"
              text="Bird"
              icon={{ element: birdIcon }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="horse"
              text="Horse"
              icon={{ element: horseFace }}
              handleClick={handleClick}
            />
            <Selection
              selectionName="scales, fins, & other"
              text="Scales, Fins & Other"
              icon={{ element: fishIcon }}
              handleClick={handleClick}
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

type selectionProps = {
  handleClick: (label: string, val: T.SPECIES) => void;
  text: string;
  selectionName: T.SPECIES;
  icon: { element: any; width?: string; height?: string };
};

export function Selection({
  handleClick,
  text,
  selectionName,
  icon,
}: selectionProps) {
  const { selectedSpecies } = useContext(SearchDataContext);

  // todo: clicking the btn doesn't select the actual radio btn. change this?
  return (
    <>
      <div
        className={`transform group mb-5 lg:mb-0 flex h-24 w-full rounded-md text-2xl px-[10%] items-center font-semibold hover:cursor-pointer transition-all duration-100 ${
          selectedSpecies.value === selectionName
            ? "bg-[#55d862] text-white shadow-active translate-y-1"
            : "bg-white shadow-btn"
        }`}
        onClick={() => handleClick(text, selectionName)}
        data-testid="selection"
      >
        <Icon
          icon={icon.element}
          height="3rem"
          width="3rem"
          className="mr-[1rem] mobile:mr-[2rem] sm:mr-[4rem] ml-7 min-h-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] min-w-[2.5rem] mobile:min-h-[3rem] mobile:min-w-[3rem]"
        />{" "}
        <label
          htmlFor="selection"
          className="group-hover:cursor-pointer justify-self-center"
        >
          {text}
        </label>
        <input type="radio" className="hidden" />
      </div>
    </>
  );
}

//todo: make every HTML element's ID UNIQUE!
// i only make IDs so i can easily scan and see what
// the element is for, since the classNames are reserved
// for TailwindCSS styles
