import { useState } from "react";
import UseSearchItems from "../../hooks/useSearchItems";

const CreateInvoice = () => {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = UseSearchItems({ search });

  // When search is empty, don't show results
  const showResults = search.trim().length > 0;

  return (
    <div className="p-4">
      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className="border px-3 py-2 rounded w-full max-w-sm"
      />

      {/* Error / loading states */}
      {error && showResults && (
        <div className="text-red-500 mt-2">Error loading items</div>
      )}
      {isLoading && showResults && <div className="mt-2">Loading...</div>}

      {/* Search results */}
      {showResults && (
        <ul className="mt-4 space-y-2">
          {data?.map((item) => (
            <li
              key={item._id}
              className="p-3 border rounded flex items-center gap-4"
            >
              {/* Image */}
              {item.image && (
                <img
                  src={typeof item.image === "string" ? item.image : undefined}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              {/* Info */}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} | Price:{" "}
                  {new Intl.NumberFormat("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  }).format(item.price)}
                </p>
              </div>
            </li>
          ))}

          {/* No results */}
          {data?.length === 0 && (
            <li className="text-gray-500">No items found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CreateInvoice;
