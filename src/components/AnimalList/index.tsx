import Card from "../Card";
import cryingCat from "@iconify-icons/twemoji/crying-cat";
import { Icon } from "@iconify/react";
import { DataI } from "../../contexts/SearchData";
import { Animal } from "../../setupTests";

type AnimalListProps = {
  loading: boolean;
  data: DataI;
};

export default function AnimalList({
  loading,
  data,
}: // setIsOpen,
// setSelectedPetId
AnimalListProps) {
  return (
    <>
      {loading ? (
        <div className="flex flex-col col-span-full items-center">
          <div className="loader" aria-label="loading" />
        </div>
      ) : data.animals ? (
        data.animals.length >= 1 ? (
          data.animals.map((animal: Animal) => (
            <Card
              key={animal.id}
              image={animal.photos[0]}
              name={animal.name}
              info={{
                id: animal.id,
                breed: {
                  primary: animal.breeds.primary,
                  mixed: animal.breeds.mixed,
                },
                age: animal.age,
                gender: animal.gender,
                url: animal.url,
              }}
              // setSelectedPetId={setSelectedPetId}
              // setIsOpen={setIsOpen}
            />
          ))
        ) : (
          <div className="flex flex-col col-span-full items-center">
            <Icon icon={cryingCat} className="h-12 w-12 mr-4" />
            <p className="mt-[3vh] text-2xl font-medium text-center">
              No results found.
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col col-span-full items-center">
          <p className="mt-[3vh] text-2xl font-medium text-gray-500 text-center">
            Search for a pet!
          </p>
        </div>
      )}
    </>
  );
}
