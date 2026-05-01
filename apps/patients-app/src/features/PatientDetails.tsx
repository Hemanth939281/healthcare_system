import { useParams, useNavigate } from "react-router-dom";
import { patients } from "../data/patients";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient)
    return (
      <div className="p-6 text-gray-500">Patient not found</div>
    );

  const statusColor =
    patient.status === "Stable"
      ? "bg-green-100 text-green-700"
      : patient.status === "Critical"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <div className="p-6 max-w-2xl">
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-1 text-sm text-blue-500 hover:underline mb-6"
      >
        ← Back to Patients
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="bg-blue-600 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-blue-100 text-sm mt-0.5">
                {patient.age} years • {patient.gender}
              </p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {patient.status}
            </span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Condition", value: patient.condition },
            { label: "Attending Doctor", value: patient.doctor },
            { label: "City", value: patient.city },
            { label: "Last Visit", value: patient.lastVisit },
            { label: "Gender", value: patient.gender },
            { label: "Age", value: `${patient.age} years` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;