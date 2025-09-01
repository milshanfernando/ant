import "./App.css";
// import SearchField from "./components/SearchField";
// import Tags from "./components/Tag";
import Home from "./pages/home/Home";

function App() {
  return (
    <div
      className="
    dark:bg-black dark:text-gray-100 
    bg-white text-gray-900
    max-h-screen min-h-screen flex"
    >
      {/* Sidebar */}
      <aside className=" hidden lg:flex flex-col w-64 bg-gray-100 dark:bg-gray-950 p-5 shadow-lg border border-gray-200 dark:border-gray-800">
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
      <main className="flex-1 p-10 overflow-y-auto">
        <div className=" flex flex-col gap-5 md:w-2xl mx-auto justify-center">
          <Home />
        </div>
      </main>
    </div>
  );
}

export default App;
