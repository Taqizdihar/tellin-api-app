import { createContext, useContext, useState, useEffect } from 'react';

const PreferenceContext = createContext();

const PREFERENCE_KEY = 'tellin_preferences';

const DEFAULT_PREFERENCES = {
  autoPrettyJson: true,
  autoExpandResponse: false,
  rememberLastModule: true,
  rememberSidebarState: true,
  enableToastNotification: true,
  enableRequestLogging: false,
  enableDeveloperConsole: false,
  requestTimeout: 5000,
  defaultRequestDelay: 0,
};

export function PreferenceProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem(PREFERENCE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  useEffect(() => {
    localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <PreferenceContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferenceProvider');
  }
  return context;
}
