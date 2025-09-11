import { useState, useRef } from "react";
import UseSearchItems from "../../hooks/useSearchItems";
import type { Item } from "../../types/item";
import { useReactToPrint } from "react-to-print";
import useAddInvoice from "../../hooks/useAddInvoice";
import useCreateInvoiceForm from "../../hooks/useCreateInvoice";
import FieldError from "../../components/ui/FieldError";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Select from "../../components/ui/Select";
import { paymentMethods } from "../../constants/data";
import type { PaymentMethod } from "../../types/invoice";

const CreateInvoice = () => {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = UseSearchItems({ search });
  const [invoiceItems, setInvoiceItems] = useState<Item[]>([]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useCreateInvoiceForm((invoice) => {
    const itemsPayload = invoiceItems.map((item) => ({
      item: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const payload = {
      customer: {
        name: invoice.customerName,
        telephone: invoice.customerTel,
        email: invoice.customerEmail,
        address: invoice.customerAddress,
      },
      items: itemsPayload,
      subTotal,
      tax: invoice.tax,
      discount: invoice.discount,
      totalAmount,
      paymentMethod: invoice.paymentMethod as PaymentMethod,
      notes: invoice.notes,
    };
    mutate(payload);
  });

  const showResults = search.trim().length > 0;

  const handleAddItem = (item: Item) => {
    setInvoiceItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setSearch("");
  };

  const handleQuantityChange = (id: string | undefined, qty: number) => {
    setInvoiceItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
    );
  };

  const subTotal = invoiceItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalAmount = subTotal + values.tax - values.discount;

  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
    onAfterPrint: () => console.log("Printed successfully!"),
  });
  const {
    mutate,
    isPending,
    error: submitError,
  } = useAddInvoice(
    () => {
      setInvoiceItems([]);
      resetForm();
      handlePrint();
    },
    () => {}
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldError
          error={
            touched.customerName && errors.customerName
              ? errors.customerName
              : ""
          }
        >
          <Input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={values.customerName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FieldError>
        <FieldError
          error={
            touched.customerTel && errors.customerTel ? errors.customerTel : ""
          }
        >
          <Input
            type="text"
            name="customerTel"
            placeholder="Telephone"
            value={values.customerTel}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FieldError>
        <FieldError
          error={
            touched.customerEmail && errors.customerEmail
              ? errors.customerEmail
              : ""
          }
        >
          <Input
            type="email"
            name="customerEmail"
            placeholder="Email"
            value={values.customerEmail}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FieldError>
        <FieldError
          error={
            touched.customerAddress && errors.customerAddress
              ? errors.customerAddress
              : ""
          }
        >
          <Input
            type="text"
            name="customerAddress"
            placeholder="Address"
            value={values.customerAddress}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FieldError>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className="border px-3 py-2 rounded w-full max-w-sm"
      />

      {error && showResults && (
        <div className="text-red-500 mt-2">Error loading items</div>
      )}
      {isLoading && showResults && <div className="mt-2">Loading...</div>}

      {showResults && (
        <ul className="mt-4 space-y-2">
          {data?.map((item) => (
            <li
              key={item._id}
              className="p-3 border rounded flex items-center gap-4 cursor-pointer hover:bg-gray-900"
              onClick={() => handleAddItem(item)}
            >
              {item.image && (
                <img
                  src={typeof item.image === "string" ? item.image : undefined}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Stock: {item.quantity} | Price:{" "}
                  {new Intl.NumberFormat("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  }).format(item.price)}
                </p>
              </div>
            </li>
          ))}
          {data?.length === 0 && (
            <li className="text-gray-500">No items found</li>
          )}
        </ul>
      )}

      {/* Invoice Items Table */}
      {invoiceItems.length > 0 && (
        <div className="mt-6 space-y-4">
          <div
            id="invoice"
            ref={invoiceRef}
            className="max-w-2xl mx-auto p-6 rounded shadow-md"
          >
            <h2 className="font-bold text-lg mb-3">Invoice Items</h2>
            <table className="w-full border border-gray-600 rounded">
              <thead>
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">
                      {new Intl.NumberFormat("en-LK", {
                        style: "currency",
                        currency: "LKR",
                      }).format(item.price)}
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, Number(e.target.value))
                        }
                        className="w-16 border rounded px-2 py-1 text-center"
                      />
                    </td>
                    <td className="p-2 text-center">
                      {new Intl.NumberFormat("en-LK", {
                        style: "currency",
                        currency: "LKR",
                      }).format(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label label="Tax:">
                  <FieldError
                    error={touched.tax && errors.tax ? errors.tax : ""}
                  >
                    <Input
                      type="number"
                      name="tax"
                      min={0}
                      placeholder="Tax"
                      value={values.tax}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FieldError>
                </Label>
              </div>
              <div>
                <Label label="Discount">
                  <FieldError
                    error={
                      touched.discount && errors.discount ? errors.discount : ""
                    }
                  >
                    <Input
                      type="number"
                      name="discount"
                      placeholder="Discount"
                      value={values.discount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FieldError>
                </Label>
              </div>
              <div>
                <Label label="Payment Method">
                  <FieldError
                    error={
                      touched.paymentMethod && errors.paymentMethod
                        ? errors.paymentMethod
                        : ""
                    }
                  >
                    <Select
                      name="paymentMethod"
                      placeholder="Select status"
                      value={values.paymentMethod}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={paymentMethods}
                    />
                  </FieldError>
                </Label>
              </div>

              <div>
                <Label label="Notes">
                  <FieldError
                    error={touched.notes && errors.notes ? errors.notes : ""}
                  >
                    <Input
                      type="text"
                      name="notes"
                      placeholder="Add your notes here"
                      value={values.notes}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FieldError>
                </Label>
              </div>
            </div>

            <div className="mt-4 text-right font-bold text-lg">
              Total Amount:{" "}
              {new Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
              }).format(totalAmount)}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isPending ? "Submitting..." : "Save & Print"}
          </button>
        </div>
      )}
      {submitError && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 5c-3.866 0-7 3.134-7 
      7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"
            />
          </svg>
          <span className="font-medium">Oops! Something went wrong. </span>
          <span>Please try again later.</span>
        </div>
      )}
    </form>
  );
};

export default CreateInvoice;
