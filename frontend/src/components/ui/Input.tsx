type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: Props) => {
  return (
    <input
      {...rest}
      className="p-2 rounded-md border border-gray-950 w-full 
            focus:outline-none focus:ring-2 focus:ring-gray-400
            focus:border-transparent dark:bg-gray-950 dark:text-gray-100 
            dark:border-gray-600 cursor-pointer"
    />
  );
};

export default Input;
