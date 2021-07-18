import { Link } from "react-router-dom";
import { InlineIcon } from "@iconify/react";
import icon from "../../components/Icons";

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen min-w-full bg-purple-600 dark:bg-gray-800 ">
      <div className="flex flex-col md:text-center w-[90%] mobile:w-4/5 max-w-screen-md mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="font-extrabold text-white dark:text-white mobile:text-4xl">
          <span className="block text-[2.5rem] leading-none mobile:text-5xl sm:text-6xl">
            Whoops! Page not found.
          </span>
          <span className="inline-block text-white text-xl md:text-center mobile:text-2xl sm:text-3xl font-medium mt-4">
            Let's go somewhere else, shall we?{" "}
            <span>
              <InlineIcon
                className="inline-block"
                width="2rem"
                icon={icon.paws}
              />
            </span>
          </span>
        </h2>
        <Link
          to="/"
          className="transform bg-[#00a9f0] text-white hover:shadow-landingActive hover:translate-y-1 transition-all duration-100 hover:cursor-pointer shadow-landing text-center text-4xl mobile:text-5xl font-semibold rounded-lg tiny:px-10 mobile:px-16 py-8 sm:py-12 mt-10 mb-10 sm:mt-20"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
