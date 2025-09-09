import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

type Option = { value: string; label: string; id: string; image: string };

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  options: Option[];
  placeholder?: string;
};

const ItemSelect = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  const handleSelect = (option: Option) => {
    const event = {
      target: { name, value: option.value },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    setSearch(option.label); // set input text
    setOpen(false);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!open) setSearch(selectedLabel); // reset search when closed
  }, [open, selectedLabel]);

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
      <div className="relative w-full" onClick={() => setOpen(true)}>
        <input
          name={name}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
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
          dark:border-gray-600 mt-1 shadow-lg z-10 max-h-48 overflow-y-auto"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-2 dark:bg-gray-950 hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400 dark:text-gray-500">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemSelect;
