import "./App.css";
// import SearchField from "./components/SearchField";
// import Tags from "./components/Tag";
import Home from "./pages/home/Home";
import Items from "./pages/item/Items";

function App() {
  return (
    <div
      className="
    dark:bg-black dark:text-gray-100 
    bg-white text-gray-900
    min-h-screen flex"
    >
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-950 p-5 shadow-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold mb-6">Menu</h1>
        <nav className="space-y-3">
          <a
            href="#"
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Items
          </a>
          <a
            href="#"
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className=" flex flex-col gap-5 md:w-2xl mb-6 m-auto justify-center">
          <Home />
          <Items />
        </div>
      </main>
    </div>
  );
}

export default App;
