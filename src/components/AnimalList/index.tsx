import { useContext } from "react";
import Card from "../Card";
import cryingCat from "@iconify-icons/twemoji/crying-cat";
import { SearchDataContextValue } from "../../contexts/SearchData";
import { Icon } from "@iconify/react";

// todo: give the props an actual type
interface AnimalListProps {}

export default function AnimalList({ setSelectedPetId, setIsOpen, ctx }: any) {
  const { data } = useContext(ctx);

  return (
    <>
      {data.animals.length >= 1 ? (
        data.animals.map((animal: any) => (
          <Card
            key={animal.id}
            image={
              animal.photos[0]
                ? animal.photos[0].large
                : "https://via.placeholder.com/480x325"
            }
            name={animal.name}
            info={{
              id: animal.id,
              breed: `${
                animal.breeds.primary ? animal.breeds.primary : "Unknown"
              } ${animal.breeds.mixed ? "Mix" : ""}`,
              age: animal.age,
              gender: animal.gender,
            }}
            setSelectedPetId={setSelectedPetId}
            setIsOpen={setIsOpen}
          />
        ))
      ) : (
        <div className="flex flex-col col-span-full items-center">
          <Icon icon={cryingCat} className="h-12 w-12 mr-4" />
          <p className="mt-[3vh] text-2xl font-medium text-center">
            No results found.
          </p>
        </div>
      )}
    </>
  );
}
