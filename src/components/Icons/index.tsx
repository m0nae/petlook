import pigFace from "@iconify-icons/twemoji/pig-face";
import catFace from "@iconify-icons/twemoji/cat-face";
import dogFace from "@iconify-icons/twemoji/dog-face";
import horseFace from "@iconify-icons/twemoji/horse-face";
import birdIcon from "@iconify-icons/twemoji/bird";
import rabbitFace from "@iconify-icons/noto/rabbit-face";
import hamsterIcon from "@iconify-icons/noto/hamster";
import fishIcon from "@iconify-icons/noto/fish";
import pawPrints from "@iconify-icons/twemoji/paw-prints";

interface LocationIconProps {
  customClass: string;
}

export function LocationIcon({ customClass }: LocationIconProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={customClass}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
}

const icons = {
  pig: pigFace,
  cat: catFace,
  dog: dogFace,
  horse: horseFace,
  bird: birdIcon,
  rabbit: rabbitFace,
  hamster: hamsterIcon,
  fish: fishIcon,
  location: LocationIcon,
  paws: pawPrints,
};
export default icons;
