'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-open dropdown on desktop
      if (window.innerWidth > 768) {
        setIsDropdownOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDropdown = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav className="nav--bar">
      {/* Logo container (visible on desktop) */}
      <div className="logo-container">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="UNICSTAL Logo"
            width={250}
            height={250}
            className="logo-icon"
          />
        </Link>
      </div>
      
      {/* Top bar with hamburger menu (mobile only) */}
      <div className="nav-top-bar">
        <button 
          className={`hamburger-toggle ${isDropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
          title="Toggle Menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      {/* Content - always visible on desktop, toggleable on mobile */}
      <div className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`}>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for magical crystals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="nav-buttons">
          {isMobile ? (
            // Mobile dropdown style - individual buttons
            <>
              <button className="dropdown-button">Shop All</button>
              <Link href="/crystals" className="dropdown-button">Crystals</Link>
              <Link href="/blogs" className="dropdown-button">Blogs</Link>
              <button className="dropdown-button">Favorites</button>
              <button className="dropdown-button">Cart ({cartCount})</button>
              <button className="dropdown-button primary">Login</button>
              <button className="dropdown-button">Register</button>
            </>
          ) : (
            // Desktop style - original layout
            <>
              <button className="button--navbar">Shop All</button>
              
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
              
              <button className="button--navbar">Login</button>
              <button className="button--navbar">Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;