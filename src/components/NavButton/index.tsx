import { Link } from "react-router-dom";

export interface NavBtnProps {
  children: string;
  to: string;
  disabled?: boolean;
  direction: "forward" | "back";
}

export default function NavButton({
  children,
  to,
  disabled,
  direction,
}: NavBtnProps) {
  if (disabled) {
    return (
      <button
        className="px-10 mobile:px-14 sm:px-20 py-4 hover:cursor-default bg-gray-400 font-semibold text-white text-2xl rounded-md"
        disabled
      >
        <span className="hidden mobile:block">{children}</span>
        <span className="mobile:hidden">
          {direction === "back" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <title>Left Pointing Arrow</title>
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          {direction === "forward" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Right Pointing Arrow</title>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          )}
        </span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className="px-10 mobile:px-14 sm:px-20 py-4 bg-blue-500 font-semibold text-white text-2xl rounded-md"
    >
      <span className="hidden mobile:block">{children}</span>
      <span className="mobile:hidden">
        {direction === "back" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title>Left Pointing Arrow</title>
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        {direction === "forward" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Right Pointing Arrow</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </span>
    </Link>
  );
}
