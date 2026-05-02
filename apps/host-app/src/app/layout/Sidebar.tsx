import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/patients", label: "Patients" },
    { to: "/analytics", label: "Analytics" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 h-screen bg-gray-900 text-white p-4 flex-shrink-0 transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">Healthcare</h2>
        <nav className="flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg transition text-sm ${
                location.pathname === to
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-gray-900 text-white p-2 rounded-lg"
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;