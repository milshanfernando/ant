import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import type { Invoice } from "../types/invoice";

const apiClient = new ApiClient<Invoice>("/invoices/create");
const useAddInvoice = (onAdd: () => void, onErr: (err: Error) => void) => {
  return useMutation<Invoice, Error, Invoice>({
    mutationFn: (invoice: Invoice) => apiClient.post(invoice),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      onAdd();
    },
    onError: (err) => {
      onErr(err);
    },
  });
};

export default useAddInvoice;
