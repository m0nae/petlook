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

  // const handleClick = () => {
  //   setSelectedPetId(info.id);
  //   setIsOpen(true);
  // };

  return (
    <>
      <a
        href={info.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-[1px] hover:cursor-pointer"
        // onClick={() => handleClick()}
      >
        <div className="w-[100%] mobile:w-[100%] lg:max-w-sm xl:max-w-lg rounded-xl overflow-hidden border-2 border-gray-100">
          <img
            className="w-full object-cover h-[45vw] mobile:h-[200px] sm:h-[220px] md:h-[200px] lg:max-h-[150px] lg:min-h-[150px] xl:max-h-[225px] 2xl:min-h-[250px]"
            src={image}
            alt={name}
          />
          <div
            id="pet-info-container"
            className="relative px-2 py-2 mobile:px-4 sm:py-4 text-left h-[100px] mobile:h-[110px] md:h-[135px] lg:h-[175px] xl:h-[130px]"
          >
            <p className="text-gray-700 text-xl text-center mobile:text-left font-semibold md:mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {name}
            </p>
            <p
              id="pet-info"
              className="text-gray-700 mobile:text-base text-sm text-center mobile:text-left"
            >
              {info.breed} • {info.age} • {info.gender}{" "}
            </p>
            {/* <p className="absolute bottom-2 w-full left-0 text-[10px] tiny:text-[11px] mobile:text-sm text-center text-purple-800 font-medium">
              x miles away
            </p> */}
          </div>
        </div>
      </a>
    </>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    breed: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedPetId: PropTypes.number,
  setSelectedPetId: PropTypes.func.isRequired,
};
