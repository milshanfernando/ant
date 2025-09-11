import { useFormik } from "formik";

type InvoiceCustomer = {
  customerName: string;
  customerTel: string;
  customerEmail: string;
  customerAddress: string;
  tax: number;
  discount: number;
  paymentMethod: "Cash" | "Card" | "Bank" | string; // extend as needed
  notes: string;
};

const useCreateInvoiceForm = (
  onSaveInvoice: (invoice: InvoiceCustomer) => void
) => {
  return useFormik({
    initialValues: {
      customerName: "",
      customerTel: "",
      customerEmail: "",
      customerAddress: "",
      tax: 0,
      discount: 0,
      paymentMethod: "Cash",
      notes: "",
    },
    onSubmit: (invoice) => {
      onSaveInvoice(invoice);
    },
  });
};

export default useCreateInvoiceForm;
