import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { analyzeDdosAttack } from "./llmService.js";

const randomIPs = [
  "41.39.94.145", "180.56.68.164", "150.204.186.191",
  "103.218.119.212", "167.58.162.211", "221.117.248.123",
  "35.118.242.136", "179.169.125.103", "120.81.88.51", "187.247.93.128",
];

const AnalysisCard = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
    {children}
  </div>
);

const Analysis = () => {
  const navigate = useNavigate();

  const [trafficData, setTrafficData] = useState([
    { time: "00:00", traffic: 4000, anomalies: 400 },
    { time: "04:00", traffic: 3000, anomalies: 300 },
    { time: "08:00", traffic: 2000, anomalies: 200 },
    { time: "12:00", traffic: 2780, anomalies: 278 },
    { time: "16:00", traffic: 1890, anomalies: 189 },
    { time: "20:00", traffic: 2390, anomalies: 239 },
  ]);

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => navigate("/");

  const handleCheckDdos = async () => {
    const randomIP = randomIPs[Math.floor(Math.random() * randomIPs.length)];
    const traffic = Math.floor(Math.random() * 6000 + 1000);
    const anomalies = Math.floor(traffic * (Math.random() * 0.3 + 0.1));
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const modelRes = await analyzeDdosAttack(randomIP, traffic, anomalies, setLoading);
    setResponse(modelRes);

    setTrafficData((prev) => [...prev.slice(-5), { time: timeStr, traffic, anomalies }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-poppins">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-400">DDoS Defence</h1>
              <div className="ml-10 flex items-center space-x-4">
                <a href="/dashboard" className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/analysis" className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Analysis</a>
                <a href="/settings" className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</a>
              </div>
            </div>
            <button onClick={handleLogout} className="text-red-300 hover:text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-4">Analysis</h2>
          <button
            onClick={handleCheckDdos}
            className="mb-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
          >
            Check for DDoS Attack
          </button>

          {loading && (
            <p className="text-yellow-400 font-medium mb-4">Analyzing DDoS... please wait</p>
          )}

          {response && !loading && (
            <AnalysisCard title="LLM Risk Classification & Recommendations">
              <pre className="text-white whitespace-pre-wrap">{response}</pre>
            </AnalysisCard>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AnalysisCard title="Traffic Pattern Analysis">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="traffic" stroke="#4ade80" name="Traffic" />
                  <Line yAxisId="right" type="monotone" dataKey="anomalies" stroke="#f87171" name="Anomalies" />
                </LineChart>
              </ResponsiveContainer>
            </AnalysisCard>

            <AnalysisCard title="Threat Distribution">
              <ul className="space-y-2">
                <li>SYN Flood Attacks: 45%</li>
                <li>UDP Flood Attacks: 30%</li>
                <li>HTTP Flood Attacks: 15%</li>
                <li>Other Attack Types: 10%</li>
              </ul>
            </AnalysisCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AnalysisCard title="Geographic Origin of Attacks">
              <ul className="space-y-2">
                <li>United States</li>
                <li>China</li>
                <li>Russia</li>
                <li>Brazil</li>
                <li>India</li>
              </ul>
            </AnalysisCard>

            <AnalysisCard title="Attack Intensity Over Time">
              <ul className="space-y-2">
                <li>Last Hour: High</li>
                <li>Last 6 Hours: Medium</li>
                <li>Last 24 Hours: Low</li>
                <li>Last 7 Days: Fluctuating</li>
              </ul>
            </AnalysisCard>
          </div>

          <AnalysisCard title="Mitigation Effectiveness">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Overall Effectiveness: 92%</h4>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <ul className="space-y-2">
                <li>Successfully Mitigated Attacks: 1,230</li>
                <li>False Positives: 23</li>
                <li>Undetected Attacks: 5</li>
              </ul>
            </div>
          </AnalysisCard>
        </div>
      </main>
    </div>
  );
};

export default Analysis;