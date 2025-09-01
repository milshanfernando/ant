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
  image: string | File | null;
  quantity: number;
  price: number;
  category: string;
  supplier: string;
  lastUpdated?: Date | string;
  status: string;
}
