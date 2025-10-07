import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I’m your SIEM Assistant. Ask me about security logs or reports.",
    },
  ]);

  const [chartData, setChartData] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botResponse = getResponse(input);

    const botMsg = { sender: "bot", text: botResponse.text };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");

    // Update chart & logs if response includes data
    if (botResponse.chart) setChartData(botResponse.chart);
    if (botResponse.logs) setLogs(botResponse.logs);
  };

  const getResponse = (query) => {
    query = query.toLowerCase();

    // Default response
    let response = { text: "I couldn’t find relevant SIEM data for that query.", chart: null, logs: null };

    if (query.includes("failed login")) {
      response.text = "There were 10 failed login attempts yesterday, 6 from VPN sources.";
      response.chart = {
        labels: ["Failed Logins", "VPN Attempts"],
        datasets: [{ label: "Event Count", data: [10, 6], backgroundColor: "#3B82F6" }],
      };
      response.logs = [
        { id: 1, type: "Failed Login", source: "VPN", time: "2025-10-06 08:32" },
        { id: 2, type: "Failed Login", source: "VPN", time: "2025-10-06 09:10" },
      ];
    } else if (query.includes("malware")) {
      response.text = "Detected 3 malware incidents on servers.";
      response.chart = {
        labels: ["Malware"],
        datasets: [{ label: "Event Count", data: [3], backgroundColor: "#EF4444" }],
      };
      response.logs = [
        { id: 1, type: "Malware", source: "Server-1", time: "2025-10-05 14:17" },
        { id: 2, type: "Malware", source: "Server-2", time: "2025-10-05 14:20" },
        { id: 3, type: "Malware", source: "Mail-Gateway", time: "2025-10-05 14:22" },
      ];
    } else if (query.includes("mfa")) {
      response.text = "All MFA attempts by admin were successful last week.";
      response.chart = {
        labels: ["MFA Success"],
        datasets: [{ label: "Event Count", data: [5], backgroundColor: "#10B981" }],
      };
      response.logs = [
        { id: 1, type: "MFA Success", source: "Admin", time: "2025-10-04 09:45" },
      ];
    } else if (query.includes("vpn")) {
      response.text = "VPN-related login attempts were mostly successful, except 2 suspicious ones.";
      response.chart = {
        labels: ["VPN Attempts"],
        datasets: [{ label: "Event Count", data: [8], backgroundColor: "#FACC15" }],
      };
      response.logs = [
        { id: 1, type: "VPN Login", source: "Remote IP 1", time: "2025-10-03 22:01" },
        { id: 2, type: "VPN Login", source: "Remote IP 2", time: "2025-10-03 22:05" },
      ];
    } else if (query.includes("summary")) {
      response.text = "Here’s a summary: 10 failed logins, 3 malware detections, 5 MFA events.";
      response.chart = {
        labels: ["Failed Logins", "Malware", "MFA", "VPN"],
        datasets: [{ label: "Event Count", data: [10, 3, 5, 8], backgroundColor: ["#3B82F6", "#EF4444", "#10B981", "#FACC15"] }],
      };
      response.logs = [
        { id: 1, type: "Failed Login", source: "VPN", time: "2025-10-06 08:32" },
        { id: 2, type: "Malware", source: "Server-1", time: "2025-10-05 14:17" },
        { id: 3, type: "MFA Success", source: "Admin", time: "2025-10-04 09:45" },
      ];
    }

    return response;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-row">
      {/* Chatbot Section */}
      <div className="w-1/2 p-6 flex flex-col border-r border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400 mb-4 text-center">
          🧠 Conversational SIEM Assistant
        </h1>

        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-2xl space-y-3 shadow-md">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-xl max-w-[75%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-100"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            className="flex-1 p-3 rounded-l-xl bg-gray-700 text-white focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-r-xl">
            Send
          </button>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-semibold text-green-400 mb-3 text-center">
          📊 Security Insights
        </h2>

        {chartData ? (
          <>
            {/* Chart */}
            <div className="bg-gray-900 p-4 rounded-xl shadow-md mb-6">
              <h3 className="text-lg mb-2 text-yellow-300 font-medium">Event Overview</h3>
              <Bar data={chartData} />
            </div>

            {/* Logs Table */}
            <div className="bg-gray-900 p-4 rounded-xl shadow-md flex-1 overflow-y-auto">
              <h3 className="text-lg mb-2 text-yellow-300 font-medium">Recent Logs</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="p-2">#</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Source</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
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
          </>
        ) : (
          <p className="text-gray-400 text-center mt-20">
            Ask the bot about logs or events to see charts and tables here.
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatbotPage;
