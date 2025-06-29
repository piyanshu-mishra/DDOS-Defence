import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCard = ({ title, value, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
      <h3 className="text-lg font-semibold mb-2 text-green-300">{title}</h3>
      <p className="text-3xl font-bold text-green-400 mb-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

const isValidIP = (ip) => {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?\d\d?)\.(25[0-5]|2[0-4][0-9]|[01]?\d\d?)\.(25[0-5]|2[0-4][0-9]|[01]?\d\d?)\.(25[0-5]|2[0-4][0-9]|[01]?\d\d?)$/;
  return ipRegex.test(ip);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userFeedback, setUserFeedback] = useState("");
  const [blockedIPs, setBlockedIPs] = useState(["192.168.1.100", "10.0.0.5"]);
  const [behavioralData, setBehavioralData] = useState([]);
  const [ipReputation, setIPReputation] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalAttacks: 1234,
    activeThreats: 12,
    systemStatus: "Optimal",
  });

  const [trafficData, setTrafficData] = useState([
    { name: "00:00", normal: 4000, suspicious: 2400 },
    { name: "04:00", normal: 3000, suspicious: 1398 },
    { name: "08:00", normal: 2000, suspicious: 9800 },
    { name: "12:00", normal: 2780, suspicious: 3908 },
    { name: "16:00", normal: 1890, suspicious: 4800 },
    { name: "20:00", normal: 2390, suspicious: 3800 },
  ]);

  const generateRandomData = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNormal = Math.floor(Math.random() * 3000 + 2000);
    const newSuspicious = Math.floor(Math.random() * 5000 + 1000);

    const updatedTrafficData = [
      ...trafficData.slice(-5),
      {
        name: formattedTime,
        normal: newNormal,
        suspicious: newSuspicious,
      },
    ];

    const updatedTotalAttacks = analytics.totalAttacks + Math.floor(newSuspicious / 10);
    const updatedActiveThreats = Math.floor(newSuspicious / 100);

    let newStatus = "Optimal";
    if (updatedActiveThreats > 20) newStatus = "Critical";
    else if (updatedActiveThreats > 10) newStatus = "Moderate";

    setTrafficData(updatedTrafficData);
    setAnalytics({
      totalAttacks: updatedTotalAttacks,
      activeThreats: updatedActiveThreats,
      systemStatus: newStatus,
    });

    setBehavioralData([
      `Suspicious request burst from IP 203.0.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`,
      `SYN Flood pattern detected at ${formattedTime}`,
      `Unusual behavior from subnet 198.51.${Math.floor(Math.random() * 255)}.0/24`,
    ]);

    setIPReputation([
      `IP 203.0.113.42 - Threat Score: ${Math.floor(Math.random() * 50 + 50)}/100 (High Risk)`,
      `IP 198.51.100.17 - Threat Score: ${Math.floor(Math.random() * 40 + 40)}/100 (Medium Risk)`,
      `IP 192.0.2.123 - Threat Score: ${Math.floor(Math.random() * 30)}/100 (Low Risk)`,
    ]);
  }; // <-- Fixed missing closing brace for the function

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("User feedback submitted:", userFeedback);
    setUserFeedback("");
  };

  const handleBlockIP = (e) => {
    e.preventDefault();
    const newIP = e.target.elements.ipToBlock.value.trim();

    if (!isValidIP(newIP)) {
      toast.error("Enter a valid IP address!");
      return;
    }

    if (blockedIPs.includes(newIP)) {
      toast("IP already blocked.");
      return;
    }

    setBlockedIPs((prev) => [...prev, newIP]);
    toast.success(`Blocked ${newIP}`);
    e.target.reset();
  };

  const handleUnblockIP = (ip) => {
    setBlockedIPs((prev) => prev.filter((item) => item !== ip));
    toast.success(`Unblocked ${ip}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-poppins transition-all duration-500 ease-in-out">
      <Toaster position="top-right" />

      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-400">DDoS Defense</h1>
              <div className="ml-10 flex items-center space-x-4">
                {["Dashboard", "Analysis", "Settings"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-300 hover:text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Attacks Prevented" value={analytics.totalAttacks.toLocaleString()} description="Attacks blocked in the last 24 hours" />
            <DashboardCard title="Active Threats" value={analytics.activeThreats} description="Currently monitored suspicious activities" />
            <DashboardCard title="System Status" value={analytics.systemStatus} description="All systems functioning status" />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-semibold mb-4 text-green-300">Real-time Network Traffic</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="normal" fill="#4ade80" />
                <Bar dataKey="suspicious" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
            <button
              onClick={generateRandomData}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors"
            >
              Get Analytics
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">Behavioral Analysis</h3>
              <ul className="space-y-2">
                {behavioralData.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">IP Reputation</h3>
              <ul className="space-y-2">
                {ipReputation.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-300">Block IP Address</h3>
            <form onSubmit={handleBlockIP}>
              <input
                type="text"
                name="ipToBlock"
                className="p-2 bg-gray-700 text-green-400 rounded-lg mb-4 w-full"
                placeholder="Enter IP address to block"
              />
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500"
              >
                Block IP
              </button>
            </form>
            <h4 className="mt-4 text-lg font-semibold text-green-300">Blocked IPs</h4>
            <ul className="space-y-2">
              {blockedIPs.map((ip, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{ip}</span>
                  <button
                    onClick={() => handleUnblockIP(ip)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Unblock
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-xl font-semibold mb-4 text-green-300">User Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                className="w-full p-2 bg-gray-700 text-green-400 rounded-lg mb-4"
                value={userFeedback}
                onChange={(e) => setUserFeedback(e.target.value)}
                placeholder="Your feedback here..."
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;