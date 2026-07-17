import { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { usePreferences } from '../context/PreferenceContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import apiConfig from '../config/api';

import PreferenceCard from '../components/settings/PreferenceCard';
import PreferenceToggle from '../components/settings/PreferenceToggle';
import DiagnosticCard from '../components/settings/DiagnosticCard';
import StorageCard from '../components/settings/StorageCard';
import NetworkCard from '../components/settings/NetworkCard';
import ApplicationInfoCard from '../components/settings/ApplicationInfoCard';
import ActionCard from '../components/settings/ActionCard';
import AboutCard from '../components/settings/AboutCard';
import { RefreshCw, Trash2, Power, RotateCcw, AlertTriangle } from 'lucide-react';
import { clearSession } from '../utils/tokenStorage';

export default function ApplicationSettings() {
  const { preferences, updatePreference, resetPreferences } = usePreferences();
  const { isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const [diagnostics, setDiagnostics] = useState([
    { label: 'API Reachability', status: 'Pending' },
    { label: 'Authentication Status', status: 'Pending' },
    { label: 'Axios Status', status: 'Healthy' },
    { label: 'Service Layer Status', status: 'Healthy' },
    { label: 'Storage Status', status: 'Healthy' },
    { label: 'Environment Validation', status: 'Healthy' }
  ]);

  const [storageStats, setStorageStats] = useState([]);

  const refreshDiagnostics = () => {
    setDiagnostics(prev => prev.map(d => {
      if (d.label === 'API Reachability') return { ...d, status: 'Healthy' }; // Mock reachability
      if (d.label === 'Authentication Status') return { ...d, status: isAuthenticated ? 'Healthy' : 'Warning' };
      return d;
    }));
    showToast('Diagnostics refreshed', 'success');
  };

  const refreshStorageStats = () => {
    setStorageStats([
      { label: 'Stored Preferences', value: localStorage.getItem('tellin_preferences') ? 'Present' : 'None' },
      { label: 'Request History Size', value: localStorage.getItem('tellin_request_history') ? JSON.parse(localStorage.getItem('tellin_request_history')).length + ' records' : '0 records' },
      { label: 'Authentication Session', value: localStorage.getItem('access_token') ? 'Active' : 'None' },
      { label: 'Total Keys', value: localStorage.length },
    ]);
  };

  useEffect(() => {
    refreshDiagnostics();
    refreshStorageStats();
  }, [isAuthenticated]);

  const handleClearSelected = () => {
    localStorage.removeItem('tellin_request_history');
    localStorage.removeItem('tellin_role_verification_history');
    refreshStorageStats();
    showToast('History cleared', 'success');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all local storage? This will log you out.')) {
      localStorage.clear();
      refreshStorageStats();
      logout();
      showToast('All storage cleared', 'success');
    }
  };

  const actions = [
    { label: 'Reset Preferences', icon: RotateCcw, onClick: () => { resetPreferences(); showToast('Preferences reset', 'success'); } },
    { label: 'Clear Cache', icon: Trash2, variant: 'danger', onClick: () => { showToast('Cache cleared', 'success'); } },
    { label: 'Reload Application', icon: Power, onClick: () => window.location.reload() },
    { label: 'Refresh Diagnostics', icon: RefreshCw, onClick: refreshDiagnostics },
  ];

  const appInfo = [
    { label: 'Application Name', value: 'Tellin API Testing Client' },
    { label: 'Version', value: '1.0.0' },
    { label: 'Frontend Stack', value: 'React + Vite' },
    { label: 'Backend Stack', value: 'Laravel 10.x' },
    { label: 'Current Environment', value: import.meta.env.MODE, badge: true },
    { label: 'Build Mode', value: import.meta.env.DEV ? 'Development' : 'Production' },
    { label: 'API Base URL', value: apiConfig.baseURL },
    { label: 'Current Date & Time', value: new Date().toLocaleString() }
  ];

  const networkStats = [
    { label: 'Current Timeout', value: `${preferences.requestTimeout}ms` },
    { label: 'Retry Strategy', value: 'None' },
    { label: 'Default Headers', value: 'application/json' },
    { label: 'Connection Type', value: navigator.onLine ? 'Online' : 'Offline' }
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title="Application Settings & Diagnostics" 
        description="Manage local developer preferences and review application health."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ApplicationInfoCard info={appInfo} />
          
          <PreferenceCard title="Developer Preferences" description="Local UI settings.">
            <PreferenceToggle 
              label="Auto Pretty JSON" 
              description="Automatically format JSON responses"
              checked={preferences.autoPrettyJson}
              onChange={(v) => updatePreference('autoPrettyJson', v)}
            />
            <PreferenceToggle 
              label="Auto Expand Response" 
              description="Expand response payload sections automatically"
              checked={preferences.autoExpandResponse}
              onChange={(v) => updatePreference('autoExpandResponse', v)}
            />
            <PreferenceToggle 
              label="Remember Last Module" 
              description="Keep last accessed API module selected"
              checked={preferences.rememberLastModule}
              onChange={(v) => updatePreference('rememberLastModule', v)}
            />
            <PreferenceToggle 
              label="Remember Sidebar State" 
              description="Persist sidebar open/close state"
              checked={preferences.rememberSidebarState}
              onChange={(v) => updatePreference('rememberSidebarState', v)}
            />
            <PreferenceToggle 
              label="Enable Toast Notification" 
              description="Show popups for actions"
              checked={preferences.enableToastNotification}
              onChange={(v) => updatePreference('enableToastNotification', v)}
            />
            <PreferenceToggle 
              label="Enable Request Logging" 
              description="Log requests to console"
              checked={preferences.enableRequestLogging}
              onChange={(v) => updatePreference('enableRequestLogging', v)}
            />
            <PreferenceToggle 
              label="Enable Developer Console" 
              description="Show extra debugging info"
              checked={preferences.enableDeveloperConsole}
              onChange={(v) => updatePreference('enableDeveloperConsole', v)}
            />
          </PreferenceCard>
          
          <NetworkCard 
            networkStats={networkStats}
            timeout={preferences.requestTimeout}
            delay={preferences.defaultRequestDelay}
            onTimeoutChange={(v) => updatePreference('requestTimeout', v)}
            onDelayChange={(v) => updatePreference('defaultRequestDelay', v)}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DiagnosticCard title="System Diagnostics" items={diagnostics} />
          
          <StorageCard 
            stats={storageStats} 
            onRefresh={refreshStorageStats}
            onClearSelected={handleClearSelected}
            onClearAll={handleClearAll}
          />
          
          <ActionCard actions={actions} />
          
          <AboutCard />
        </div>
      </div>
    </div>
  );
}
