import { FormEventHandler, ReactChild } from "react";

interface SearchButtonProps {
  children: ReactChild[] | ReactChild;
  className: string;
  type?: string;
  onClick: FormEventHandler;
}

export default function SearchButton({
  children,
  className,
  ...props
}: SearchButtonProps) {
  let classNames = [
    "transform bg-[#00a9f0] shadow-search hover:shadow-searchActive hover:translate-y-1 transition-all duration-100 text-white rounded-md font-semibold px-8 mb-2",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  return (
    <button {...props} type="submit" className={classNames}>
      {children}
    </button>
  );
}
