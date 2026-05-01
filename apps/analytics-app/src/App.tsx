import {
  XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend,
} from "recharts";

const monthlyData = [
  { name: "Jan", patients: 40, revenue: 12000, appointments: 55 },
  { name: "Feb", patients: 55, revenue: 15500, appointments: 70 },
  { name: "Mar", patients: 70, revenue: 18000, appointments: 85 },
  { name: "Apr", patients: 65, revenue: 16500, appointments: 78 },
  { name: "May", patients: 90, revenue: 22000, appointments: 102 },
  { name: "Jun", patients: 85, revenue: 21000, appointments: 95 },
  { name: "Jul", patients: 100, revenue: 25000, appointments: 115 },
  { name: "Aug", patients: 95, revenue: 23500, appointments: 108 },
];

const conditionData = [
  { name: "Cardiac", value: 28 },
  { name: "Diabetes", value: 22 },
  { name: "Ortho", value: 18 },
  { name: "Neuro", value: 15 },
  { name: "Other", value: 17 },
];

const departmentData = [
  { dept: "Cardiology", patients: 120, staff: 15 },
  { dept: "Neurology", patients: 95, staff: 12 },
  { dept: "Orthopedics", patients: 80, staff: 10 },
  { dept: "Pediatrics", patients: 110, staff: 18 },
  { dept: "Oncology", patients: 65, staff: 14 },
];

const performanceData = [
  { metric: "Satisfaction", value: 88 },
  { metric: "Occupancy", value: 76 },
  { metric: "Recovery", value: 82 },
  { metric: "Efficiency", value: 79 },
  { metric: "Safety", value: 95 },
];

const COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ec4899", "#64748b"];

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </div>
);

function App() {
  return (
    <div className="bg-gray-50 p-6 space-y-6">

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Patients" value="640" />
        <StatCard label="Monthly Revenue" value="$25K" />
        <StatCard label="Appointments" value="108" />
        <StatCard label="Satisfaction" value="88%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Patient growth</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="patients" stroke="#6366f1" fill="url(#patientGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: any) => `$${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Conditions breakdown</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie data={conditionData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {conditionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-xs text-gray-600">
              {conditionData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: COLORS[i] }} />
                  <span>{d.name}</span>
                  <span className="ml-auto font-medium text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Department overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="patients" fill="#6366f1" radius={[0, 4, 4, 0]} name="Patients" />
              <Bar dataKey="staff" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Staff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 lg:col-span-2">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Hospital performance metrics</h2>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#f0f0f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Performance" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default App;