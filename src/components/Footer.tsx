'use client';

import React, { useState, useRef } from 'react';
import { useStarBackground } from '@/hooks/useStarBackground';

const Footer = () => {
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLElement>(null);
  
  // Initialize star background
  useStarBackground(footerRef);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="main-footer">      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">NAVIGATION</h3>
          <ul className="footer-links">
            {[
              { href: "/Blogs", text: "Blogs" },
              { href: "/crystals", text: "Crystals" },
              { href: "/shop", text: "Shop All" },
              { href: "/rewards", text: "Rewards" },
              { href: "/quiz", text: "Crystal Quiz" },
              { href: "/trade", text: "Designer Trade Program" },
            ].map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.color = '#C084FC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <br/>
          <ul className="footer-links">
            {[
              { href: "/faq", text: "FAQ" },
              { href: "/contact", text: "Contact" },
              { href: "/about", text: "About Us" },
              { href: "/terms", text: "Terms of Service" },
              { href: "/affiliate", text: "Become an Affiliate" },
              { href: "/returns", text: "Return & Refund Policy" }
            ].map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.color = '#C084FC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">JOURNAL</h3>
          <ul className="footer-links journal-links">
            {[
              { href: "#protection", text: "Best Crystals for Home Protection..." },
              { href: "#birthstone", text: "The September Birthstone: Sapphire" },
              { href: "#angel", text: "1010 Angel Number Meaning —" }
            ].map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.color = '#C084FC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3 className="footer-title">Stay in the Loop</h3>
          <p className="newsletter-description">
            Join our list for new drops, stories, and rare finds.
          </p>
          <form 
            className="newsletter-form" 
            onSubmit={handleNewsletterSubmit}
          >
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit" 
              className="newsletter-submit"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#A084E8';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(160, 132, 232, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              →
            </button>
          </form>
          <br /><br />
          <h3 className="footer-title">UNICSTAL.COM</h3>
          <p className="footer-description">
            Discover our crystal shop online for home décor, wellness, and meaningful gifts.
          </p>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          {[
            { href: "#instagram", title: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
            { href: "#tiktok", title: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
            { href: "#facebook", title: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            { href: "#pinterest", title: "Pinterest", path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .979.219.979 1.057 0 .64-.219 1.578-.359 2.437-.219.937.478 1.697 1.406 1.697 1.683 0 2.979-1.775 2.979-4.331 0-2.267-1.625-3.85-3.946-3.85-2.69 0-4.331 2.017-4.331 4.102 0 .813.314 1.686.719 2.158.079.094.09.177.067.272-.074.297-.24.956-.271 1.092-.041.177-.134.214-.31.129-1.215-.562-1.97-2.315-1.97-3.731 0-3.043 2.207-5.84 6.359-5.84 3.343 0 5.944 2.382 5.944 5.573 0 3.325-2.097 5.995-5.009 5.995-.978 0-1.898-.509-2.212-1.183 0 0-.484 1.844-.602 2.292-.218.833-.808 1.871-1.204 2.507.908.28 1.869.43 2.869.43 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" },
            { href: "#youtube", title: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              className="social-icon" 
              title={social.title}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2) rotate(15deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
        
        <div className="footer-copyright">
          <p>© 2025, UNICSTAL.COM.</p>
        </div>
        
        <button 
          className="button--footer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(160, 132, 232, 0.4)';
            e.currentTarget.style.backgroundColor = '#A084E8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.backgroundColor = '';
          }}
        >
          BACK TO TOP
        </button>
      </div>
    </footer>
  );
};

export default Footer;