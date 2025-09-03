import { useFormik } from "formik";
import { ItemSchema } from "../validations";
import type { Item } from "../types/item";

const useCreateForm = (onItemSave: (val: Item) => void) => {
  return useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      quantity: 0,
      supplier: "",
      status: "in-stock",
      image: null,
    },
    validationSchema: ItemSchema,
    onSubmit: (values: Item) => {
      // handle form submission
      //   console.log(values);
      //   mutate(values);
      onItemSave(values);
    },
  });
};

export default useCreateForm;
