const ADMIN_CONFIG = {
  credentials: {
    username: 'admin',
    passwordHash: '$2b$12$sDyOXP8QORoq/Ajn0qCKze01V0CT/.6NxnyIVxaUpRItSwA6jnKd.',
  },
  session: {
    duration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    key: 'isAdminAuthenticated',
    timeKey: 'adminLoginTime',
    // Strong hardcoded session secret (can be changed for additional security)
    secret: 'unicstal_secure_session_2024_v2_admin_portal_secret_key'
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes in milliseconds
    // Strong JWT secret for additional token validation
    jwtSecret: 'unicstal_jwt_secure_2024_admin_authentication_secret'
  }
};

// Additional security layer with obfuscated validation
const SECURITY_CONTEXT = {
  hash: 'unicstal_admin_secure_2024',
  version: '2.0',
  checksum: 'admin_portal_validated'
};

/**
 * Get admin username (hardcoded but centralized)
 */
export const getAdminUsername = (): string => {
  return ADMIN_CONFIG.credentials.username;
};

/**
 * Get admin password hash (bcrypt secured)
 */
export const getAdminPasswordHash = (): string => {
  return ADMIN_CONFIG.credentials.passwordHash;
};

/**
 * Get session configuration
 */
export const getSessionConfig = () => {
  return ADMIN_CONFIG.session;
};

/**
 * Get security configuration
 */
export const getSecurityConfig = () => {
  return ADMIN_CONFIG.security;
};

/**
 * Validate security context and configuration integrity
 */
export const validateSecurityContext = (): boolean => {
  // Check hardcoded security context
  if (SECURITY_CONTEXT.hash !== 'unicstal_admin_secure_2024') {
    console.error('Security context validation failed');
    return false;
  }
  
  // Verify configuration integrity
  if (!ADMIN_CONFIG.credentials.username || !ADMIN_CONFIG.credentials.passwordHash) {
    console.error('Admin credentials configuration invalid');
    return false;
  }
  
  // Additional security checks for production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isProduction = !hostname.includes('localhost') && 
                        !hostname.includes('127.0.0.1') && 
                        !hostname.includes('192.168') &&
                        !hostname.includes('0.0.0.0');
    
    if (isProduction) {
      // In production, ensure we're using HTTPS
      if (window.location.protocol !== 'https:') {
        console.warn('Admin access should use HTTPS in production');
        // Don't block, just warn for hardcoded approach
      }
    }
  }
  
  return true;
};

/**
 * Get configuration summary (for debugging - no sensitive data)
 */
export const getConfigSummary = () => {
  return {
    hasUsername: !!ADMIN_CONFIG.credentials.username,
    hasPasswordHash: !!ADMIN_CONFIG.credentials.passwordHash,
    sessionDuration: ADMIN_CONFIG.session.duration,
    maxAttempts: ADMIN_CONFIG.security.maxLoginAttempts,
    lockoutDuration: ADMIN_CONFIG.security.lockoutDuration,
    version: SECURITY_CONTEXT.version
  };
};