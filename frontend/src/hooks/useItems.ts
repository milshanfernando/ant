import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";
import type { Item } from "../types/item";
import type { ItemsResponse } from "../types/itemRes";

interface ItemQuery {
  page?: number;
  pageSize?: number;
}

const UseItems = (quary: ItemQuery) => {
  const fetchItems = () =>
    axios
      .get<ItemsResponse>(`${BASE_URL}/items/list`, {
        params: {
          _start: quary.page
            ? (quary.page - 1) * (quary.pageSize || 6)
            : undefined,
          _limit: quary.pageSize,
        },
      })
      .then((res) => res.data.items);

  return useQuery<Item[]>({
    queryKey: quary ? ["items", quary] : ["items"],
    queryFn: fetchItems,
    placeholderData: (prevData) => prevData,
  });
};

export default UseItems;
