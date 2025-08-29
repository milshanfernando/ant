import { useState } from "react";
import UseItems from "../../hooks/useItems";

const Items = () => {
  const [page, setPage] = useState(1);
  const pageSize = 1;
  const { data, error, isLoading } = UseItems({ page, pageSize });

  if (error) return <div>Error loading items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {data?.map((item) => (
          // <li key={item._id} className="mb-2">
          //   <strong>{item.name}</strong> - {item.category} - ${item.price} -{" "}
          //   {item.status}
          // </li>
          <div>
            <div className=" border border-gray-300 dark:border-gray-700 rounded-md p-5 flex gap-5">
              <img
                src={
                  item.image || "https://via.placeholder.com/150?text=No+Image"
                }
                alt={item.name}
                className=" w-32 h-32 object-cover rounded-md"
              />
              <div className=" flex flex-col gap-2">
                <h4 className=" text-lg font-semibold">{item.name}</h4>
                <p className=" text-sm">
                  Category:{" "}
                  <span className=" font-medium first-letter:uppercase">
                    {item.category.toLowerCase()}
                  </span>
                </p>
                <p className=" text-sm">Price: ${item.price}</p>
                <p className=" text-sm">Quantity: {item.quantity}</p>
                <p className=" text-sm">
                  Status:{" "}
                  <span className=" font-medium first-letter:uppercase">
                    {item.status.replace("-", " ")}
                  </span>
                </p>
                {item.supplier && (
                  <p className=" text-sm">Supplier: {item.supplier}</p>
                )}
                {item.lastUpdated && (
                  <p className=" text-sm">
                    Last Updated:{" "}
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </div>
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
