import { useState } from "react";
import UseItems from "../../hooks/useItems";

const Items = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data, error, isLoading } = UseItems({ page, pageSize });
  const statusColors: { [key: string]: string } = {
    "in-stock": "bg-green-200 text-green-800",
    "out-of-stock": "bg-red-200 text-red-800",
    "low-stock": "bg-yellow-200 text-yellow-800",
  };

  if (error) return <div>Error loading items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data?.map(({ name, image, status, quantity }, index: number) => (
          <div
            className="border border-gray-600 dark:border-gray-400 rounded-md p-5 flex flex-col gap-3 max-w-60 coursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-150 ease-in-out"
            key={index}
          >
            <h2 className=" text-sm font-semibold first-letter:uppercase truncate max-w-[20ch] ">
              {name.toLowerCase()}
            </h2>
            <img
              className=" h-2/3"
              src={typeof image === "string" ? image : undefined}
              alt=""
            />
            <div className="flex justify-between">
              <p
                className={`${statusColors[status]} px-2 rounded-full text-xs font-semibold text-center my-auto py-1`}
              >
                {status.toUpperCase()}
              </p>
              <p>{quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" p-5 flex gap-3">
        <button
          className="bg-blue-200 text-blue-700 px-2 hover:bg-blue-300 py-1 rounded-md"
          disabled={page == 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>
        <button
          className="bg-blue-200 text-blue-700 px-2 hover:bg-blue-300 py-1 rounded-md"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Items;
