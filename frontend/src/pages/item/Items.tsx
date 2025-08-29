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
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      <ul>
        {data?.map((item) => (
          <li key={item._id} className="mb-2">
            <strong>{item.name}</strong> - {item.category} - ${item.price} -{" "}
            {item.status}
          </li>
        ))}
      </ul>
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
