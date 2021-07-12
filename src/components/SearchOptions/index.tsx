import { ReactNode } from "react";

type SearchOptionContainerProps = {
  children: ReactNode;
};

export default function SearchOptions({
  children,
}: SearchOptionContainerProps) {
  return (
    <div className="absolute z-10 top-0 left-0 flex flex-col sm:flex-row flex-wrap self-center items-center justify-center mb-5 py-3 px-[4%] bg-purple-600 min-w-[100vw]">
      {children}
    </div>
  );
}
