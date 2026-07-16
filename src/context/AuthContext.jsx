import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, logout as logoutApi, getProfile } from '../services/auth/authService';
import { saveAccessToken, getAccessToken, clearSession } from '../utils/tokenStorage';
import { extractErrorMessage } from '../utils/apiError';
import { logInfo, logWarning, logError } from '../utils/logger';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true on mount for session restore

  // ── Restore Session ────────────────────────────────────
  const restoreSession = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      logInfo('Restoring session…');
      const response = await getProfile();
      setUser(response.data?.data || response.data?.user || response.data);
      setIsAuthenticated(true);
      logInfo('Session restored');
    } catch (error) {
      logWarning('Session restore failed — clearing tokens');
      clearSession();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // ── Login ──────────────────────────────────────────────
  const login = async (credentials) => {
    const response = await loginApi(credentials);
    const data = response.data;

    // Accept common Laravel token response shapes
    const token = data?.access_token || data?.token || data?.data?.access_token || data?.data?.token;
    if (token) {
      saveAccessToken(token);
    }

    // Try to get user from login response or fetch profile
    let userData = data?.user || data?.data?.user || data?.data;
    if (!userData || typeof userData !== 'object') {
      try {
        const profileRes = await getProfile();
        userData = profileRes.data?.data || profileRes.data?.user || profileRes.data;
      } catch {
        userData = null;
      }
    }

    setUser(userData);
    setIsAuthenticated(true);
    logInfo('Login successful');
    return data;
  };

  // ── Logout ─────────────────────────────────────────────
  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      logError('Logout API call failed', extractErrorMessage(error));
    } finally {
      clearSession();
      setUser(null);
      setIsAuthenticated(false);
      logInfo('Logged out');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    restoreSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
