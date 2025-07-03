import React, { useState } from 'react';

const SettingSection = ({ title, isOpen, toggle, children }) => (
  <div className="border rounded mb-4 shadow-sm">
    <div
      onClick={toggle}
      className="bg-teal-500 text-white px-4 py-2 cursor-pointer flex justify-between items-center"
    >
      <span className="font-semibold">{title}</span>
      <span>{isOpen ? '▲' : '▼'}</span>
    </div>
    {isOpen && <div className="bg-white px-4 py-3">{children}</div>}
  </div>
);

const ToggleSwitch = ({ value, onChange }) => (
  <label className="inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only" checked={value} onChange={onChange} />
    <div
      className={`w-11 h-6 rounded-full shadow-inner transition duration-200 ${
        value ? 'bg-teal-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          value ? 'translate-x-5' : 'translate-x-1'
        }`}
      ></div>
    </div>
  </label>
);

const Settings = () => {
  const [sections, setSections] = useState({
    general: true,
    connect: true,
    email: true,
    authorization: true,
    notification: true,
  });

  const [settings, setSettings] = useState({
    language: 'BM',
    dataBackup: true,
    goDash: true,
    superController: true,
    enableSMTP: true,
    editAuthorization: true,
    authorityLevel: 'Low',
    enableNotification: true,
  });

  const toggleSection = (key) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSelectChange = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-lg mx-auto p-6 font-sans shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* General */}
      <SettingSection
        title="General"
        isOpen={sections.general}
        toggle={() => toggleSection('general')}
      >
        <div className="flex justify-between items-center mb-4">
          <label className="font-medium">Language</label>
          <select
            className="border rounded px-2 py-1"
            value={settings.language}
            onChange={(e) => handleSelectChange('language', e.target.value)}
          >
            <option value="BM">EN</option>
            <option value="BI">HI</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Data Backup</label>
          <ToggleSwitch
            value={settings.dataBackup}
            onChange={() => toggleSetting('dataBackup')}
          />
        </div>
      </SettingSection>

      {/* Connect To */}
      <SettingSection
        title="Connect To"
        isOpen={sections.connect}
        toggle={() => toggleSection('connect')}
      >
        <div className="flex justify-between items-center mb-4">
          <label className="font-medium">GoDash</label>
          <ToggleSwitch
            value={settings.goDash}
            onChange={() => toggleSetting('goDash')}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">SuperController</label>
          <ToggleSwitch
            value={settings.superController}
            onChange={() => toggleSetting('superController')}
          />
        </div>
      </SettingSection>

      {/* Email */}
      <SettingSection
        title="Email"
        isOpen={sections.email}
        toggle={() => toggleSection('email')}
      >
        <div className="flex justify-between items-center">
          <label className="font-medium">Enable SMTP</label>
          <ToggleSwitch
            value={settings.enableSMTP}
            onChange={() => toggleSetting('enableSMTP')}
          />
        </div>
      </SettingSection>

      {/* Authorization */}
      <SettingSection
        title="Authorization"
        isOpen={sections.authorization}
        toggle={() => toggleSection('authorization')}
      >
        <div className="flex justify-between items-center mb-4">
          <label className="font-medium">Edit Authorization</label>
          <ToggleSwitch
            value={settings.editAuthorization}
            onChange={() => toggleSetting('editAuthorization')}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Authority Level</label>
          <select
            className="border rounded px-2 py-1"
            value={settings.authorityLevel}
            onChange={(e) => handleSelectChange('authorityLevel', e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </SettingSection>

      {/* Notification */}
      <SettingSection
        title="Notification"
        isOpen={sections.notification}
        toggle={() => toggleSection('notification')}
      >
        <div className="flex justify-between items-center">
          <label className="font-medium">Enable Notification</label>
          <ToggleSwitch
            value={settings.enableNotification}
            onChange={() => toggleSetting('enableNotification')}
          />
        </div>
      </SettingSection>
    </div>
  );
};

export default Settings;
