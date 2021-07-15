import { SearchOptionTypes as T } from "../Option/option.types";
import { StateI } from "../../contexts/SearchData";
import { Icon } from "@iconify/react";

export type SelectionProps = {
  handleClick: (label: string, val: T.SPECIES) => void;
  text: string;
  selectionName: T.SPECIES;
  icon: { element: any; width?: string; height?: string };
  selectedSpecies: StateI["selectedSpecies"];
};

export default function Selection({
  handleClick,
  text,
  selectionName,
  icon,
  selectedSpecies,
}: SelectionProps) {
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
