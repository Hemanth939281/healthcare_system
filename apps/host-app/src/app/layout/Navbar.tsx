import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          toast.success("Logout successful");
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
              registration.active?.postMessage("LOGOUT_SUCCESS_NOTIFICATION");
            });
          }
          setTimeout(() => {
            navigate("/login");
          }, 500);
        }}
        className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
