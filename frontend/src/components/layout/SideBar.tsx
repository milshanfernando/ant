import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md transition ${
      isActive
        ? "bg-gray-300 dark:bg-gray-800 font-semibold"
        : "hover:bg-gray-200 dark:hover:bg-gray-900"
    }`;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-100 dark:bg-gray-950 p-5 shadow-lg border border-gray-200 dark:border-gray-800">
      <h1 className="text-xl font-bold mb-6">Menu</h1>
      <nav className="space-y-1 flex flex-col">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/items/new" className={linkClass}>
          Add new item
        </NavLink>
        <NavLink to="/billing/new-invoice" className={linkClass}>
          New invoice
        </NavLink>
        <NavLink to="/sales/overview" className={linkClass}>
          Sales overview
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
