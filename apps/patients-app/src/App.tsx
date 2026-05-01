import { useSelector, useDispatch } from "react-redux";
import { toggleView } from "./features/viewSlice";
import { patients } from "./data/patients";
import { useNavigate } from "react-router-dom";

function App() {
  const view = useSelector((store: any) => store?.view);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <button
          onClick={() => dispatch(toggleView())}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium cursor-pointer"
        >
          Switch to {view === "grid" ? "List" : "Grid"}
        </button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {patients.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/patients/${p.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {p.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Age:</span>{" "}
                  {p.age}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Gender:</span>{" "}
                  {p.gender}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Condition:</span>{" "}
                  {p.condition}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "Stable"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Doctor:</span>{" "}
                  {p.doctor}
                </p>
                <p>
                  <span className="font-medium text-gray-700">City:</span>{" "}
                  {p.city}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Last Visit:</span>{" "}
                  {p.lastVisit}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-[800px] w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Name
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Age
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Gender
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Condition
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Status
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Doctor
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  City
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200">
                  Last Visit
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className={`text-sm text-gray-700 hover:bg-gray-50 transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3 border-b border-gray-100 font-medium">
                    {p.name}
                  </td>
                  <td className="p-3 border-b border-gray-100">{p.age}</td>
                  <td className="p-3 border-b border-gray-100">{p.gender}</td>
                  <td className="p-3 border-b border-gray-100">
                    {p.condition}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "Stable"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-100">{p.doctor}</td>
                  <td className="p-3 border-b border-gray-100">{p.city}</td>
                  <td className="p-3 border-b border-gray-100">
                    {p.lastVisit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
