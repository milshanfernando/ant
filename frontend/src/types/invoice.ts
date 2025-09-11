export type PaymentMethod = "Cash" | "Card" | "Credit" | "Other";
export type InvoiceStatus = "Paid" | "Unpaid" | "Pending";

export interface InvoiceItem {
  item: string | undefined; // Item _id
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Customer {
  name: string;
  telephone?: string;
  email?: string;
  address?: string;
}

export interface Invoice {
  _id?: string;
  invoiceId?: string | undefined; // e.g., INV-00001
  customer: Customer;
  items: InvoiceItem[];
  subTotal: number;
  tax?: number;
  discount?: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status?: InvoiceStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
