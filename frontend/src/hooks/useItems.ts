import { useQuery } from "@tanstack/react-query";
import type { Item } from "../types/item";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Item>("/items/list");

interface ItemQuery {
  page?: number;
  pageSize?: number;
}

const UseItems = (quary: ItemQuery) => {
  return useQuery<Item[], Error>({
    queryKey: quary ? ["items", quary] : ["items"],
    queryFn: () => apiClient.getAll(quary.page, quary.pageSize),
    placeholderData: (prevData) => prevData,
  });
};

export default UseItems;
