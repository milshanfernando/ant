import Select from "../../components/ui/Select";
import { categoryOptions, statusOptions } from "../../constants/data";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import ImagePicker from "../../components/ui/ImagePicker";
import FieldError from "../../components/ui/FieldError";
import type { Item } from "../../types/item";
import { useEffect, useRef, useState } from "react";
import useAddItem from "../../hooks/useAddItem";
import useCreateForm from "../../hooks/useCreateForm";

const CreateForm = () => {
  const errorRef = useRef<HTMLDivElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  } = useCreateForm((val: Item) => {
    mutate(val);
  });

  const { mutate, error, isPending } = useAddItem(
    () => {
      resetForm();
      setErrorMsg(null);
    },
    (err: Error) => {
      setErrorMsg(err.message);
    }
  );

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errorRef.current.focus();
    }
  }, [error]);

  return (
    // <div className=" p-5 border border-gray-900 dark:border-gray-800 rounded-lg shadow-sm flex flex-col gap-5">
    <div className="flex flex-col gap-5 p-10">
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
