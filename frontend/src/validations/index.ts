import * as Yup from "yup";

export const ItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  category: Yup.string().required("Category is required"),
  supplier: Yup.string().required("Supplier is required"),
  image: Yup.mixed().required("Image is required"),
});
