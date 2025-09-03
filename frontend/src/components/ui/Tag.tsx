import React, { type HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  name: string;
  active?: boolean;
};

// const colors = [
//   "bg-blue-100 text-blue-800",
//   "bg-green-100 text-green-800",
//   "bg-red-100 text-red-800",
//   "bg-yellow-100 text-yellow-800",
//   "bg-purple-100 text-purple-800",
//   "bg-pink-100 text-pink-800",
//   "bg-indigo-100 text-indigo-800",
// ];

const Tag = ({ name, active, ...rest }: Props) => {
  // const getRamColor = () => {
  //   const index = Math.floor(Math.random() * colors.length);
  //   return colors[index];
  // };

  return (
    <div
      {...rest}
      className={` flex gap-2 border border-gray-600 dark:border-gray-400 text-xs font-semibold  px-5 py-2 rounded-full  cursor-pointer hover:scale-105 transition 
      ${rest.className ?? ""}`}
    >
      <p className="my-auto first-letter:uppercase text-center">
        {name.toLowerCase()}
      </p>
      {active && (
        <div className=" flex flex-col justify-center">
          <span className=" bg-green-500 rounded-full w-3 h-3"></span>
        </div>
      )}
    </div>
  );
};

export default Tag;
