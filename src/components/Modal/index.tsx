import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes, { InferProps } from "prop-types";
export default function Modal({
  isOpen,
  setIsOpen,
  selectedPetId,
  data,
}: InferProps<typeof Modal.propTypes>) {
  const [currentPet, setCurrentPet] = useState<any>({});
  let { name, species, age, gender, photos, breeds } = currentPet[0] ?? {};

  useEffect(() => {
    setCurrentPet(
      data.animals
        ? data.animals?.filter((animal) => animal.id === selectedPetId)
        : []
    );
  }, [selectedPetId, data]);

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div
        id="overlay"
        className="fixed inset-0 bg-black opacity-70 z-50"
        onClick={() => setIsOpen(false)}
      />
      <div
        id="modal"
        className="transform -translate-x-1/2 -translate-y-1/2 z-[100] fixed top-[50%] left-[50%] h-[400px] w-[90%] max-w-[550px] bg-white rounded-xl"
      >
        <div id="modal-container" className="flex flex-col m-3">
          <img
            src={
              photos &&
              (photos[0]
                ? photos[0].large
                : "https://www.freeiconspng.com/uploads/no-image-icon-8.png")
            }
            alt="Pet"
            className="object-cover max-h-[30vh] md:max-h-[200px] rounded-md"
          />
          <div id="modal-pet-info" className="">
            <h2 className="text-xl font-bold">{name}</h2>
            {/* <p>{species && species}</p> */}
            <p>
              {breeds &&
                `${breeds.primary ? breeds.primary : "Unknown"} ${
                  breeds.mixed ? "Mix" : ""
                }`}{" "}
              * {age && age}
            </p>
            <p>{gender && gender} * {} * {}</p>
            <button onClick={() => setIsOpen(false)}>Close modal</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedPetId: PropTypes.number,
  data: PropTypes.shape({
    animals: PropTypes.array,
  }).isRequired,
};
