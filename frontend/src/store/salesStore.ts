// store/salesStore.ts
import { create } from "zustand";

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Invoice = {
  _id: string;
  invoiceId: string;
  customer: {
    name: string;
    telephone?: string;
    email?: string;
    address?: string;
  };
  items: InvoiceItem[];
  subTotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentMethod: "Cash" | "Card" | "Credit" | "Other";
  status: "Paid" | "Unpaid" | "Pending";
  notes?: string;
  createdAt: string;
};

type SalesState = {
  invoices: Invoice[];
  loading: boolean;
  fetchInvoices: () => Promise<void>;
};

export const useSalesStore = create<SalesState>((set) => ({
  invoices: [],
  loading: false,
  fetchInvoices: async () => {
    set({ loading: true });
    // Replace with API call
    const res = await fetch("/api/invoices/month?_month=2025-09-10");
    const data = await res.json();
    set({ invoices: data, loading: false });
  },
}));
