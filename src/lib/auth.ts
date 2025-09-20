export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
  const loginTime = localStorage.getItem('adminLoginTime');
  
  if (!isAuthenticated || !loginTime) return false;
  
  // Check if login is still valid (24 hours)
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const isSessionValid = Date.now() - parseInt(loginTime) < twentyFourHours;
  
  if (!isSessionValid) {
    logout();
    return false;
  }
  
  return isAuthenticated === 'true';
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('isAdminAuthenticated');
  localStorage.removeItem('adminLoginTime');
};

export const requireAuth = () => {
  if (typeof window === 'undefined') return;
  
  if (!checkAuth()) {
    window.location.href = '/login';
  }
};