// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { BASE_URL } from "../../config";
import { useFormik } from "formik";
import Select from "../Select";
import { categoryOptions, statusOptions } from "../../constants/data";
import Input from "../Input";
import Label from "../Label";
import ImagePicker from "../ImagePicker";
import FieldError from "../FieldError";
import { ItemSchema } from "../../validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Item } from "../../types/item";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useEffect, useRef, useState } from "react";

const CreateForm = () => {
  const queryClient = useQueryClient();
  const errorRef = useRef<HTMLDivElement>(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setFieldTouched,
  } = useFormik({
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
      console.log(values);
      mutate(values);
    },
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { mutate, error, isPending } = useMutation<Item, Error, Item>({
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

      return axios.post(`${BASE_URL}/items/create2`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      resetForm();
    },
    onError: (err) => {
      setErrorMsg("Failed to add item. Please try again.");
      console.log(err);

      // hide after 5 minutes (300000 ms)
      setTimeout(() => setErrorMsg(null), 5000);
    },
  });

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      // also move keyboard focus
      errorRef.current.focus();
    }
  }, [error]);

  return (
    <div className=" p-5 border border-gray-900 dark:border-gray-800 rounded-lg shadow-sm flex flex-col gap-5">
      {error && (
        <div ref={errorRef} tabIndex={-1} className=" text-red-500 text-sm">
          {errorMsg}
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold mb-1">Add New Item</h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to add a new item to your inventory.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div>
          <Label label="Item Name">
            <FieldError error={touched.name && errors.name ? errors.name : ""}>
              <Input
                type="text"
                name="name"
                placeholder="Enter item name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Category">
            <FieldError
              error={touched.category && errors.category ? errors.category : ""}
            >
              <Select
                name="category"
                placeholder="Select a category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                options={categoryOptions}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Price">
            <FieldError
              error={touched.price && errors.price ? errors.price : ""}
            >
              <Input
                type="number"
                name="price"
                placeholder="Enter price (e.g. 1200)"
                value={values.price === 0 ? "" : values.price}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Quantity">
            <FieldError
              error={touched.quantity && errors.quantity ? errors.quantity : ""}
            >
              <Input
                type="number"
                name="quantity"
                placeholder="Enter quantity (e.g. 5)"
                value={values.quantity === 0 ? "" : values.quantity}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Supplier">
            <FieldError
              error={touched.supplier && errors.supplier ? errors.supplier : ""}
            >
              <Input
                type="text"
                name="supplier"
                placeholder="Enter supplier name"
                value={values.supplier}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Status">
            <FieldError
              error={touched.status && errors.status ? errors.status : ""}
            >
              <Select
                name="status"
                placeholder="Select status"
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
                options={statusOptions}
              />
            </FieldError>
          </Label>
        </div>
        <div>
          <Label label="Image">
            <FieldError
              error={touched.image && errors.image ? errors.image : ""}
            >
              <ImagePicker
                getPickedImage={(file) => {
                  setFieldValue("image", file);
                }}
                focus={() => setFieldTouched("image", true)}
                reset={values.image === null}
              />
            </FieldError>
          </Label>
        </div>
        <div className="md:col-span-2">
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          >
            {isPending ? "Adding Item..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
