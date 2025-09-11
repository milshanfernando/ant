import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import NewItem from "../pages/item/NewItem";
import App from "../App";
import Invoice from "../pages/invoice/Invoice";
import Sales from "../pages/sales/Sales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ✅ layout with sidebar
    children: [
      { index: true, element: <Home /> },
      { path: "items/new", element: <NewItem /> },
      { path: "billing/new-invoice", element: <Invoice /> },
      { path: "sales/overview", element: <Sales /> },
    ],
  },
]);

export default router;
