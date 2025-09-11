import { useQuery } from "@tanstack/react-query";
import type { Invoice } from "../types/invoice";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Invoice>("/invoices/month");
const UseSales = (month: string) => {
  return useQuery<Invoice[], Error>({
    queryKey: ["sales", month],
    queryFn: () => apiClient.getAllByTimeRange({ month }),
  });
};

export default UseSales;
