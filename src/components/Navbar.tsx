'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Initialize with mobile-first approach to prevent flash
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Immediate check on mount
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isMobile) {
    return (
      <nav className="nav--bar">
        {/* Mobile header - always visible */}
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-logo">
            UNICSTAL
          </Link>
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`mobile-nav-dropdown ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <Link href="/crystals" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Shop All</span>
            </Link>
            <Link href="/crystals" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Crystals</span>
            </Link>
            <Link href="/blogs" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Blogs</span>
            </Link>
            <Link href="/crystals" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Cart</span>
            </Link>
          </div>

          <div className="mobile-nav-actions">
            <Link href="/login" className="mobile-action-btn solid">
              Login
            </Link>
            <Link href="/register" className="mobile-action-btn solid">
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Desktop navbar
  return (
    <nav className="nav--bar">
      {/* Logo container */}
      <div className="logo-container">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="UNICRYSTAL Logo"
            width={250}
            height={250}
            className="logo-icon"
          />
        </Link>
      </div>
      
      {/* Search container */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for magical crystals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Nav buttons */}
      <div className="nav-buttons">
        <Link href="/crystals" className="button--navbar login-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Shop All
        </Link>
        
        <button className="icon-button favorite-btn" title="Favorites">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        
        <button className="icon-button cart-btn" title="Shopping Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="m1 1 4 4 4.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L17 8H7.68"></path>
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        
        <Link href="/login" className="button--navbar login-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Login
        </Link>
        <Link href="/register" className="button--navbar login-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Register
        </Link>
        
        <button className="icon-button menu-btn" title="Menu">
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;