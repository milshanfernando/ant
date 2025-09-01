import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

type Option = { value: string; label: string };

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  options: Option[];
  placeholder?: string;
};

const Select = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    const event = {
      target: { name, value: option.value },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative md:w-full">
      <div className="relative w-full" onClick={() => setOpen((prev) => !prev)}>
        <input
          readOnly
          name={name}
          value={options.find((opt) => opt.value === value)?.label || ""}
          onBlur={onBlur}
          placeholder={placeholder}
          className="p-2 pr-8 md:pr-16 rounded-md border border-gray-950 w-full 
            focus:outline-none focus:ring-2 focus:ring-gray-400
            focus:border-transparent dark:bg-gray-950 dark:text-gray-100 
            dark:border-gray-600 cursor-pointer"
        />
        <RiArrowDropDownLine className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl pointer-events-none" />
      </div>

      {open && (
        <div
          className="absolute rounded-md border border-gray-200 w-full 
          dark:bg-gray-950 bg-white dark:text-gray-100 
          dark:border-gray-600 mt-1 shadow-lg z-10 overflow-hidden"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="p-2 dark:bg-gray-950 hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
