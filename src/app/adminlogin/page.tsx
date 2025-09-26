'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import { getAdminUsername, getAdminPasswordHash, getSecurityConfig, validateSecurityContext } from '@/lib/adminConfig';
import { comparePassword } from '@/lib/passwordUtils';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  // Get protected credentials and security config
  const securityConfig = getSecurityConfig();
  const maxAttempts = securityConfig.maxLoginAttempts;

  // Check for existing lockout on component mount
  React.useEffect(() => {
    const storedAttempts = localStorage.getItem('loginAttempts');
    const lockoutTime = localStorage.getItem('lockoutTime');
    
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
    
    if (lockoutTime) {
      const timeSinceLockout = Date.now() - parseInt(lockoutTime);
      if (timeSinceLockout < securityConfig.lockoutDuration) {
        setIsLocked(true);
        const remainingTime = Math.ceil((securityConfig.lockoutDuration - timeSinceLockout) / 60000);
        setError(`Account locked. Try again in ${remainingTime} minutes.`);
      } else {
        // Lockout expired, clear it
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutTime');
        setLoginAttempts(0);
        setIsLocked(false);
      }
    }
  }, [securityConfig.lockoutDuration]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if account is locked
    if (isLocked) {
      setError('Account locked due to too many failed attempts. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Security validation
    if (!validateSecurityContext()) {
      setError('Security validation failed');
      setIsLoading(false);
      return;
    }

    // Simulate network delay and add random delay for security
    const delay = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      // Get protected credentials
      const adminUsername = getAdminUsername();
      const adminPasswordHash = getAdminPasswordHash();
      
      // Check username and verify password hash
      const isUsernameValid = username === adminUsername;
      const isPasswordValid = await comparePassword(password, adminPasswordHash);
      
      if (isUsernameValid && isPasswordValid) {
        // Reset login attempts on success
        setLoginAttempts(0);
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutTime');
        
        // Set authentication in localStorage with enhanced security
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        
        // Generate and store session token for additional security
        const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('adminSessionToken', sessionToken);
        
        // Redirect to admin panel
        router.push('/admin');
      } else {
        // Handle failed login attempt
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        if (newAttempts >= maxAttempts) {
          setIsLocked(true);
          localStorage.setItem('lockoutTime', Date.now().toString());
          setError(`Account locked for ${securityConfig.lockoutDuration / 60000} minutes due to too many failed attempts`);
        } else {
          setError(`Invalid credentials. ${maxAttempts - newAttempts} attempts remaining.`);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication system error');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon-wrapper">
                <Shield size={32} />
              </div>
            </div>
            <h1>Login</h1>
            <p>Welcome to Unicstal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;