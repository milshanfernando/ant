import { useQuery } from "@tanstack/react-query";
import type { Item } from "../types/item";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Item>("/items/search");

interface ItemQuery {
  search: string;
}

const UseSearchItems = (quary: ItemQuery) => {
  return useQuery<Item[], Error>({
    queryKey: quary ? ["items", quary] : ["items"],
    queryFn: () => apiClient.getSearchData(quary.search),
    placeholderData: (prevData) => prevData,
    enabled: !!quary.search,
  });
};

export default UseSearchItems;
