import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export type ItemStatus = "in-stock" | "out-of-stock" | "low-stock";
export type ItemCategory =
  | "Electronics"
  | "Groceries"
  | "Clothing"
  | "Stationery"
  | "Other";

export interface Item {
  _id?: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  category: ItemCategory;
  supplier?: string;
  lastUpdated?: Date | string;
  status: ItemStatus;
}
export interface ItemsResponse {
  items: Item[];
}

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
            ? (quary.page - 1) * (quary.pageSize || 10)
            : undefined,
          _limit: quary.pageSize,
        },
      })
      .then((res) => res.data.items);

  return useQuery<Item[]>({
    queryKey: ["items", quary],
    queryFn: fetchItems,
    placeholderData: (prevData) => prevData,
  });
};

export default UseItems;
