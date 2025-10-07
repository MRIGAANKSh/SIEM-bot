import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  // Data
  const loginData = [
    { day: "Mon", failed: 3, success: 20 },
    { day: "Tue", failed: 2, success: 22 },
    { day: "Wed", failed: 1, success: 25 },
    { day: "Thu", failed: 4, success: 18 },
    { day: "Fri", failed: 0, success: 27 },
  ];

  const failedPieData = [
    { name: "VPN", value: 6 },
    { name: "Remote IP", value: 4 },
  ];

  const malwareData = [
    { server: "Server-1", count: 1 },
    { server: "Server-2", count: 1 },
    { server: "Mail-Gateway", count: 1 },
  ];

  const recentLogs = [
    { id: 1, type: "Failed Login", source: "VPN", time: "2025-10-06 08:32" },
    { id: 2, type: "Malware", source: "Server-1", time: "2025-10-05 14:17" },
    { id: 3, type: "MFA Success", source: "Admin", time: "2025-10-04 09:45" },
    { id: 4, type: "VPN Login", source: "Remote IP", time: "2025-10-03 22:01" },
  ];

  const COLORS = ["#3B82F6", "#F87171"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">📊 SIEM Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Login Attempts Line Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Login Attempts (This Week)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="success" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#f87171" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Failed Logins Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Failed Logins by Source</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={failedPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {failedPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Malware Events Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Malware Events per Server</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={malwareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="server" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Logs Table */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Logs</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Type</th>
                <th className="p-2">Source</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="p-2">{log.id}</td>
                  <td className="p-2">{log.type}</td>
                  <td className="p-2">{log.source}</td>
                  <td className="p-2">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold transition-all"
      >
        Ask Bot 💬
      </button>
    </div>
  );
}

export default Dashboard;
