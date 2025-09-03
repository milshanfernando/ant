import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Item } from "../types/item";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Item>("/items/create");
const useAddItem = (onAdd: () => void, onErr: (err: Error) => void) => {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, Item>({
    mutationFn: async (item: Item) => {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price.toString());
      formData.append("category", item.category);
      formData.append("quantity", item.quantity.toString());
      formData.append("supplier", item.supplier);
      formData.append("status", item.status);
      if (item.image) {
        formData.append("image", item.image);
      }

      return apiClient.postFormData(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      onAdd();
    },
    onError: (err) => {
      onErr(err);
    },
  });
};

export default useAddItem;
