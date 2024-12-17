import { useContext } from "react";
import { AppContext } from "../context/applicationContext";
const NavBar = () => {
  const { logout } = useContext(AppContext);

  return (
    <nav className="bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-slate-400 text-lg font-bold">Admin Center</div>
        <button
          onClick={() => logout()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
