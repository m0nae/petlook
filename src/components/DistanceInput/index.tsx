import { FormEventHandler } from "react";

interface ClassNameI {
  container?: string;
  inputElement?: string;
}

type DistanceInputProps = {
  distance: number;
  onChange: FormEventHandler;
  className: ClassNameI;
  width: string;
  dataCy?: string;
};

export default function DistanceInput({
  distance,
  onChange,
  className,
  width,
  dataCy
}: DistanceInputProps) {
  let classNames = {
    container: className
      ? [
          "flex bg-white items-center relative p-2",
          className["container"],
          width,
        ]
          .filter(Boolean)
          .join(" ")
          .trim()
      : `flex bg-white items-center relative p-2 ${width ?? ""}`,
    inputElement: className
      ? ["w-full rounded-sm", className["inputElement"]]
          .filter(Boolean)
          .join(" ")
          .trim()
      : "w-full rounded-sm",
  };

  return (
    <>
      <label htmlFor="miles-filter" className="hidden">
        Distance
      </label>
      <div className={classNames["container"]}>
        <input
          id="miles-filter"
          data-cy={dataCy}
          type="number"
          min="0"
          max="500"
          value={distance}
          className={classNames["inputElement"]}
          onChange={onChange}
        />
        <span className="absolute font-normal right-7">miles</span>
      </div>
    </>
  );
}
