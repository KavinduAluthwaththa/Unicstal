'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CrystalAdmin from '@/components/admin/CrystalAdmin';
import BlogAdmin from '@/components/admin/BlogAdmin';
import { ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { checkAuth, logout } from '@/lib/auth';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('crystals');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication on component mount
    const checkAuthentication = () => {
      if (!checkAuth()) {
        router.replace('/adminlogin');
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/adminlogin');
  };

  // Show loading while checking auth
  if (!isAuthenticated) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <Link href="/" className="back-button">
            <ArrowLeft size={20} />
            Back to Site
          </Link>
          <h1>Admin Panel</h1>
          <div className="header-actions">
            <div className="admin-tabs">
              <button
                onClick={() => setActiveTab('crystals')}
                className={`tab-button ${activeTab === 'crystals' ? 'active' : ''}`}
              >
                Crystals
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
              >
                Blog Posts
              </button>
            </div>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="admin-main">
        {activeTab === 'crystals' && <CrystalAdmin />}
        {activeTab === 'blog' && <BlogAdmin />}
      </main>
    </div>
  );
};

export default AdminPage;