import { Link } from "react-router-dom";
import eyesIcon from "@iconify-icons/twemoji/eyes";
import dogFace from "@iconify-icons/twemoji/dog-face";
import blackHeart from "@iconify-icons/noto/black-heart";
import { Icon } from "@iconify/react";

const eyes = <Icon className="inline-block" icon={eyesIcon} />;

export default function Landing() {
  return (
    <>
      <section className="min-h-[90vh] min-w-full pb-10 bg-purple-600 text-white body-font font-Poppins">
        <div className="flex flex-col justify-items-center items-center">
          <div className="flex flex-col mt-5 w-[90%] max-w-5xl">
            <h1 className="text-[3.8rem] tiny:text-[4.2rem] mobile:text-[6rem] sm:text-[8rem] lg:text-[9rem] font-bold text-white text-center pt-8 ">
              <span className="inline-block">Another preview change</span>
            </h1>
            <p className="text-3xl mobile:text-4xl text-white font-medium mt-4 mx-4">
              Browse through a selection of adoptable pets and find your next
              furry friend.
            </p>
            <Link
              to="/select-species"
              className="transform bg-[#00a9f0] hover:shadow-landingActive hover:translate-y-1 transition-all duration-100 hover:cursor-pointer shadow-landing text-center text-4xl mobile:text-5xl font-semibold rounded-lg tiny:px-10 mobile:px-16 py-12 mt-10 mb-10 sm:mt-20"
            >
              Find a Pet
            </Link>
          </div>
        </div>
      </section>
      <footer className="text-gray-600 body-font -mt-7 static w-full bg-white">
        <div className="container px-5 py-8 mx-auto flex items-center justify-between sm:flex-row flex-col">
          <a
            href="http://localhost:3000"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <Icon icon={dogFace} className="h-7 w-7" />
            <span className="ml-3 text-xl">PetLook</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            Made with <Icon icon={blackHeart} className="inline-block" /> by
            <a
              href="https://github.com/m0nae"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @m0nae
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
