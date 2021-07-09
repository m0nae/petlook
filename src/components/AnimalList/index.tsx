import { useContext } from "react";
import Card from "../Card";
import { SearchDataContextValue } from "../../contexts/SearchData";

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
        <p className="mt-[3vh] text-2xl font-medium col-span-full">
          There are no results.
        </p>
      )}
    </>
  );
}
