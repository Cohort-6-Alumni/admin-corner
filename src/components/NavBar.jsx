
const NavBar = () => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-slate-400 text-lg font-bold">Admin Center</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
