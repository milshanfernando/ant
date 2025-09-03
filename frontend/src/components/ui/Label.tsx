type Props = {
  label: string;
  children?: React.ReactNode;
};

const Label = ({ label, children }: Props) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-light text-black dark:text-gray-100">
        {label}
      </label>
      {children}
    </div>
  );
};

export default Label;
