'use client';

import React from 'react';
import { useStarBackground } from '@/hooks/useStarBackground';

const Footer = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  useStarBackground(canvasRef);

  return (
    <footer className="main-footer">
      <canvas ref={canvasRef} className="footer-star-bg"></canvas>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">About UNICSTAL</h3>
          <p className="footer-description">
            Discover the transformative power of crystals. Our carefully curated collection helps you manifest your dreams, align your energy, and create the life you desire.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#crystals">Crystal Collection</a></li>
            <li><a href="#blog">Crystal Wisdom</a></li>
            <li><a href="#about">Our Story</a></li>
            <li><a href="#contact">Get in Touch</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Customer Care</h3>
          <ul className="footer-links">
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#sizing">Crystal Care Guide</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3 className="footer-title">Join Our Crystal Community</h3>
          <p className="newsletter-description">
            Get crystal wisdom, manifestation tips, and exclusive offers delivered to your inbox.
          </p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button className="newsletter-submit">✨</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.529l1.714-1.714c.394.394.938.64 1.491.64.553 0 1.097-.246 1.491-.64l1.714 1.714c-.757.933-1.908 1.529-3.205 1.529z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; 2024 UNICSTAL. All rights reserved. Manifest your dreams with intention.</p>
        </div>
        
        <button className="button--footer">Back to Top</button>
      </div>
    </footer>
  );
};

export default Footer;