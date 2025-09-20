import { getSessionConfig } from './adminConfig';

export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
  const loginTime = localStorage.getItem('adminLoginTime');
  const sessionToken = localStorage.getItem('adminSessionToken');
  
  if (!isAuthenticated || !loginTime || !sessionToken) return false;
  
  // Get session duration from config
  const sessionConfig = getSessionConfig();
  const isSessionValid = Date.now() - parseInt(loginTime) < sessionConfig.duration;
  
  if (!isSessionValid) {
    logout();
    return false;
  }
  
  // Validate session token exists (basic check)
  if (!sessionToken || sessionToken.length < 10) {
    logout();
    return false;
  }
  
  return isAuthenticated === 'true';
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('isAdminAuthenticated');
  localStorage.removeItem('adminLoginTime');
  localStorage.removeItem('adminSessionToken');
  localStorage.removeItem('loginAttempts');
  localStorage.removeItem('lockoutTime');
};

export const requireAuth = () => {
  if (typeof window === 'undefined') return;
  
  if (!checkAuth()) {
    window.location.href = '/login';
  }
};