import { Link } from "react-router-dom";
import eyesIcon from "@iconify-icons/twemoji/eyes";
import { Icon } from "@iconify/react";

const eyes = <Icon className="inline-block" icon={eyesIcon} />;

export default function Landing() {
  return (
    <section className="flex flex-col justify-items-center items-center min-h-screen min-w-full overflow-x-hidden bg-purple-600 text-white body-font font-Poppins">
      <div className="flex flex-col mt-5 lg:max-w-[50%]">
        <h1 className="text-[7rem] lg:text-[9rem] font-bold text-white text-center pt-12">
          <span className="inline-block">PetL{eyes}k</span>
        </h1>
        <p className="text-4xl text-white font-medium mt-4 mx-4">
          Browse through a selection of adoptable pets and find your next furry
          best friend.
        </p>
        <Link
          to="/select-species"
          className="transform bg-[#00a9f0] hover:shadow-landingActive hover:translate-y-1 transition-all duration-100 hover:cursor-pointer shadow-landing text-center text-5xl font-semibold rounded-lg px-16 py-12 mt-20"
        >
          Find a Pet
        </Link>
      </div>
    </section>
  );
}
