import React from "react";
import { BiSolidError } from "react-icons/bi";
type Props = {
  children?: React.ReactNode;
  error?: string;
};

const FieldError = ({ children, error }: Props) => {
  return (
    <div className="flex flex-col">
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <BiSolidError className="my-auto" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FieldError;
