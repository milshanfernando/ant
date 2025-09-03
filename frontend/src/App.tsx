import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <div
      className="
    dark:bg-black dark:text-gray-100 
    bg-white text-gray-900
    max-h-screen min-h-screen flex"
    >
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className=" flex flex-col gap-5 md:w-2xl mx-auto justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
