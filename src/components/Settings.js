import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const NavLink = ({ href, children }) => (
//   <a href={href} className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//     {children}
//   </a>
// );

const SettingsCard = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
    {children}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBlockThreshold, setAutoBlockThreshold] = useState(80);
  const [logRetentionDays, setLogRetentionDays] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings updated:', {
      emailNotifications,
      smsNotifications,
      autoBlockThreshold,
      logRetentionDays
    });
  };

  const handleLogout = () => {
    navigate("/"); 
  };


  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-poppins">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-400">
                  DDoS Defence
                </h1>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <a
                  href="/dashboard"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="/analysis"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Analysis
                </a>
                <a
                  href="/settings"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </a>
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
          <h2 className="text-3xl font-bold mb-6">Settings</h2>
          
          <form onSubmit={handleSubmit}>
            <SettingsCard title="Notification Settings">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="emailNotifications">Enable Email Notifications</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="smsNotifications">Enable SMS Notifications</label>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Threat Mitigation">
              <div className="space-y-4">
                <div>
                  <label htmlFor="autoBlockThreshold" className="block mb-2">Auto-block Threshold (Threat Score)</label>
                  <input
                    type="range"
                    id="autoBlockThreshold"
                    min="0"
                    max="100"
                    value={autoBlockThreshold}
                    onChange={(e) => setAutoBlockThreshold(Number(e.target.value))}
                    color='green'
                    className="w-full accent-custom-green-600"
                  />
                  <span>{autoBlockThreshold}</span>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Log Management">
              <div className="space-y-4">
                <div>
                  <label htmlFor="logRetentionDays" className="block mb-2">Log Retention Period (Days)</label>
                  <input
                    type="number"
                    id="logRetentionDays"
                    value={logRetentionDays}
                    onChange={(e) => setLogRetentionDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
            </SettingsCard>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors"
            >
              Save Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;

