import PropTypes, { InferProps } from "prop-types";

export default function Card({
  image,
  name,
  info,
  setIsOpen,
  setSelectedPetId,
}: InferProps<typeof Card.propTypes>) {
  let { breed } = info;

  if (!breed || breed === undefined) {
    breed = "Unknown";
    info = {
      ...info,
      breed,
    };
  }

  const handleClick = () => {
    setSelectedPetId(info.id);
    setIsOpen(true);
  };

  return (
    <>
      <div className="p-2 hover:cursor-pointer" onClick={() => handleClick()}>
        <div className="mobile:w-[80vw] tablet:w-[40vw] lg:max-w-sm xl:max-w-lg rounded-xl overflow-hidden border-2 border-gray-100">
          <img
            className="w-full object-cover h-[70vw] tablet:h-[265px] sm:h-[220px] md:h-[200px] lg:max-h-[150px] lg:min-h-[150px] xl:max-h-[225px] 2xl:min-h-[250px]"
            src={image}
            alt={name}
          />
          <div
            id="pet-info"
            className="px-6 py-6 text-left tablet:h-[145px] md:h-[145px] lg:h-[175px] xl:h-[130px]"
          >
            <p className="text-gray-700 text-xl font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {name}
            </p>
            <p className="text-gray-700 text-base">
              {info.breed} • {info.age} • {info.gender}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedPetId: PropTypes.number,
  setSelectedPetId: PropTypes.func.isRequired,
};
