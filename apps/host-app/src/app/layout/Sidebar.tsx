import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-6">Healthcare</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
